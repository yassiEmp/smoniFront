import { useEffect, useState, useCallback } from "react";
import Loader from "@/components/common/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { allgetMonitorsWithdraws } from "@/api/admin/monitor";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { getWithdrawDetails, approveWithdraw, declineWithdraw } from "@/api/admin/monitor";
import { imageUrl, pdfUrl } from "@/api";
import { CheckCircle, XCircle, User2, Mail, Phone, Banknote, FileText, Calendar, CreditCard } from "lucide-react";
import { Eye } from "lucide-react";
// import PaiementDetailsModal from "./PaiementDetailsModal";

const PER_PAGE_OPTIONS = [10, 20, 30, 40];
const FILTERS = [
  { key: 'all', label: 'Tous' },
  { key: 'success', label: 'Payé' },
  { key: 'pending', label: 'Non payé' },
];

type FilterType = 'all' | 'success' | 'pending';

const AdminPaiement = () => {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [withdraws, setWithdraws] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [paginationMeta, setPaginationMeta] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10
  });
  const [filter, setFilter] = useState<FilterType>('all');
  // const [selectedWithdraw, setSelectedWithdraw] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWithdrawData, setSelectedWithdrawData] = useState<any | null>(null);
  const [details, setDetails] = useState<any>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<null | 'accept' | 'reject'>(null);
  const [filterLoading, setFilterLoading] = useState(false);

  // Déplacer la logique de fetch dans une fonction réutilisable
  const fetchWithdraws = useCallback(async (page = currentPage, perPageVal = perPage, filterStatus = filter) => {
    if (filterStatus === filter && page === currentPage && perPageVal === perPage) {
      setIsLoading(true);
    } else {
      setFilterLoading(true);
    }
    
    // Pour le filtre "all", on ne passe pas de statut (chaîne vide)
    const statusToSend = filterStatus === 'all' ? '' : filterStatus;
    
    try {
      const data = await allgetMonitorsWithdraws(token, page, perPageVal, statusToSend);
      setWithdraws(data.data.data);
      setPaginationMeta({
        current_page: data.data.current_page,
        last_page: data.data.last_page,
        total: data.data.total,
        per_page: data.data.per_page
      });
    } catch {
      setWithdraws([]);
      setPaginationMeta({ current_page: 1, last_page: 1, total: 0, per_page: perPageVal });
    } finally {
      setIsLoading(false);
      setFilterLoading(false);
    }
  }, [token, currentPage, perPage, filter]);

  useEffect(() => {
    fetchWithdraws();
  }, [fetchWithdraws]);

  // Quand on change de filtre, on revient à la page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // Utiliser directement les données de l'API (filtrage côté serveur)
  const filteredWithdraws = withdraws;

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openDetailsModal = async (withdraw: any) => {
    setSelectedWithdrawData(withdraw);
    setModalOpen(true);
    setDetails(null);
    setDetailsLoading(true);
    try {
      const data = await getWithdrawDetails(token, withdraw.id);
      setDetails(data);
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeDetailsModal = () => {
    setModalOpen(false);
    setSelectedWithdrawData(null);
    setDetails(null);
  };

  // Fonction utilitaire pour vérifier et ajuster la pagination après une action
  const checkAndAdjustPagination = async (updatedData: any) => {
    if (updatedData && updatedData.data) {
      const totalPages = Math.ceil(updatedData.data.total / perPage);
      if (currentPage > totalPages && totalPages > 0) {
        // Si la page actuelle n'existe plus, aller à la dernière page
        setCurrentPage(totalPages);
        await fetchWithdraws(totalPages, perPage, filter);
      }
    }
  };

  const handleAccept = async () => {
    if (!selectedWithdrawData) return;
    setActionLoading('accept');
    try {
      await approveWithdraw(token, selectedWithdrawData.id);
      closeDetailsModal();
      
      // Récupérer les données mises à jour et ajuster la pagination si nécessaire
      const statusToSend = filter === 'all' ? '' : filter;
      const updatedData = await allgetMonitorsWithdraws(token, currentPage, perPage, statusToSend);
      await checkAndAdjustPagination(updatedData);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    if (!selectedWithdrawData) return;
    setActionLoading('reject');
    try {
      await declineWithdraw(token, selectedWithdrawData.id);
      closeDetailsModal();
      
      // Récupérer les données mises à jour et ajuster la pagination si nécessaire
      const statusToSend = filter === 'all' ? '' : filter;
      const updatedData = await allgetMonitorsWithdraws(token, currentPage, perPage, statusToSend);
      await checkAndAdjustPagination(updatedData);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="mx-auto w-full px-6 py-7">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            Liste des paiements/retraits
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Retrouvez ici tous les paiements/retraits demandés par les moniteurs
          </p>
        </div>
      </div>
      {/* Filtres */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-t-lg bg-white p-6 md:flex-row">
        <div className="flex gap-2">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as FilterType)}
              disabled={filterLoading}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 font-semibold transition-colors ${filter === f.key ? "border-[#EAE3FF] bg-[#BCADFC] text-[#4B2992]" : "border-gray-200 bg-gray-100 text-gray-700"} ${filterLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {filterLoading && (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#BCADFC]"></div>
          )}
        <div className="text-md font-medium text-gray-600">
            Résultat Total : {paginationMeta.total}
          </div>
        </div>
      </div>
      {/* Tableau harmonisé */}
      <div className="rounded-lg bg-white shadow">
        <div className="scrollbar-hide overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium tracking-wider text-gray-700">Facture</th>
                <th className="px-6 py-3 text-left text-sm font-medium tracking-wider text-gray-700">Moniteur</th>
                <th className="px-6 py-3 text-left text-sm font-medium tracking-wider text-gray-700">Montant</th>
                <th className="px-6 py-3 text-left text-sm font-medium tracking-wider text-gray-700">Durée</th>
                <th className="px-6 py-3 text-left text-sm font-medium tracking-wider text-gray-700">Payé</th>
                <th className="px-6 py-3 text-left text-sm font-medium tracking-wider text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium tracking-wider text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center">
                    <Loader />
                  </td>
                </tr>
              ) : filteredWithdraws.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-lg text-gray-500">
                    Aucun paiement/retrait {filter !== 'all' ? `avec le statut "${filter === 'success' ? 'payé' : 'non payé'}"` : ''} trouvé.
                  </td>
                </tr>
              ) : (
                filteredWithdraws.map((item: any) => (
                  <tr key={item.id} className="cursor-pointer transition-colors hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">{item.invoice_code}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.monitor ? `${item.monitor.firstname} ${item.monitor.lastname}` : '-'}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.total_ttc} {item.currency}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.duration} heure</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.payed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item.payed ? 'Oui' : 'Non'}</span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{item.created_at ? new Date(item.created_at).toLocaleDateString() : '-'}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        className="flex items-center justify-center text-indigo-600 hover:text-indigo-900 disabled:opacity-50"
                        title="Voir"
                        onClick={() => openDetailsModal(item)}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {paginationMeta.total > 0 && (
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="hidden text-sm text-gray-700 md:block">
                  Page {paginationMeta.current_page} sur {paginationMeta.last_page}
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="perPage" className="text-sm text-gray-600">
                    Résultats par page:
                  </label>
                  <select
                    id="perPage"
                    value={perPage}
                    onChange={e => handlePerPageChange(Number(e.target.value))}
                    className="rounded-md border-gray-300 text-sm focus:border-[#BCADFC] focus:ring-[#BCADFC]"
                  >
                    {PER_PAGE_OPTIONS.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(paginationMeta.current_page - 1)}
                  disabled={paginationMeta.current_page === 1}
                  className={`rounded-md p-2 ${paginationMeta.current_page === 1 ? "cursor-not-allowed text-gray-400" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  {"<"}
                </button>
                {(() => {
                  const totalPages = paginationMeta.last_page;
                  const currentPage = paginationMeta.current_page;
                  const pages: (number | string)[] = [];
                  if (totalPages <= 5) {
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    pages.push(1);
                    const startPage = Math.max(2, currentPage - 1);
                    const endPage = Math.min(totalPages - 1, currentPage + 1);
                    if (startPage > 2) {
                      pages.push("...");
                    }
                    for (let i = startPage; i <= endPage; i++) {
                      pages.push(i);
                    }
                    if (endPage < totalPages - 1) {
                      pages.push("...");
                    }
                    pages.push(totalPages);
                  }
                  return pages.map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === "number" ? handlePageChange(page) : undefined}
                      disabled={page === "..." || page === currentPage}
                      className={`rounded-md px-3 py-1 text-sm ${page === "..." ? "cursor-default text-gray-400" : page === currentPage ? "cursor-default bg-[#BCADFC] text-white" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      {page}
                    </button>
                  ));
                })()}
                <button
                  onClick={() => handlePageChange(paginationMeta.current_page + 1)}
                  disabled={paginationMeta.current_page === paginationMeta.last_page}
                  className={`rounded-md p-2 ${paginationMeta.current_page === paginationMeta.last_page ? "cursor-not-allowed text-gray-400" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Modal détail */}
      <Sheet open={modalOpen} onOpenChange={closeDetailsModal}>
        <SheetContent
          side={window.innerWidth < 768 ? "bottom" : "right"}
          className={`${window.innerWidth < 768 ? 'h-[90vh] rounded-t-xl' : 'sm:max-w-[500px]'} p-0 bg-[#F5F5F5] border-none`}
        >
          <div className="flex flex-col h-full">
            <div className="sticky top-0 z-10 rounded-t-lg bg-gradient-to-r from-[#BCADFC] to-[#6C61F6]">
              <SheetHeader className="flex flex-row justify-between border-b border-[#E0E0E0] pb-5 pt-[32px] px-[20px]">
                <SheetTitle className="sr-only">Détail du paiement/retrait</SheetTitle>
                <SheetDescription className="sr-only">Fiche détaillée du paiement ou retrait d'un moniteur, avec informations bancaires et facture.</SheetDescription>
                <div className="flex items-center gap-4">
                  {details && details.withdraw && details.withdraw.monitor && (
                    <div className="flex items-center gap-3">
                      {details.withdraw.monitor.photo ? (
                        <img
                          src={`${imageUrl}${details.withdraw.monitor.photo}`}
                          alt={`${details.withdraw.monitor.firstname} ${details.withdraw.monitor.lastname}`}
                          className="h-16 w-16 rounded-full object-cover border-4 border-white shadow-md"
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-[#4B2992] flex items-center justify-center text-2xl font-bold text-white border-4 border-white shadow-md">
                          {`${details.withdraw.monitor.lastname?.charAt(0) ?? ''}${details.withdraw.monitor.firstname?.charAt(0) ?? ''}`}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-lg text-white flex items-center gap-2">
                          <User2 className="w-5 h-5 text-white/80" />
                          {details.withdraw.monitor.firstname} {details.withdraw.monitor.lastname}
                        </div>
                        <div className="text-xs text-white/80 flex items-center gap-1"><Mail className="w-4 h-4 mr-1" />{details.withdraw.monitor.email}</div>
                        <div className="text-xs text-white/80 flex items-center gap-1"><Phone className="w-4 h-4 mr-1" />{details.withdraw.monitor.phone}</div>
                      </div>
                    </div>
                  )}
                </div>
              </SheetHeader>
            </div>
            <div className="px-[20px] py-6 flex-1 overflow-y-auto">
              {detailsLoading || !details ? (
                <div className="flex justify-center items-center h-full"><Loader /></div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    {details.withdraw.payed ? (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-xs">
                        <CheckCircle className="w-4 h-4" /> Payé
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold text-xs">
                        <XCircle className="w-4 h-4" /> Non payé
                      </span>
                    )}
                  </div>
                  <div className="rounded-xl bg-white shadow p-5 space-y-3 border border-[#EAE3FF]">
                    <div className="flex items-center gap-2 text-[#4B2992] font-bold text-lg">
                      <FileText className="w-5 h-5" /> Facture : <span className="ml-1">{details.withdraw.invoice_code}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Banknote className="w-5 h-5 text-[#6C61F6]" />
                      <span className="font-semibold">Montant :</span> {details.withdraw.total_ttc} {details.withdraw.currency}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <CreditCard className="w-5 h-5 text-[#6C61F6]" />
                      <span className="font-semibold">Durée :</span> {details.withdraw.duration} heure
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-5 h-5 text-[#6C61F6]" />
                      <span className="font-semibold">Date :</span> {details.withdraw.created_at ? new Date(details.withdraw.created_at).toLocaleDateString() : '-'}
                    </div>
                    {details.withdraw.invoice_file && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <FileText className="w-5 h-5 text-[#6C61F6]" />
                        <a href={`${pdfUrl}${details.withdraw.invoice_file}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-semibold">Télécharger la facture PDF</a>
                      </div>
                    )}
                  </div>
                  {details.bank && (
                    <div className="rounded-xl bg-gradient-to-r from-[#EAE3FF] to-[#D3C8FE] shadow p-5 border border-[#BCADFC]">
                      <div className="font-bold text-[#4B2992] mb-2 flex items-center gap-2"><Banknote className="w-5 h-5" /> Informations bancaires</div>
                      <div className="text-gray-700"><span className="font-semibold">Banque :</span> {details.bank.bank_name}</div>
                      <div className="text-gray-700"><span className="font-semibold">IBAN :</span> {details.bank.iban}</div>
                      <div className="text-gray-700"><span className="font-semibold">BIC :</span> {details.bank.bic}</div>
                    </div>
                  )}
                  {details && details.withdraw && details.withdraw.payed === false && details.withdraw.status !== 'declined' && (
                    <div className="flex gap-3 mt-6 justify-end">
                      <button onClick={handleReject} disabled={actionLoading !== null} className="px-5 py-2 rounded-lg bg-red-100 text-red-700 font-bold hover:bg-red-200 shadow transition flex items-center gap-2 min-w-[100px] justify-center">
                        {actionLoading === 'reject' ? 'Veuillez patienter...' : 'Rejeter'}
                      </button>
                      <button onClick={handleAccept} disabled={actionLoading !== null} className="px-5 py-2 rounded-lg bg-green-100 text-green-700 font-bold hover:bg-green-200 shadow transition flex items-center gap-2 min-w-[100px] justify-center">
                        {actionLoading === 'accept' ? 'Veuillez patienter...' : 'Accepter'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminPaiement;
  
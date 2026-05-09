import { ArrowLeft, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import ExportButton from "@/components/exporter"
import { RootState } from "@/store/configureStore";
import { fetchWithdrawals } from "@/api/withdrawals_list";
import { WithdrawalApiResponse, Withdrawal } from "@/types/withdrawals";
import Loader from "@/components/common/Loader";
import NodataMessage from '@/components/moniteur/NodataMessage';


import money_icon from "@/assets/dashboard-moniteur/money-icon.svg";
import progress_icon from "@/assets/dashboard-moniteur/progress-icon.svg";
import { pdfUrl } from '@/api';
import { FaFileDownload } from 'react-icons/fa';
import { IoWarningOutline } from 'react-icons/io5';

const statusStyles = {
  Reçu: {
    bg: "bg-[#D7F6E6]",
    dot: "bg-[#4A8867]",
    text: "text-[#4A8867]",
    lightBg: "bg-[#D7F6E6]/20" 
  },
  "En cours": {
    bg: "bg-[#FFCEB2]",
    dot: "bg-[#AC4B20]",
    text: "text-[#AC4B20]",
    lightBg: "bg-[#FFCEB2]/20" 
  }
};

const PER_PAGE_OPTIONS = [5, 7, 10, 20, 50];

const TransactionHistory = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("Toutes les transactions");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalAll, setTotalAll] = useState(0);
  const [totalRecu, setTotalRecu] = useState(0);
  const [totalEnCours, setTotalEnCours] = useState(0);
  const [paginationMeta, setPaginationMeta] = useState({
    current_page: 1,
    last_page: 1,
    total: 0
  });

  const token = useSelector((state: RootState) => state.authReducer.token);

  // Récupère les totaux pour les badges
  const fetchBadgeCounts = useCallback(async () => {
    if (!token) return;
    try {
      const [all, recu, enCours] = await Promise.all([
        fetchWithdrawals(token, "all", 1, 1),
        fetchWithdrawals(token, "payed", 1, 1),
        fetchWithdrawals(token, "nopayed", 1, 1),
      ]);
      // console.log("Totaux récupérés:", { all: all.total, recu: recu.total, enCours: enCours.total });

      setTotalAll(all.total || 0);
      setTotalRecu(recu.total || 0);
      setTotalEnCours(enCours.total || 0);
    } catch (error) {
      console.error("Erreur lors du chargement des totaux:", error);
      setTotalAll(0);
      setTotalRecu(0);
      setTotalEnCours(0);
    }
  }, [token]);

  // Récupère les données avec pagination
  const fetchData = useCallback(async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const status = filter === "Toutes les transactions" 
        ? "all"
        : filter === "Reçu" 
        ? "payed" 
        : "nopayed";
        
      const response: WithdrawalApiResponse = await fetchWithdrawals(
        token, 
        status, 
        pageSize, 
        currentPage
      );
      
      // console.log("Réponse API:", response); // Debug
      
      setWithdrawals(response.data|| []);
      setPaginationMeta({
        current_page: response.current_page || 1,
        last_page: response.last_page || 1,
        total: response.total || 0
      });
      
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      setWithdrawals([]);
      setPaginationMeta({
        current_page: 1,
        last_page: 1,
        total: 0
      });
    } finally {
      setLoading(false);
    }
  }, [filter, pageSize, currentPage, token]);

  // Chargement initial des totaux
  useEffect(() => {
    fetchBadgeCounts();
  }, [fetchBadgeCounts]);

  // Chargement des données
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Fonctions utilitaires
  const toggleRow = (id: string) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === withdrawals.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(withdrawals.map(t => t.invoice_code || t.id.toString()));
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= paginationMeta.last_page) {
      setCurrentPage(page);
    }
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPageSize(newPerPage);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  // Configuration des filtres
  const filters = [
    { label: "Toutes les transactions", value: "all", count: totalAll },
    { label: "En cours", value: "nopayed", count: totalEnCours },
    { label: "Reçu", value: "payed", count: totalRecu },
  ];

  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between bg-[#F5F5F5] py-8 px-4 md:px-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/50 bg-[#a495e5] rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-100 hover:text-gray-600" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold">Historique des transactions</h1>
        </div>
        <ExportButton/>
      </div>

      {loading ? (
        <Loader />
      ) : paginationMeta.total === 0 && filter === "Toutes les transactions" ? (
        <NodataMessage contenue="Aucune transaction trouvée" />
      ) : (
        <>
          {/* Filtres et informations */}
          <div className="mb-4 flex flex-col gap-4 mt-6 px-4 md:px-8">
            {/* Filtres */}
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {filters.map(({ label, value, count }) => (
                <button
                  key={value}
                  onClick={() => handleFilterChange(label)}
                  className={`${
                    filter === label ? "bg-[#BCADFC]" : "bg-[#EEEEEE]"
                  } flex items-center gap-[8px] rounded-[12px] border-[0.5px] px-3 py-2 text-base font-[400] leading-[120%] text-black`}
                >
                  {label}
                  <span
                    className={`h-auto w-[31px] rounded-full p-1.5 text-center ${
                      filter === label ? "bg-[#D3C8FE]" : "bg-[#E0E0E0]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              ))}
            </div>

            {/* Informations de pagination */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#757575]">
              <p className="break-words font-[400] leading-[140%] text-[#616161] w-full sm:w-auto">
                Sont présentés {paginationMeta.total === 0 ? 0 : (paginationMeta.current_page - 1) * pageSize + 1} à{" "}
                {Math.min(paginationMeta.current_page * pageSize, paginationMeta.total)} résultats sur {paginationMeta.total}
              </p>

              <div className="hidden sm:block h-5 w-[1px] bg-[#616161]" />

              <label className="flex items-center gap-2 break-words font-[400] leading-[140%] text-[#616161]">
                Résultats par page:
                <select
                  className="rounded-[8px] border-[0.5px] p-1 sm:p-[4px] text-xs sm:text-sm outline-none"
                  value={pageSize}
                  onChange={(e) => handlePerPageChange(parseInt(e.target.value))}
                >
                  {PER_PAGE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {withdrawals.length === 0 ? (
            <div className="px-4 md:px-8">
              <NodataMessage
                contenue={
                  filter === "Reçu"
                    ? "Aucune transaction reçue pour le moment."
                    : filter === "En cours"
                    ? "Aucune transaction en cours pour le moment."
                    : "Aucune transaction trouvée pour ce filtre."
                }
              />
            </div>
          ) : (
            <>
              {/* Tableau */}
              <div className="overflow-x-auto px-4 md:px-8">
                <table className="w-full min-w-[640px] bg-white text-sm shadow-sm">
                  <thead>
                    <tr className="bg-gray-100 text-left text-base font-medium text-[#616161]">
                      <th className="px-3 py-2 sm:px-6 sm:py-4">
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={selectedRows.length === withdrawals.length && withdrawals.length > 0}
                            onChange={toggleAllRows}
                            className="h-[20px] w-[20px] rounded-[4px] border-[4px] border-[#9E9E9E]"
                          />
                          <span>Id de transaction</span>
                        </div>
                      </th>
                      <th className="px-3 py-2 sm:px-6 sm:py-4">
                        <div className="flex items-center gap-2">
                          <span className="hidden md:block">Créé le</span>
                          <img
                            src={progress_icon}
                            alt="Progress Icon"
                            className="h-auto w-[20px] object-cover"
                          />
                        </div>
                      </th>
                      <th className="px-3 py-2 sm:px-6 sm:py-4">
                        <div className="flex items-center gap-2">
                          <span className="hidden md:block">Montant</span>
                          <img
                            src={money_icon}
                            alt="Money Icon"
                            className="h-auto w-[20px] object-cover"
                          />
                        </div>
                      </th>
                      <th className="px-3 py-2 sm:px-6 sm:py-4">
                        <span>Statuts</span>
                      </th>
                      <th className="px-3 py-2 sm:px-6 sm:py-4">
                        <span>Fichier</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawals.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-gray-50">
                        <td className="px-3 py-2 sm:px-6 sm:py-4">
                          <div className="flex items-center gap-4 text-base text-[#616161]">
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(transaction.invoice_code || transaction.id.toString())}
                              onChange={() => toggleRow(transaction.invoice_code || transaction.id.toString())}
                              className="h-[20px] w-[20px] rounded-[4px] border-[4px] border-[#9E9E9E]"
                            />
                            {transaction.invoice_code || "N/A"}
                          </div>
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 text-base text-[#616161]">
                          {new Date(transaction.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 text-base text-[#616161]">
                          {transaction.total_ttc}&nbsp;€
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 text-base font-medium">
                          {/* Status desktop */}
                          <div className="hidden sm:block">
                            <span className={`rounded-[8px] px-3 py-1 ${
                              transaction.payed ? statusStyles.Reçu.bg : statusStyles["En cours"].bg
                            } ${
                              transaction.payed ? statusStyles.Reçu.text : statusStyles["En cours"].text
                            }`}>
                              {transaction.payed ? "Reçu" : "En cours"}
                            </span>
                          </div>
                          {/* Status mobile */}
                          <div className="sm:hidden flex justify-center">
                            <div className={`flex items-center justify-center w-10 h-9 ${
                              transaction.payed ? statusStyles.Reçu.lightBg : statusStyles["En cours"].lightBg
                            } rounded-xl`}>
                              <span className={`w-4 h-4 rounded-full ${
                                transaction.payed ? statusStyles.Reçu.dot : statusStyles["En cours"].dot
                              }`} />
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 text-base text-[#616161]">
                          <div className="flex items-center gap-2">
                            {transaction.payed ? (
                              <a href={`${pdfUrl}${transaction.invoice_file}`} target='_blank'>
                              <Download className="h-5 w-5 cursor-pointer" />
                            </a>
                            ) : (
                              <IoWarningOutline className="h-5 w-5 cursor-pointer text-red-500" />
                            )
                            }
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="text-sm text-gray-700 hidden md:block">
                      Page {paginationMeta.current_page} sur {paginationMeta.last_page}
                    </div>
                    <div className="flex items-center gap-2">
                      <label htmlFor="perPage" className="text-sm text-gray-600">
                        Résultats par page:
                      </label>
                      <select
                        id="perPage"
                        value={pageSize}
                        onChange={(e) => handlePerPageChange(Number(e.target.value))}
                        className="rounded-md border-gray-300 text-sm focus:border-[#BCADFC] focus:ring-[#BCADFC]"
                      >
                        {PER_PAGE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Boutons de pagination */}
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handlePageChange(paginationMeta.current_page - 1)}
                      disabled={paginationMeta.current_page === 1}
                      className="flex items-center justify-center rounded-md bg-[#BCADFC] px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-[#A57EDC] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handlePageChange(paginationMeta.current_page + 1)}
                      disabled={paginationMeta.current_page === paginationMeta.last_page}
                      className="flex items-center justify-center rounded-md bg-[#BCADFC] px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-[#A57EDC] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TransactionHistory;
import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import Loader from "@/components/common/Loader";
import { getWithdrawDetails, approveWithdraw, declineWithdraw } from "@/api/admin/monitor";
import { imageUrl } from "@/api";
import { CheckCircle, XCircle, User2, Mail, Phone, Banknote, FileText, Calendar, CreditCard } from "lucide-react";

interface PaiementDetailsModalProps {
  withdraw: any; // doit contenir au moins l'id et le token
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
}

const PaiementDetailsModal: React.FC<PaiementDetailsModalProps> = ({ withdraw, onClose, onAccept, onReject }) => {
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [actionLoading, setActionLoading] = useState<null | 'accept' | 'reject'>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!withdraw) return;
    setLoading(true);
    setDetails(null);
    getWithdrawDetails(withdraw.token, withdraw.id)
      .then((data) => setDetails(data))
      .finally(() => setLoading(false));
  }, [withdraw]);

  const handleAccept = async () => {
    setActionLoading('accept');
    try {
      await approveWithdraw(withdraw.token, withdraw.id);
      onAccept();
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    setActionLoading('reject');
    try {
      await declineWithdraw(withdraw.token, withdraw.id);
      onReject();
    } finally {
      setActionLoading(null);
    }
  };

  if (!withdraw) return null;

  return (
    <Sheet open={!!withdraw} onOpenChange={onClose}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={`${isMobile ? 'h-[90vh] rounded-t-xl' : 'sm:max-w-[500px]'} p-0 bg-[#F5F5F5] border-none`}
      >
        <div className="flex flex-col h-full">
          {/* HEADER */}
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
          {/* CONTENU */}
          <div className="px-[20px] py-6 flex-1 overflow-y-auto">
            {loading || !details ? (
              <div className="flex justify-center items-center h-full"><Loader /></div>
            ) : (
              <div className="space-y-6">
                {/* Statut payé */}
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
                {/* Carte paiement */}
                <div className="rounded-xl bg-white shadow p-5 space-y-3 border border-[#EAE3FF]">
                  <div className="flex items-center gap-2 text-[#4B2992] font-bold text-lg">
                    <FileText className="w-5 h-5" /> Facture : <span className="ml-1">{details.withdraw.invoice_code}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Banknote className="w-5 h-5 text-[#6C61F6]" />
                    <span className="font-semibold">Montant :</span> {details.withdraw.ammount} {details.withdraw.currency}
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CreditCard className="w-5 h-5 text-[#6C61F6]" />
                    <span className="font-semibold">Durée :</span> {details.withdraw.duration} min
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-5 h-5 text-[#6C61F6]" />
                    <span className="font-semibold">Date :</span> {details.withdraw.created_at ? new Date(details.withdraw.created_at).toLocaleDateString() : '-'}
                  </div>
                  {details.withdraw.invoice_file && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <FileText className="w-5 h-5 text-[#6C61F6]" />
                      <a href={details.withdraw.invoice_file} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-semibold">Télécharger la facture PDF</a>
                    </div>
                  )}
                </div>
                {/* Carte banque */}
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
  );
};

export default PaiementDetailsModal; 
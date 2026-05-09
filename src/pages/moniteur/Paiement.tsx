/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import RevenueChart from "@components/moniteurs/RevenueChart";
import BankAccountManager from "@components/moniteur/paiement/BankAccountManager";
import BillableHoursCard from "@components/moniteur/paiement/BillableHoursCard";
import NonBillableHoursCard from "@components/moniteur/paiement/NonBillableHoursCard";
import UpcomingPaymentsCard from "@components/moniteur/paiement/UpcomingPaymentsCard";
import HistoryPayementCard from "@components/moniteur/paiement/HistoryPayementCard";
import { InvoiceModal } from "@components/moniteur/paiement/InvoiceModal";
import { fetchWithdrawsStat, WithdrawsStatResponse } from "@/api/withdrawsStat";
import { createWithdraw } from "@/api/withdraws";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";

import { toast } from "react-hot-toast";
import NonBillableNotationModal from "@/components/moniteur/paiement/NonBillableNotationModal";
import Loader from "@/components/common/Loader";

const PaiementMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotationModalOpen, setIsNotationModalOpen] = useState<boolean>(false);
  const token = useSelector((state: RootState) => state.authReducer.token);

  const [withdrawsStat, setWithdrawsStat] = useState<WithdrawsStatResponse | null>(null);
  const [statLoading, setStatLoading] = useState(true);
  
// Dummy handler for InvoiceModal
const handleSubmit = async (invoiceNumber: string) => {
  if (!token) return;
  try {
    const res = await createWithdraw(token, invoiceNumber);
    if (res.success) {
      toast.success(res.message || "Demande de retrait enregistrée avec succès.");
    } else {
      toast.error(res.message || "Erreur lors de la demande de retrait.");
    }
    setIsModalOpen(false);
  } catch (e: any) {
    toast.error(e?.message || "Erreur lors de la demande de retrait.");
  }
};

  useEffect(() => {
    if (!token) return;
    setStatLoading(true);
    fetchWithdrawsStat(token)
      .then(setWithdrawsStat)
      .finally(() => setStatLoading(false));
  }, [token]);

  return (
    <div className="w-full p-7 mx-auto">
      <div className="flex h-full w-full flex-col items-start text-start">
        <h1 className="text-3xl font-semibold text-gray-900">
          Mes paiements & revenus
        </h1>
        <p className="text-sm font-[400] leading-[140%] text-[#616161]">
          Suivez vos gains, vos heures réalisées et l'historique de vos paiements
          sur la plateforme.
        </p>
        <div className="mt-12 grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {/* BillableHoursCard */}
          {statLoading ? (
            <div className="flex items-center justify-center min-h-[150px] bg-[#FDFDFD] border-[0.5px] border-[#E0E0E0] rounded-[8px]">
              <Loader size={32} showText={false} />
            </div>
          ) : (
            <BillableHoursCard
              hours={withdrawsStat?.billable?.hour || 0}
              totalHT={withdrawsStat?.my_cash || 0}
              onClick={() => setIsModalOpen(true)}
            />
          )}

          {/* NonBillableHoursCard */}
          {statLoading ? (
            <div className="flex items-center justify-center min-h-[150px] bg-[#FDFDFD] border-[0.5px] border-[#E0E0E0] rounded-[8px]">
            <Loader size={32} showText={false} />
            </div>
          ) : (
            <NonBillableHoursCard
              hours={withdrawsStat?.no_billable?.hour || 0}
              amount={withdrawsStat?.no_billable?.cash || 0}
              onClick={() => setIsNotationModalOpen(true)}
            />
          )}

            {statLoading ? (
            <div className="flex items-center justify-center min-h-[150px] bg-[#FDFDFD] border-[0.5px] border-[#E0E0E0] rounded-[8px]">
            <Loader size={32} showText={false} />
            </div>
          ) : (
            <UpcomingPaymentsCard
              count={withdrawsStat?.pendingWithdraw || 0}
            />
          )}

          <HistoryPayementCard
            path="/monitor/transactions"
          />
        </div>

        <div className="mt-6 flex w-full flex-col justify-between lg:flex-row">
          <div className="flex w-full flex-col items-start justify-between gap-2 lg:flex-row">
            <RevenueChart />
            
            <BankAccountManager />
          </div>
          <InvoiceModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            hours={withdrawsStat?.billable?.hour || 0}
            totalHT={withdrawsStat?.billable?.cash || 0}
            adminCash={withdrawsStat?.admin_cash}
            tvaCash={withdrawsStat?.tva_cash}
            totalTTC={withdrawsStat?.my_cash}
            onSubmit={handleSubmit}
          />
          
          <NonBillableNotationModal 
            isOpen={isNotationModalOpen}
            onClose={() => setIsNotationModalOpen(false)}
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default PaiementMain;

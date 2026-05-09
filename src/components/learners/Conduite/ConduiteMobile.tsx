/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { fetchLearnerLessons, Lesson, statusToFr, cancelLearnerAppointment } from "@/api/learner/lessons";
import Loader from "@/components/common/Loader";
import { imageUrl } from "@/api";
import { toast } from "react-hot-toast";
import { Pagination } from "@/components/Pagination/pagination";

import outline2 from "@assets/apprenants/dashboard/outline2.png";
import { Link } from "react-router";

const STATUS_COLORS: Record<string, { color: string; colorCenter: string }> = {
  "À venir": { color: "bg-[#FFCEB2] ", colorCenter: "bg-[#AC4B20]" },
  "Annulé": { color: "bg-[#FDCCCC]", colorCenter: "bg-[#F75555]" },
  "Terminé": { color: "bg-[#D7F6E6] ", colorCenter: "bg-[#62B589]" },
  "En attente": { color: "bg-[#EAE3FF] ", colorCenter: "bg-[#6C61F6]" },
  "En notation": { color: "bg-[#FFF8CD]", colorCenter: "bg-[#C1A300]" },
  "Confirmé": { color: "bg-[#CCE5FF]", colorCenter: "bg-[#007BFF]" },
};

//vérifie si un rendez-vous est dans le futur, 
// c'est-à-dire si sa date + heure de fin est après l'heure actuelle. return true or false
 
const isFutureAppointment = (date: string, end_time: string) => {
  if (!date || !end_time) return false;

  // Si la date contient un "T", on extrait la partie date (YYYY-MM-DD)
  let d = date;
  if (date.includes("T")) {
    d = date.split("T")[0];
  }

  // Forcer le format de l'heure à HH:mm:ss
  let end = end_time;
  if (/^\d{2}:\d{2}$/.test(end_time)) end += ":00";

  // Crée la date complète en local (évite les problèmes de fuseau avec Date.parse)
  const [year, month, day] = d.split("-");
  const [hour, minute, second = "00"] = end.split(":");
  const endDateTime = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second)
  );

  return endDateTime.getTime() > Date.now();
};

const ConduiteMobile = () => {
  const { token, user } = useSelector((state: RootState) => state.authReducer);
  const [appointments, setAppointments] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true); // Initialisé à true pour le chargement initial
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cancelId, setCancelId] = useState<number | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [paginationMeta, setPaginationMeta] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    from: 0,
    to: 0
  });

  const loadAppointments = async (status: string, page: number, pageSize: number) => {
    try {
      setLoading(true);
      
      const res = await fetchLearnerLessons(token, status, pageSize, page);
      setAppointments(res.data);
      setPaginationMeta({
        current_page: res.current_page,
        last_page: res.last_page,
        total: res.total,
        from: res.from,
        to: res.to
      });
    } catch (error) {
      console.error("Erreur lors du chargement des rendez-vous:", error);
      setAppointments([]);
      toast.error("Erreur lors du chargement des rendez-vous");
    } finally {
      setLoading(false);
    }
  };

  // Chargement des données au premier rendu
  useEffect(() => {
    loadAppointments(selectedStatus, currentPage, perPage);
  }, []);

  
  // Rechargement quand les filtres ou la pagination changent
  useEffect(() => {
    loadAppointments(selectedStatus, currentPage, perPage);
  }, [selectedStatus, currentPage, perPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= paginationMeta.last_page) {
      setCurrentPage(newPage);
    }
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1); 
  };

  const handleOpenModal = (appointmentId: number) => {
    // Vérifier si l'utilisateur est désactivé
    if (user?.is_active === 0) {
      toast.error("Compte temporairement bloqué. Votre compte a été désactivé. Pour le réactiver, veuillez contacter notre équipe.");
      return;
    }
    setCancelId(appointmentId);
    setCancelReason("");
    setShowModal(true);
  };

  const handleCancel = async () => {
    if (!cancelId || !cancelReason.trim()) return;
    setIsSubmitting(true);
    try {
      await cancelLearnerAppointment(token, {
        learner_id: appointments.find(a => a.id === cancelId)?.learner_id || 0,
        appointment_id: cancelId,
        cancellation_reason: cancelReason,
      });
      toast.success("Rendez-vous annulé avec succès.");
      setShowModal(false);
      // Recharger les rendez-vous avec les paramètres actuels
      await loadAppointments(selectedStatus, currentPage, perPage);
    } catch (e: any) {
      toast.error(e.message || "Erreur lors de l'annulation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "scheduled": return "À venir";
      case "confirmed": return "Confirmé";
      case "completed": return "Terminé";
      case "cancelled": return "Annulé";
      case "pending": return "En attente";
      case "notation": return "En notation";
      default: return status;
    }
  };

  return (
    <div className="lg:hidden pb-8 px-4 bg-gray-50">
      <div className="mb-4">
        <select
          value={selectedStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="w-full p-3 border rounded-lg bg-white font-medium text-sm"
          disabled={loading}
        >
          <option value="all">Tous les statuts</option>
          <option value="scheduled">À venir</option>
          <option value="confirmed">Confirmé</option>
          <option value="completed">Terminé</option>
          <option value="cancelled">Annulé</option>
          <option value="pending">En attente</option>
          <option value="notation">En notation</option>
        </select>
      </div>
      
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm">
          <Loader />
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm">
            {appointments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold">
                  {selectedStatus === "all" 
                    ? "Aucun rendez-vous disponible pour le moment"
                    : `Aucun rendez-vous avec le statut "${getStatusLabel(selectedStatus)}"`
                  }
                </span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className=" py-3 px-2 lg:py-6 lg:px-4  text-left text-sm font-semibold text-[#616161]">Moniteur</th>
                      <th className="py-3 px-2 lg:py-6 lg:px-4  text-left text-sm font-semibold text-[#616161]">Point de RDV</th>
                      <th className="py-3 px-2 lg:py-6 lg:px-4  text-left text-sm font-semibold text-[#616161]">Date</th>
                      <th className="py-3 px-2 lg:py-6 lg:px-4  text-left text-sm font-semibold text-[#616161]">Heure</th>
                      <th className="py-3 px-2 lg:py-6 lg:px-4  text-center text-sm font-semibold text-[#616161]">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.length > 0 && appointments.map((appt) => {
                      const statusFr = statusToFr(appt.status);
                      const statusColor = STATUS_COLORS[statusFr] || { color: "bg-gray-100", colorCenter: "bg-gray-400" };
                      const canCancel =
                        ["À venir", "Confirmé"].includes(statusFr) &&
                        isFutureAppointment(appt.date, appt.end_time);
                      return (
                        <tr key={appt.id} className="border-t border-gray-100">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              {appt.instructor.photo ? (
                                <img src={imageUrl + appt.instructor.photo} alt="Moniteur" className="h-8 w-8 rounded-full" />
                              ) : (
                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                  {appt.instructor.firstname[0]}
                                </div>
                              )}
                              <div className="flex flex-col">
                                <span className="font-semibold text-xs">{appt.instructor.firstname} {appt.instructor.lastname}</span>
                                
                              </div>

                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-xs text-[#616161]">
                              {appt.availability?.meeting_point?.label || "-"}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-xs font-semibold text-[#616161]">
                              {new Date(appt.date).toLocaleDateString("fr-FR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-xs font-semibold text-[#616161]">
                              {appt.start_time} → {appt.end_time}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex justify-center items-center gap-2">
                              <div className={`w-5 h-5 rounded-md flex justify-center items-center ${statusColor.color}`}>
                                <span className={`w-2 h-2 rounded-full ${statusColor.colorCenter}`}></span>
                              </div>
                              {canCancel && (
                                <button
                                  className="ml-2 px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-xs font-semibold"
                                  onClick={() => handleOpenModal(appt.id)}
                                >
                                  Annuler
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}
          {appointments.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={paginationMeta.last_page}
              totalItems={paginationMeta.total}
              itemsPerPage={perPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handlePerPageChange}
              isMobile={true}
            />
          )}
        </>
      )}

      {/* Bouton avec tooltip */}
      <div className="fixed bottom-16 right-6">
        <div className="relative">
          <Link to="/Learners/reservercours">
            <button 
              className="bg-[#6c61f6] p-5 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-full"
            >
              <img src={outline2} alt="Réservation" />
            </button>
          </Link>
          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute bottom-full right-0 mb-2 w-48 bg-gray-900 text-white text-sm rounded-lg py-2 px-3 shadow-lg transform translate-y-1 opacity-100 transition-all duration-200">
              Réserver une nouvelle leçon
              <div className="absolute bottom-0 right-4 w-2 h-2 bg-gray-900 transform rotate-45 translate-y-1"></div>
            </div>
          )}
        </div>
      </div>

      {/* Modal d'annulation */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={e => {
          if (e.target === e.currentTarget) setShowModal(false);
        }}>
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-4">Annuler le rendez-vous</h2>
            <textarea
              className="w-full border rounded p-2 mb-4"
              rows={3}
              placeholder="Raison de l'annulation"
              value={cancelReason}
              onChange={e => setCancelReason(e.target.value)}
              disabled={isSubmitting}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                onClick={() => setShowModal(false)}
                disabled={isSubmitting}
              >
                Fermer
              </button>
              <button
                className={`px-4 py-2 rounded bg-red-500 text-white font-semibold ${!cancelReason.trim() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleCancel}
                disabled={!cancelReason.trim() || isSubmitting}
              >
                {isSubmitting ? "Annulation..." : "Valider"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConduiteMobile;
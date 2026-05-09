/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { fetchLearnerLessons, Lesson, statusToFr, cancelLearnerAppointment } from "@/api/learner/lessons";
import Loader from "@/components/common/Loader";
import { imageUrl } from "@/api";
import { toast } from "react-hot-toast";

// Mapping status français -> couleurs (desktop et mobile)
const STATUS_COLORS: Record<string, { color: string; colorCenter: string }> = {
  "À venir": { color: "bg-[#FFCEB2] text-[#AC4B20]", colorCenter: "bg-[#AC4B20]" },
  "Annulé": { color: "bg-[#FDCCCC] text-[#F75555]", colorCenter: "bg-[#F75555]" },
  "Terminé": { color: "bg-[#D7F6E6] text-[#62B589]", colorCenter: "bg-[#62B589]" },
  "En attente": { color: "bg-[#EAE3FF] text-[#6C61F6]", colorCenter: "bg-[#6C61F6]" },
  "En notation": { color: "bg-[#FFF8CD] text-[#C1A300]", colorCenter: "bg-[#C1A300]" },
  "Confirmé": { color: "bg-[#CCE5FF] text-[#007BFF]", colorCenter: "bg-[#007BFF]" },
};

 
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

const ConduiteDesktop = () => {
  const { token, user } = useSelector((state: RootState) => state.authReducer);
  const [appointments, setAppointments] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [cancelId, setCancelId] = useState<number | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchLearnerLessons(token, selectedStatus)
      .then(res => setAppointments(res.data))
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false));
  }, [token, selectedStatus]);

  const handleStatusChange = async (status: string) => {
    setFilterLoading(true);
    setSelectedStatus(status);
    try {
      const res = await fetchLearnerLessons(token, status);
      setAppointments(res.data);
    } catch {
      setAppointments([]);
    } finally {
      setFilterLoading(false);
    }
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
      // Refresh appointments
      setLoading(true);
      fetchLearnerLessons(token, selectedStatus)
        .then(res => setAppointments(res.data))
        .catch(() => setAppointments([]))
        .finally(() => setLoading(false));
       
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
    <div>
      <div className="mb-6">
        <select
          value={selectedStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="p-3 border rounded-lg bg-white font-medium text-sm min-w-[200px]"
          disabled={filterLoading}
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
      {loading || filterLoading ? (
        <Loader />
      ) : appointments.length === 0 ? (
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
        <table className="min-w-full bg-white rounded shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-[#757575] ">
              <th className="px-6 py-5">Moniteur</th>
              <th className="px-6 py-5">Point de rendez-vous</th>
              <th className="px-6 py-5">Date</th>
              <th className="px-6 py-5">Heure</th>
              <th className="flex items-center justify-center px-6 py-5">Statuts</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 && appointments.map((appt) => {
              const statusFr = statusToFr(appt.status);
              const statusColor = STATUS_COLORS[statusFr] || { color: "bg-gray-100 text-gray-500", colorCenter: "bg-gray-400" };
              const canCancel =
                ["À venir", "Confirmé"].includes(statusFr) &&
                isFutureAppointment(appt.date, appt.end_time);
              return (
                <tr key={appt.id} className="border-b hover:bg-gray-50 text-sm">
                  <td className="px-6 py-4 flex items-center gap-3">
                    {appt.instructor.photo ? ( 
                      <img
                        src={imageUrl + appt.instructor.photo}
                        alt="Moniteur"
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                        {appt.instructor.firstname[0]}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold">
                        {appt.instructor.firstname} {appt.instructor.lastname}
                      </div>
                      <div className="text-xs text-gray-500">
                        {appt.instructor.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#616161]">{appt.availability?.meeting_point?.label || "-"}</td>
                  <td className="px-6 py-4 text-[#616161]">
                    {new Date(appt.date).toLocaleDateString("fr-FR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
                  </td>
                  <td className="px-6 py-4 text-[#616161]">{appt.start_time} → {appt.end_time}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4 justify-center">
                      <span className={`py-2 px-4 min-w-[110px] text-center rounded-full text-xs font-semibold shadow-sm ${statusColor.color}`}>
                        {statusFr}
                      </span>
                      {canCancel && (
                        <button
                          className="flex items-center gap-1 text-red-600 font-semibold text-xs px-2 py-1 rounded hover:bg-red-50 transition"
                          onClick={() => handleOpenModal(appt.id)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Annuler
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
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
        </table>
      )}
    </div>
  );
};

export default ConduiteDesktop;
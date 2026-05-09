import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "@/components/common/Loader";
import { fetchAppointmentsApprenant, Appointment } from "@/api/admin/AppointmentsApprenant";
import { fetchLearnerInfo } from "@/api/admin/InfosApprenant";
import { RootState } from "@/store/configureStore";
import { imageUrl } from "@/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PER_PAGE_OPTIONS = [10, 20, 50];

export function AppointmentsApprenant({ userId }: { userId: number | undefined }) {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });
  const [learnerName, setLearnerName] = useState<string>("");

  useEffect(() => {
    if (!token || !userId) return;
    setLoading(true);
    setError(null);
    fetchAppointmentsApprenant(token, userId, pagination.current_page, pagination.per_page)
      .then(res => {
        setAppointments(res.data);
        setPagination({
          current_page: res.current_page,
          last_page: res.last_page,
          per_page: res.per_page,
          total: res.total,
        });
      })
      .catch(() => {
        setAppointments([]);
        setError("Erreur lors du chargement des rendez-vous.");
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [token, userId, pagination.current_page, pagination.per_page]);

  useEffect(() => {
    if (!userId || !token) return;
    fetchLearnerInfo(userId, token)
      .then(res => setLearnerName(`${res.data.firstname} ${res.data.lastname}`))
      .catch(() => setLearnerName(""));
  }, [userId, token]);

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, current_page: page }));
  };
  const handlePerPageChange = (perPage: number) => {
    setPagination(prev => ({ ...prev, per_page: perPage, current_page: 1 }));
  };

  return (
    <div className="pt-2">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">
          Rendez-vous de {learnerName || "l'apprenant"}
          
        </h2>
        {loading ? (
          <div className="flex justify-center py-12"><Loader /></div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">{error}</div>
        ) : appointments.length === 0 ? (
          <div className="text-center text-gray-500 py-12">Aucun rendez-vous trouvé.</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Heure</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Statut</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Prix</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Motif annulation</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Présence élève</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Présence moniteur</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Moniteur</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {new Date(a.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {a.start_time} - {a.end_time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      a.status === "scheduled"
                        ? "bg-[#FFCEB2] text-[#AC4B20]"
                        : a.status === "cancelled"
                        ? "bg-[#FDCCCC] text-[#F75555]"
                        : a.status === "completed"
                        ? "bg-[#D7F6E6] text-[#62B589]"
                        : a.status === "pending"
                        ? "bg-[#EAE3FF] text-[#6C61F6]"
                        : a.status === "notation"
                        ? "bg-[#FFF8CD] text-[#C1A300]"
                        : a.status === "confirmed"
                        ? "bg-[#CCE5FF] text-[#007BFF]"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {a.status === "scheduled"
                        ? "À venir"
                        : a.status === "cancelled"
                        ? "Annulé"
                        : a.status === "completed"
                        ? "Terminé"
                        : a.status === "pending"
                        ? "En attente"
                        : a.status === "notation"
                        ? "En notation"
                        : a.status === "confirmed"
                        ? "Confirmé"
                        : a.status}
                    </span>

                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{a.price} Eur</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{a.cancellation_reason || "-"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {a.presence_student ? (
                          <span className="text-green-600 font-semibold">Oui</span>
                        ) : (
                          <span className="text-gray-400">Non</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {a.presence_monitor ? (
                          <span className="text-green-600 font-semibold">Oui</span>
                        ) : (
                          <span className="text-gray-400">Non</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                        {a.instructor?.photo ? (
                          <img
                            src={`${imageUrl}${a.instructor.photo}`}
                            alt={`${a.instructor.firstname} ${a.instructor.lastname}`}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center text-xs font-semibold text-white">
                            {`${a.instructor.lastname?.charAt(0) ?? ""}${a.instructor.firstname?.charAt(0) ?? ""}`}
                          </div>
                        )}
                        <div>
                          <div className="text-xs font-medium text-gray-900">
                            {a.instructor.firstname} {a.instructor.lastname}
                          </div>
                          <div className="text-xs text-gray-500">{a.instructor.email}</div>
                          <div className="text-xs text-gray-500">{a.instructor.phone}</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-700 hidden md:block">
                    Page {pagination.current_page} sur {pagination.last_page}
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor="perPage" className="text-sm text-gray-600">
                      Résultats par page:
                    </label>
                    <select
                      id="perPage"
                      value={pagination.per_page}
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
                    onClick={() => handlePageChange(pagination.current_page - 1)}
                    disabled={pagination.current_page === 1}
                    className={`p-2 rounded-md ${
                      pagination.current_page === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  {(() => {
                    const totalPages = pagination.last_page;
                    const currentPage = pagination.current_page;
                    const pages: (number | string)[] = [];

                    if (totalPages <= 5) {
                      for (let i = 1; i <= totalPages; i++) pages.push(i);
                    } else {
                      pages.push(1);
                      const startPage = Math.max(2, currentPage - 1);
                      const endPage = Math.min(totalPages - 1, currentPage + 1);
                      if (startPage > 2) pages.push("...");
                      for (let i = startPage; i <= endPage; i++) pages.push(i);
                      if (endPage < totalPages - 1) pages.push("...");
                      pages.push(totalPages);
                    }

                    return pages.map((page, idx) => (
                      <button
                        key={idx}
                        onClick={() => typeof page === "number" ? handlePageChange(page) : undefined}
                        disabled={page === "..." || page === currentPage}
                        className={`px-3 py-1 rounded-md text-sm ${
                          page === "..."
                            ? "text-gray-400 cursor-default"
                            : page === currentPage
                            ? "bg-[#BCADFC] text-white cursor-default"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    ));
                  })()}
                  <button
                    onClick={() => handlePageChange(pagination.current_page + 1)}
                    disabled={pagination.current_page === pagination.last_page}
                    className={`p-2 rounded-md ${
                      pagination.current_page === pagination.last_page
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
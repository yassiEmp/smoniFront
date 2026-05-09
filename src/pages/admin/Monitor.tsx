import { useEffect, useState } from "react";
import { getMonitors, toggleMonitorStatus } from "@/api/admin/monitor";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/common/Loader";
import type { RootState } from "@/store/configureStore";
import type {
  MonitorType,
  MonitorListPagination,
} from "@/types/admin/reduceType";
import { LucideEye, LucideLock, LucideUnlock } from "lucide-react";
import MonitorDetails from "@/components/admin/MonitorDetails";
import { imageUrl } from "@/api";
import { useNavigate } from "react-router";

const PER_PAGE_OPTIONS = [10, 20, 30, 40];

const MonitorAdmin = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.authReducer);
  const monitorsPagination = useSelector(
    (state: RootState) => state.adminReducer.monitors,
  ) as MonitorListPagination;
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [statusLoading, setStatusLoading] = useState<number | null>(null);
  const [selectedMonitor, setSelectedMonitor] = useState<MonitorType | null>(
    null,
  );
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "blocked"
  >("all");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMonitors = async () => {
      setIsLoading(true);
      try {
        await getMonitors(token, dispatch, currentPage, perPage);
      } catch (error) {
        console.error("Erreur lors du chargement des moniteurs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMonitors();
  }, [token, currentPage, perPage, dispatch]);

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleToggleStatus = async (monitor: MonitorType) => {
    setStatusLoading(monitor.id);
    await toggleMonitorStatus(token, monitor.id.toString(), dispatch);
    setStatusLoading(null);
  };

  const getStatusLabel = (is_active: number) => {
    return (
      <span
        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
          is_active
            ? "border border-green-300 bg-green-100 text-green-700"
            : "border border-red-300 bg-red-100 text-red-700"
        }`}
      >
        {is_active ? "Actif" : "Bloqué"}
      </span>
    );
  };

  // Filtrage côté front
  const filteredMonitors = (monitorsPagination?.data || []).filter(
    (monitor: MonitorType) => {
      if (statusFilter === "active") return monitor.is_active === 1;
      if (statusFilter === "blocked") return monitor.is_active === 0;
      return true;
    },
  );

  return (
    <div className="mx-auto w-full px-6 py-7">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Liste des moniteurs</h1>
          <p className="mt-2 text-sm text-gray-600">Retrouvez ici tous les moniteurs inscrits sur la plateforme</p>
        </div>
      </div>
      {/* Filtres */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-t-lg bg-white p-6 md:flex-row">
        <div className="flex gap-2">
          <button
            onClick={() => setStatusFilter("all")}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 font-semibold transition-colors ${statusFilter === "all" ? "border-[#EAE3FF] bg-[#BCADFC]" : "border-gray-200 bg-gray-100"}`}
          >
            Tous les statuts
          </button>
          <button
            onClick={() => setStatusFilter("active")}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 font-semibold transition-colors ${statusFilter === "active" ? "border-[#EAE3FF] bg-[#BCADFC]" : "border-gray-200 bg-gray-100"}`}
          >
            Actif
          </button>
          <button
            onClick={() => setStatusFilter("blocked")}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 font-semibold transition-colors ${statusFilter === "blocked" ? "border-[#EAE3FF] bg-[#BCADFC]" : "border-gray-200 bg-gray-100"}`}
          >
            Bloqué
          </button>
        </div>
        <div className="text-md font-medium text-gray-600">
          Résultat Total : {filteredMonitors.length}
        </div>
      </div>
      {/* Tableau harmonisé */}
      <div className="rounded-lg bg-white shadow">
        <div className="scrollbar-hide overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium tracking-wider text-gray-700">
                  Photo
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium tracking-wider text-gray-700">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium tracking-wider text-gray-700">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium tracking-wider text-gray-700">
                  Téléphone
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium tracking-wider text-gray-700">
                  Ville
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium tracking-wider text-gray-700">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium tracking-wider text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center">
                    <Loader />
                  </td>
                </tr>
              ) : filteredMonitors.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-lg text-gray-500"
                  >
                    Aucun moniteur trouvé.
                  </td>
                </tr>
              ) : (
                filteredMonitors.map((monitor: MonitorType) => (
                  <tr
                    key={monitor.id}
                    className="cursor-pointer transition-colors hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      {monitor?.photo ? (
                        <img
                          src={imageUrl + monitor.photo}
                          alt={`${monitor.firstname} ${monitor.lastname}`}
                          className="h-10 w-10 rounded-full border object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 text-lg font-bold text-white">
                          {monitor.firstname?.charAt(0) ?? ""}
                          {monitor.lastname?.charAt(0) ?? ""}
                        </div>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {monitor.firstname} {monitor.lastname}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {monitor.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {monitor.phone || "-"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {monitor.instructor_profile?.city || "-"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {getStatusLabel(monitor.is_active)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className={`flex items-center justify-center gap-1 text-xs font-semibold transition-colors ${monitor.is_active ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100" : "border-green-200 bg-green-50 text-green-600 hover:bg-green-100"}`}
                          disabled={statusLoading === monitor.id}
                          onClick={() => handleToggleStatus(monitor)}
                          title={monitor.is_active ? "Bloquer" : "Débloquer"}
                        >
                          {statusLoading === monitor.id ? (
                            "..."
                          ) : monitor.is_active ? (
                            <LucideLock className="h-5 w-5" />
                          ) : (
                            <LucideUnlock className="h-5 w-5" />
                          )}
                        </button>
                        <button
                          className="flex items-center justify-center text-indigo-600 hover:text-indigo-900 disabled:opacity-50"
                          title="Voir"
                          onClick={() => {
                            navigate("/admin/moniteurs/details", {
                              state: { monitorId: monitor?.id },
                            });
                          }}
                        >
                          <LucideEye className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {filteredMonitors.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="hidden text-sm text-gray-700 md:block">
                  Page {monitorsPagination?.current_page ?? 1} sur{" "}
                  {monitorsPagination?.last_page ?? 1}
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="perPage" className="text-sm text-gray-600">
                    Résultats par page:
                  </label>
                  <select
                    id="perPage"
                    value={perPage}
                    onChange={(e) =>
                      handlePerPageChange(Number(e.target.value))
                    }
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
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handlePageChange(
                      (monitorsPagination?.current_page ?? 1) - 1,
                    )
                  }
                  disabled={(monitorsPagination?.current_page ?? 1) === 1}
                  className={`rounded-md p-2 ${(monitorsPagination?.current_page ?? 1) === 1 ? "cursor-not-allowed text-gray-400" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  {"<"}
                </button>
                {(() => {
                  const totalPages = monitorsPagination?.last_page ?? 1;
                  const currentPage = monitorsPagination?.current_page ?? 1;
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
                      onClick={() =>
                        typeof page === "number" ? handlePageChange(page) : null
                      }
                      disabled={page === "..." || page === currentPage}
                      className={`rounded-md px-3 py-1 text-sm ${
                        page === "..."
                          ? "cursor-default text-gray-400"
                          : page === currentPage
                            ? "cursor-default bg-[#BCADFC] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ));
                })()}
                <button
                  onClick={() =>
                    handlePageChange(
                      (monitorsPagination?.current_page ?? 1) + 1,
                    )
                  }
                  disabled={
                    (monitorsPagination?.current_page ?? 1) ===
                    (monitorsPagination?.last_page ?? 1)
                  }
                  className={`rounded-md p-2 ${(monitorsPagination?.current_page ?? 1) === (monitorsPagination?.last_page ?? 1) ? "cursor-not-allowed text-gray-400" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedMonitor && (
        <MonitorDetails
          monitor={selectedMonitor}
          onClose={() => setSelectedMonitor(null)}
        />
      )}
    </div>
  );
};

export default MonitorAdmin;

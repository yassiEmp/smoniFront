import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import Loader from "@/components/common/Loader";
import { fetchLearners, Learner, toggleLearnerStatus } from "@/api/admin/ListLearners";
import { Eye, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { imageUrl } from "@/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LockKeyhole, LockKeyholeOpen } from 'lucide-react';

const PER_PAGE_OPTIONS = [10, 20, 50];

export default function ListLearners() {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [learners, setLearners] = useState<Learner[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetchLearners(token, pagination.current_page, pagination.per_page, searchTerm)
      .then(res => {
        setLearners(res.data.data);
        setPagination({
          current_page: res.data.current_page,
          last_page: res.data.last_page,
          per_page: res.data.per_page,
          total: res.data.total,
        });
      })
      .catch(() => setLearners([]))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [token, pagination.current_page, pagination.per_page, searchTerm]);



  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, current_page: page }));
  };
  const [actionLoading, setActionLoading] = useState<{ [id: number]: boolean }>({});

  const handlePerPageChange = (perPage: number) => {
    setPagination((prev) => ({ ...prev, per_page: perPage, current_page: 1 }));
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPagination((prev) => ({ ...prev, current_page: 1 }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleSearch(value);
  };

  const handleToggleStatus = useCallback(async (learner: Learner) => {
    if (!token) return;
    setActionLoading(prev => ({ ...prev, [learner.id]: true }));
    try {
      const res = await toggleLearnerStatus(learner.id, token);
      toast.success(res.data?.data || "Action effectuée");
              fetchLearners(token, pagination.current_page, pagination.per_page, searchTerm)
        .then(res => {
          setLearners(res.data.data);
          setPagination({
            current_page: res.data.current_page,
            last_page: res.data.last_page,
            per_page: res.data.per_page,
            total: res.data.total,
          });
        });
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Erreur lors de l'action");
    } finally {
      setActionLoading(prev => ({ ...prev, [learner.id]: false }));
    }
  }, [token, pagination.current_page, pagination.per_page]);

  return (
    <div className="mx-auto w-full pl-3 lg:pl-6 py-7 ">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Liste des apprenants</h1>
          <p className="mt-2 text-sm text-gray-600">Retrouvez ici tous les apprenants inscrits sur la plateforme</p>
        </div>
      </div>
      <div className="bg-white rounded-t-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un apprenant..."
              className="block w-96 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#BCADFC] focus:border-[#BCADFC] sm:text-sm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="text-md text-gray-600 font-medium">
          Résultat Total : <span className="text-[#6C4EEA]">{pagination.total}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">

        <div className="overflow-x-auto scrollbar-hide">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">Apprenant</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">Statut</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center">
                    <Loader />
                  </td>
                </tr>
              ) : learners.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500 text-lg">
                    Aucun Apprenant trouvé.
                  </td>
                </tr>
              ) :
                (learners.map((learner) => (
                  <tr key={learner.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {learner.photo ? (
                            <img
                              src={`${imageUrl}${learner.photo}`}
                              alt={`${learner.firstname} ${learner.lastname}`}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-lg font-semibold text-white">
                              {`${learner.lastname?.charAt(0) ?? ''}${learner.firstname?.charAt(0) ?? ''}`}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {`${learner.firstname} ${learner.lastname}`}
                          </div>
                          <div className="text-sm text-gray-500">
                            @{learner.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {learner.phone ? learner.phone : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${learner.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {learner.is_active ? "Activé" : "Bloqué"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className={`flex items-center justify-center gap-1 text-xs font-semibold transition-colors rounded border px-2 py-1
                        ${learner.is_active
                              ? "border-red-200 border bg-red-50 text-red-600 hover:bg-red-100"
                              : "border-green-200 border bg-green-50 text-green-600 hover:bg-green-100"
                            }`}
                          disabled={actionLoading[learner.id]}
                          onClick={() => handleToggleStatus(learner)}
                          title={learner.is_active ? "Désactiver" : "Activer"}
                        >
                          {actionLoading[learner.id] ? (
                            <span className="text-xs">...</span>
                          ) : learner.is_active ? (
                            <LockKeyhole className="w-4 h-4" />
                          ) : (
                            <LockKeyholeOpen className="w-4 h-4" />
                          )}
                        </button>


                        <button
                          className="text-indigo-600 hover:text-indigo-900 font-medium"
                          onClick={() => navigate(`/admin/apprenants/${learner.id}`)}
                          title="Voir"
                        >
                          <Eye className='w-5 h-5' />
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
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
                className={`p-2 rounded-md ${pagination.current_page === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <ChevronLeft size={20} />
              </button>
              {(() => {
                const totalPages = pagination.last_page;
                const currentPage = pagination.current_page;
                const pages: (number | string)[] = [];

                if (totalPages <= 5) {
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                  }
                } else {
                  pages.push(1);
                  const startPage = Math.max(2, currentPage - 1);
                  const endPage = Math.min(totalPages - 1, currentPage + 1);
                  if (startPage > 2) pages.push('...');
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(i);
                  }
                  if (endPage < totalPages - 1) pages.push('...');
                  pages.push(totalPages);
                }

                return pages.map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                    disabled={page === '...' || page === currentPage}
                    className={`px-3 py-1 rounded-md text-sm ${page === '...'
                        ? 'text-gray-400 cursor-default'
                        : page === currentPage
                          ? 'bg-[#BCADFC] text-white cursor-default'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {page}
                  </button>
                ));
              })()}
              <button
                onClick={() => handlePageChange(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.last_page}
                className={`p-2 rounded-md ${pagination.current_page === pagination.last_page
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
}
import  { useEffect, useMemo, useState } from "react";
import Loader from "@/components/common/Loader";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { getMonitorsLeaners } from "@/api/admin/monitor";
import { imageUrl } from "@/api";
import { useLocation, useNavigate } from "react-router";
import ProfilApprenant from "@/components/moniteurs/ProfilApprenant";

const PER_PAGE_OPTIONS = [10, 20, 30, 40];
const FILTERS = [
  { key: 'all', label: 'Tous les apprenants' },
  { key: 'ready', label: 'Prêts pour l\'examen' },
  { key: 'prep', label: 'En préparation' },
];
type FilterType = 'all' | 'ready' | 'prep';

const MonitorLeanerListe = () => {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [learners, setLearners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [paginationMeta, setPaginationMeta] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10
  });
  const [selectedLearner, setSelectedLearner] = useState<any | null>(null);
  const location = useLocation();
  const monitorId = location.state?.monitorId;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLearners = async () => {
      setIsLoading(true);
      try {
        const data = await getMonitorsLeaners(token, monitorId, currentPage, perPage);
        setLearners(data.data);
        setPaginationMeta(data.meta);
      } catch {
        setLearners([]);
        setPaginationMeta({ current_page: 1, last_page: 1, total: 0, per_page: perPage });
      } finally {
        setIsLoading(false);
      }
    };
    fetchLearners();
  }, [token, currentPage, perPage, monitorId]);

  const filteredLearners = useMemo(() => {
    if (!learners) return [];
    return learners.filter((item) => {
      if (filter === 'all') return true;
      if (filter === 'ready') return item.status === true;
      if (filter === 'prep') return item.status === false;
    });
  }, [filter, learners]);

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full p-7 mx-auto">
      <div className="mb-8 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded hover:bg-gray-100 focus:outline-none">
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-3xl font-semibold text-gray-900">Liste des apprenants du moniteur</h1>
      </div>
      <p className="mt-2 text-sm text-gray-600">Consultez la liste des apprenants associés à ce moniteur</p>
      <div className="pb-2 py-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4">
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key as FilterType)}
                className={`px-4 py-2 rounded-lg border font-semibold flex items-center gap-2 transition-colors ${filter === f.key
                  ? 'bg-[#BCADFC] border-[#EAE3FF]'
                  : 'bg-gray-100 border-gray-200'
                  }`}
              >
                {f.label}
                <span className={`px-2 py-1 rounded-full text-sm ${filter === f.key ? 'bg-[#D3C8FE]' : 'bg-gray-200'}`}>{
                  filter === f.key
                    ? filteredLearners.length
                    : learners.filter(a => {
                        if (f.key === 'all') return true;
                        if (f.key === 'ready') return a.status === true;
                        if (f.key === 'prep') return a.status === false;
                      }).length
                }</span>
              </button>
            ))}
          </div>
          <div className="text-md text-gray-600 font-medium">
            Résultat Total : {paginationMeta.total}
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : paginationMeta.total === 0 ? (
        <div className="text-center text-gray-500 py-10">Aucun apprenant trouvé.</div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Apprenant</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Contact</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Heures estimées</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Heures réalisées</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLearners.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => setSelectedLearner(item)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {item.learner.photo ? (
                            <img
                              src={`${imageUrl}${item.learner.photo}`}
                              alt={`${item.learner.firstname} ${item.learner.lastname}`}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-lg font-semibold text-white">
                              {`${item.learner.lastname?.charAt(0) ?? ''}${item.learner.firstname?.charAt(0) ?? ''}`}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {`${item.learner.firstname} ${item.learner.lastname}`}
                          </div>
                          <div className="text-sm text-gray-500">
                            @{item.learner.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.learner.phone ? item.learner.phone : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.hour_estimate ? item.hour_estimate + "h" : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.total_duration ? item.total_duration + "h" : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                        onClick={e => { e.stopPropagation(); setSelectedLearner(item); }}
                      >
                        <Eye className='w-5 h-5' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {paginationMeta.total > 0 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-700 hidden md:block">
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
                    className={`p-2 rounded-md ${paginationMeta.current_page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <ChevronLeft size={20} />
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
                        pages.push('...');
                      }
                      for (let i = startPage; i <= endPage; i++) {
                        pages.push(i);
                      }
                      if (endPage < totalPages - 1) {
                        pages.push('...');
                      }
                      pages.push(totalPages);
                    }
                    return pages.map((page, index) => (
                      <button
                        key={index}
                        onClick={() => typeof page === 'number' ? handlePageChange(page) : undefined}
                        disabled={page === '...' || page === currentPage}
                        className={`px-3 py-1 rounded-md text-sm ${page === '...' ? 'text-gray-400 cursor-default' : page === currentPage ? 'bg-[#BCADFC] text-white cursor-default' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {page}
                      </button>
                    ));
                  })()}
                  <button
                    onClick={() => handlePageChange(paginationMeta.current_page + 1)}
                    disabled={paginationMeta.current_page === paginationMeta.last_page}
                    className={`p-2 rounded-md ${paginationMeta.current_page === paginationMeta.last_page ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {selectedLearner && (
        <ProfilApprenant
          nom={`${selectedLearner.learner.firstname} ${selectedLearner.learner.lastname}`}
          profil={selectedLearner.learner?.photo}
          onClose={() => setSelectedLearner(null)}
          learner={selectedLearner.learner}
          total_duration={selectedLearner.total_duration}
          status={selectedLearner.status}
        />
      )}
    </div>
  );
};

export const MonitorLearnersTab = ({ monitorId }: { monitorId: number }) => {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [learners, setLearners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [paginationMeta, setPaginationMeta] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10
  });
  const [selectedLearner, setSelectedLearner] = useState<any | null>(null);

  useEffect(() => {
    const fetchLearners = async () => {
      setIsLoading(true);
      try {
        const data = await getMonitorsLeaners(token, monitorId, currentPage, perPage);
        setLearners(data.data);
        setPaginationMeta(data.meta);
      } catch {
        setLearners([]);
        setPaginationMeta({ current_page: 1, last_page: 1, total: 0, per_page: perPage });
      } finally {
        setIsLoading(false);
      }
    };
    fetchLearners();
  }, [token, currentPage, perPage, monitorId]);

  const filteredLearners = useMemo(() => {
    if (!learners) return [];
    return learners.filter((item) => {
      if (filter === 'all') return true;
      if (filter === 'ready') return item.status === true;
      if (filter === 'prep') return item.status === false;
    });
  }, [filter, learners]);

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full mx-auto">
      <div className="pb-2 py-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4">
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key as FilterType)}
                className={`px-4 py-2 rounded-lg border font-semibold flex items-center gap-2 transition-colors ${filter === f.key
                  ? 'bg-[#BCADFC] border-[#EAE3FF]'
                  : 'bg-gray-100 border-gray-200'
                  }`}
              >
                {f.label}
                <span className={`px-2 py-1 rounded-full text-sm ${filter === f.key ? 'bg-[#D3C8FE]' : 'bg-gray-200'}`}>{
                  filter === f.key
                    ? filteredLearners.length
                    : learners.filter(a => {
                        if (f.key === 'all') return true;
                        if (f.key === 'ready') return a.status === true;
                        if (f.key === 'prep') return a.status === false;
                      }).length
                }</span>
              </button>
            ))}
          </div>
          <div className="text-md text-gray-600 font-medium">
            Résultat Total : {paginationMeta.total}
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : paginationMeta.total === 0 ? (
        <div className="text-center text-gray-500 py-10">Aucun apprenant trouvé.</div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Apprenant</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Contact</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Heures estimées</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Heures réalisées</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLearners.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => setSelectedLearner(item)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {item.learner.photo ? (
                            <img
                              src={`${imageUrl}${item.learner.photo}`}
                              alt={`${item.learner.firstname} ${item.learner.lastname}`}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-lg font-semibold text-white">
                              {`${item.learner.lastname?.charAt(0) ?? ''}${item.learner.firstname?.charAt(0) ?? ''}`}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {`${item.learner.firstname} ${item.learner.lastname}`}
                          </div>
                          <div className="text-sm text-gray-500">
                            @{item.learner.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.learner.phone ? item.learner.phone : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.hour_estimate ? item.hour_estimate + "h" : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.total_duration ? item.total_duration + "h" : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                        onClick={e => { e.stopPropagation(); setSelectedLearner(item); }}
                      >
                        <Eye className='w-5 h-5' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {paginationMeta.total > 0 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-700 hidden md:block">
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
                    className={`p-2 rounded-md ${paginationMeta.current_page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <ChevronLeft size={20} />
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
                        pages.push('...');
                      }
                      for (let i = startPage; i <= endPage; i++) {
                        pages.push(i);
                      }
                      if (endPage < totalPages - 1) {
                        pages.push('...');
                      }
                      pages.push(totalPages);
                    }
                    return pages.map((page, index) => (
                      <button
                        key={index}
                        onClick={() => typeof page === 'number' ? handlePageChange(page) : undefined}
                        disabled={page === '...' || page === currentPage}
                        className={`px-3 py-1 rounded-md text-sm ${page === '...' ? 'text-gray-400 cursor-default' : page === currentPage ? 'bg-[#BCADFC] text-white cursor-default' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {page}
                      </button>
                    ));
                  })()}
                  <button
                    onClick={() => handlePageChange(paginationMeta.current_page + 1)}
                    disabled={paginationMeta.current_page === paginationMeta.last_page}
                    className={`p-2 rounded-md ${paginationMeta.current_page === paginationMeta.last_page ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {selectedLearner && (
        <ProfilApprenant
          nom={`${selectedLearner.learner.firstname} ${selectedLearner.learner.lastname}`}
          profil={selectedLearner.learner?.photo}
          onClose={() => setSelectedLearner(null)}
          learner={selectedLearner.learner}
          total_duration={selectedLearner.total_duration}
          status={selectedLearner.status}
        />
      )}
    </div>
  );
};

export default MonitorLeanerListe;

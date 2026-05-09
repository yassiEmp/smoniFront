import { useEffect, useState } from 'react';
import Loader from '@/components/common/Loader';
import { Eye, PencilLine } from 'lucide-react';
import DetailExamen from '@/components/admin/DetailExamen';
import { getExamens } from '@/api/monitor/examen';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/configureStore';
import MonitorEditExamenModal from '@/components/moniteurs/examen/MonitorEditExamenModal';
import { imageUrl } from '@/api';
import VueNouvelUtilisateur from '@/components/moniteurs/apprenant/VueNouvelUtilisateur';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  photo: string;
  email: string;
  phone?: string;
  genre?: string;
}

export interface ExamenType {
  id: number;
  date: string;
  datetime: string | null;
  moniteur: User;
  apprenant: User;
  statut: 'refused' | 'confirmed' | 'pending';
}

function formatDateTime(datetime: string | null, dateOnly: string | null) {
  if (datetime) {
    const d = new Date(datetime.replace(' ', 'T'));
    if (!isNaN(d.getTime())) {
      return d.toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
    }
    return datetime;
  }
  if (dateOnly) {
    return dateOnly;
  }
  return '';
}

const MonitorExamen = () => {
  const { token, user } = useSelector((state: RootState) => state.authReducer);
  const { examens } = useSelector((state: RootState) => state.adminReducer);
  const [statutFilter, setStatutFilter] = useState<'all' | 'refused' | 'confirmed' | 'pending'>('all');
  const [viewingExamen, setViewingExamen] = useState<ExamenType | null>(null);
  const [editingExamen, setEditingExamen] = useState<ExamenType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const dispatch = useDispatch<AppDispatch>();

  const PER_PAGE_OPTIONS = [10, 20, 30, 40];

  useEffect(() => {
    const fetchExamens = async () => {
      if (statutFilter === 'all' && currentPage === 1) {
      setIsLoading(true);
      } else {
        setFilterLoading(true);
      }
      
      try {
        await getExamens(token, dispatch, user.id, currentPage, perPage, statutFilter);
      } finally {
        setIsLoading(false);
        setFilterLoading(false);
      }
    };
    if (token && user?.id) {
      fetchExamens();
    }
  }, [token, user, currentPage, perPage, statutFilter, dispatch]);

  // Quand on change de filtre, on revient à la page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [statutFilter]);

  const mappedExamens: ExamenType[] = (examens?.data || []).map((examen: any) => ({
    id: examen.id,
    date: examen.date,
    datetime: examen.datetime,
    moniteur: {
      id: examen.monitor?.id,
      firstname: examen.monitor?.firstname,
      lastname: examen.monitor?.lastname,
      photo: examen.monitor?.photo || '',
      email: examen.monitor?.email,
      phone: examen.monitor?.phone || '',
      genre: examen.monitor?.genre || '',
    },
    apprenant: {
      id: examen.learner?.id,
      firstname: examen.learner?.firstname,
      lastname: examen.learner?.lastname,
      photo: examen.learner?.photo || '',
      email: examen.learner?.email,
      phone: examen.learner?.phone || '',
      genre: examen.learner?.genre || '',
    },
    statut: (examen.status as 'refused' | 'confirmed' | 'pending') ?? 'pending',
  }));

  // Supprimer cette fonction car le filtrage se fait maintenant côté serveur
  // const filteredExamens = mappedExamens.filter((examen: ExamenType) => {
  //   if (statutFilter === 'all') return true;
  //   return examen.statut === statutFilter;
  // });

  const getStatutLabel = (statut: string) => {
    switch (statut) {
      case 'confirmed':
        return <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold border border-blue-300 bg-blue-100 text-blue-700">Confirmé</span>;
      case 'pending':
        return <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold border border-yellow-300 bg-yellow-100 text-yellow-700">En attente</span>;
      case 'refused':
        return <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold border border-red-300 bg-red-100 text-red-700">Refusé</span>;
      default:
        return statut;
    }
  };

  const getStatutText = (statut: string) => {
    switch (statut) {
      case 'confirmed':
        return 'Confirmé';
      case 'pending':
        return 'En attente';
      case 'refused':
        return 'Refusé';
      default:
        return statut;
    }
  };

  // Pagination
  const totalPages = Math.ceil((examens.total || 0) / perPage);
  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };



  // Callback pour recharger les données après modification d'un examen
  const handleExamenUpdated = () => {
    // Recharger les données avec le filtre actuel
    getExamens(token, dispatch, user.id, currentPage, perPage, statutFilter);
  };


  return (
    <div className="mx-auto w-full px-6 py-7">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Mes examens</h1>
          <p className="mt-2 text-sm text-gray-600">Retrouvez ici tous vos examens programmés</p>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (examens.total === 0 && statutFilter === 'all') ? (
        <VueNouvelUtilisateur contenue="Vous n'avez pas encore d'examens programmés. Les examens qui vous seront attribués apparaîtront ici." />
      ) : (
        <div className="">
          {/* Filtres */}
          <div className="bg-white rounded-t-lg p-4 sm:p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2 w-full md:flex-row md:gap-2 md:w-auto">
              <button
                onClick={() => setStatutFilter('all')}
                disabled={filterLoading}
                className={`w-full md:w-auto px-3 py-2 sm:px-4 rounded-lg border font-semibold flex items-center gap-2 transition-colors text-xs sm:text-sm ${statutFilter === 'all' ? 'bg-[#BCADFC] border-[#EAE3FF]' : 'bg-gray-100 border-gray-200'} ${filterLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Tous les statuts
                {/* <span className={`px-2 py-1 rounded-full text-xs ${statutFilter === 'all' ? 'bg-[#D3C8FE]' : 'bg-gray-200'}`}>{mappedExamens.length}/10</span> */}
              </button>
              <button
                onClick={() => setStatutFilter('confirmed')}
                disabled={filterLoading}
                className={`w-full md:w-auto px-3 py-2 sm:px-4 rounded-lg border font-semibold flex items-center gap-2 transition-colors text-xs sm:text-sm ${statutFilter === 'confirmed' ? 'bg-[#BCADFC] border-[#EAE3FF]' : 'bg-gray-100 border-gray-200'} ${filterLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Confirmé
                {/* <span className={`px-2 py-1 rounded-full text-xs ${statutFilter === 'confirmed' ? 'bg-[#D3C8FE]' : 'bg-gray-200'}`}>{mappedExamens.filter(e => e.statut === 'confirmed').length}/10</span> */}
              </button>
              <button
                onClick={() => setStatutFilter('pending')}
                disabled={filterLoading}
                className={`w-full md:w-auto px-3 py-2 sm:px-4 rounded-lg border font-semibold flex items-center gap-2 transition-colors text-xs sm:text-sm ${statutFilter === 'pending' ? 'bg-[#BCADFC] border-[#EAE3FF]' : 'bg-gray-100 border-gray-200'} ${filterLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                En attente
                {/* <span className={`px-2 py-1 rounded-full text-xs ${statutFilter === 'pending' ? 'bg-[#D3C8FE]' : 'bg-gray-200'}`}>{mappedExamens.filter(e => e.statut === 'pending').length}/10</span> */}
              </button>
              <button
                onClick={() => setStatutFilter('refused')}
                disabled={filterLoading}
                className={`w-full md:w-auto px-3 py-2 sm:px-4 rounded-lg border font-semibold flex items-center gap-2 transition-colors text-xs sm:text-sm ${statutFilter === 'refused' ? 'bg-[#BCADFC] border-[#EAE3FF]' : 'bg-gray-100 border-gray-200'} ${filterLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Refusé
                {/* <span className={`px-2 py-1 rounded-full text-xs ${statutFilter === 'refused' ? 'bg-[#D3C8FE]' : 'bg-gray-200'}`}>{mappedExamens.filter(e => e.statut === 'refused').length}/10</span> */}
              </button>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-end w-full md:w-auto">
              {filterLoading && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#BCADFC]"></div>
              )}
              <div className="text-sm sm:text-md text-gray-600 font-medium">
              Résultat Total : {examens.total}
              </div>
            </div>
          </div>
          {/* Tableau */}
          <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">Moniteur</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">Apprenant</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">Statut</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center">
                        <Loader />
                      </td>
                    </tr>
                  ) : mappedExamens.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500 text-lg">
                        Aucun examen {statutFilter !== 'all' ? `avec le statut "${getStatutText(statutFilter)}"` : ''} trouvé.
                      </td>
                    </tr>
                  ) : (
                    mappedExamens.map((examen: ExamenType) => (
                      <tr key={examen.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">{formatDateTime(examen?.datetime, null)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {examen.moniteur.photo ? (
                              <img
                                src={`${imageUrl}${examen.moniteur.photo}`}
                                alt={`${examen.moniteur.firstname} ${examen.moniteur.lastname}`}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-xl font-semibold text-white">
                                {`${examen.moniteur.lastname?.charAt(0) ?? ''}${examen.moniteur.firstname?.charAt(0) ?? ''}`}
                              </div>
                            )}
                            <div>
                              <div className="font-semibold">{examen.moniteur.firstname} {examen.moniteur.lastname}</div>
                              <div className="text-xs text-gray-500">{examen.moniteur.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {examen.apprenant.photo ? (
                              <img
                                src={`${imageUrl}${examen.apprenant.photo}`}
                                alt={`${examen.apprenant.firstname} ${examen.apprenant.lastname}`}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-xl font-semibold text-white">
                                {`${examen.apprenant.lastname?.charAt(0) ?? ''}${examen.apprenant.firstname?.charAt(0) ?? ''}`}
                              </div>
                            )}
                            <div>
                              <div className="font-semibold">{examen.apprenant.firstname} {examen.apprenant.lastname}</div>
                              <div className="text-xs text-gray-500">{examen.apprenant.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{getStatutLabel(examen.statut)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="grid grid-cols-3">
                            {examen.statut !== 'refused' && user.is_active !== 0 && (
                              <button
                                className="text-yellow-500 hover:text-yellow-700 font-medium"
                                title="Modifier"
                                onClick={() => setEditingExamen(examen)}
                              >
                                <PencilLine className='w-5 h-5' />
                              </button>
                            )}
                            <button
                              className="text-blue-500 hover:text-blue-700 font-medium"
                              title="Voir les détails"
                              onClick={() => setViewingExamen(examen)}
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
          </div>

          {/* Pagination */}
          {examens && mappedExamens.length > 0 && (
            <div className="bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="hidden text-sm text-gray-700 md:block">
                    Page {currentPage} sur {totalPages}
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor="perPage" className="text-sm text-gray-600">Résultats par page:</label>
                    <select
                      id="perPage"
                      value={perPage}
                      onChange={(e) => handlePerPageChange(Number(e.target.value))}
                      className="rounded-md border-gray-300 text-sm focus:border-[#BCADFC] focus:ring-[#BCADFC]"
                    >
                      {PER_PAGE_OPTIONS.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {'<'}
                  </button>
                  {(() => {
                    const pages: (number | string)[] = [];
                    if (totalPages <= 10) {
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
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {'>'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}



      {viewingExamen && (
        <DetailExamen
          examen={viewingExamen}
          onClose={() => setViewingExamen(null)}
        />
      )}
      {editingExamen && (
        <MonitorEditExamenModal
          examen={editingExamen}
          onClose={() => setEditingExamen(null)}
          currentPage={currentPage}
          perPage={perPage}
          onExamenUpdated={handleExamenUpdated}
        />
      )}
    </div>
  );
};

export default MonitorExamen;
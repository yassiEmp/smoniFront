import React, { useEffect, useState } from 'react';
import Loader from '@/components/common/Loader';
import { PencilLine, Eye, Trash2 } from 'lucide-react';
import StatutExamen from '@/components/admin/StatutExamen';
import DetailExamen from '@/components/admin/DetailExamen';
import AddExamenModal from '@/components/admin/AddExamenModal';
import DeleteConfirmationModal from '@/components/common/DeleteConfirmationModal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/configureStore';
import { getExamens, deleteExamen } from '@/api/admin/examen';
import { imageUrl } from '@/api';
// import { getMonitors } from '@/api/admin/monitor';
// import { fetchLearners } from '@/api/admin/ListLearners';
import { format } from 'date-fns';


export interface User {
  id: number;
  firstname: string;
  lastname: string;
  photo: string;
  email: string;
  phone?: string;  
  genre?: string;
}

// Type examen
export interface ExamenType {
  id: number;
  date: string;
  datetime: string | null; // <-- ajout pour corriger l'erreur
  moniteur: User;
  apprenant: User;
  statut: 'refused' | 'confirmed' | 'pending';
}

const PER_PAGE_OPTIONS = [10, 20, 30, 40];

// Fonction utilitaire pour afficher date + heure
function formatDateTime(datetime: string | null) {
  if (datetime) {
    const d = new Date(datetime.replace(' ', 'T'));
    if (!isNaN(d.getTime())) {
      return format(d, 'yyyy-MM-dd HH:mm:ss');
    }
    return datetime;
  }
  return '';
}

const Examen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.authReducer);
  const { examens } = useSelector((state: RootState) => state.adminReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [statutFilter, setStatutFilter] = useState<'all' | 'refused' | 'confirmed' | 'pending'>('all');
  const [editingExamen, setEditingExamen] = useState<ExamenType | null>(null);
  const [viewingExamen, setViewingExamen] = useState<ExamenType | null>(null);
  // const [moniteurs, setMoniteurs] = useState<any[]>([]);
  // const [apprenants, setApprenants] = useState<any[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [examenToDelete, setExamenToDelete] = useState<ExamenType | null>(null);

  useEffect(() => {
    if (statutFilter === 'all' && currentPage === 1) {
      setIsLoading(true);
    } else {
      setFilterLoading(true);
    }
    
    getExamens(token, dispatch, currentPage, perPage, statutFilter)
      .finally(() => {
        setIsLoading(false);
        setFilterLoading(false);
      });
  }, [token, dispatch, currentPage, perPage, statutFilter]);

  // useEffect(() => {
  //   if (isAddModalOpen) {
  //     getMonitors(token, dispatch).then(data => setMoniteurs(data.data?.data || []));
  //     fetchLearners(token, 1, 100).then(data => setApprenants(data.data.data || []));
  //   }
  // }, [isAddModalOpen, token, dispatch]);

  // Quand on change de filtre, on revient à la page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [statutFilter]);

  const mappedExamens: ExamenType[] = (examens.data || []).map((examen: any) => ({
    id: examen.id,
    date: examen.date,
    datetime: examen.datetime, // <-- ajout
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

  // Pagination
  const totalPages = Math.ceil((examens.total || 0) / perPage);
  const paginatedExamens = mappedExamens;

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  // Suppression d'un examen avec confirmation
  const handleDeleteClick = (examen: ExamenType) => {
    setExamenToDelete(examen);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!examenToDelete) return;
    setDeletingId(examenToDelete.id);
    try {
      await deleteExamen(token, dispatch, examenToDelete.id);
      
      // Récupérer les données mises à jour et ajuster la pagination si nécessaire
      const updatedData = await getExamens(token, dispatch, currentPage, perPage, statutFilter);
      await checkAndAdjustPagination(updatedData);
      
      setDeleteModalOpen(false);
      setExamenToDelete(null);
    } catch (e) {
      console.error("Erreur lors de la suppression de l'examen :", e);
      console.error(e);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setExamenToDelete(null);
  };

  // Callback pour recharger les données après ajout d'un examen
  const handleExamenAdded = () => {
    // Recharger les données avec le filtre actuel
    getExamens(token, dispatch, currentPage, perPage, statutFilter);
  };

  // Callback pour recharger les données après modification d'un examen
  const handleExamenUpdated = () => {
    // Recharger les données avec le filtre actuel
    getExamens(token, dispatch, currentPage, perPage, statutFilter);
  };

  // Fonction utilitaire pour vérifier et ajuster la pagination après une action
  const checkAndAdjustPagination = async (updatedData: any) => {
    if (updatedData && updatedData.data) {
      const totalPages = Math.ceil(updatedData.data.total / perPage);
      if (currentPage > totalPages && totalPages > 0) {
        // Si la page actuelle n'existe plus, aller à la dernière page
        setCurrentPage(totalPages);
        // Maintenir le filtre actuel lors de l'ajustement de pagination
        await getExamens(token, dispatch, totalPages, perPage, statutFilter);
      }
    }
  };


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

  return (
    <div className="mx-auto w-full px-6 py-7">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Liste des examens</h1>
          <p className="mt-2 text-sm text-gray-600">Retrouvez ici tous les examens programmés</p>
        </div>
        <button
          className="bg-[#6C61F6] rounded-md px-6 py-2 text-white transition hover:brightness-110 w-auto mt-5"
          onClick={() => setIsAddModalOpen(true)}
        >
          Ajouter un examen
        </button>
      </div>
      {/* Filtres */}
      <div className="bg-white rounded-t-lg p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col gap-2 w-full md:flex-row md:gap-2 md:w-auto">
          <button
            onClick={() => setStatutFilter('all')}
            disabled={filterLoading}
            className={`px-4 py-2 rounded-lg border font-semibold flex items-center gap-2 transition-colors ${statutFilter === 'all' ? 'bg-[#BCADFC] border-[#EAE3FF]' : 'bg-gray-100 border-gray-200'} ${filterLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Tous les statuts
          </button>
          <button
            onClick={() => setStatutFilter('confirmed')}
            disabled={filterLoading}
            className={`px-4 py-2 rounded-lg border font-semibold flex items-center gap-2 transition-colors ${statutFilter === 'confirmed' ? 'bg-[#BCADFC] border-[#EAE3FF]' : 'bg-gray-100 border-gray-200'} ${filterLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Confirmé
          </button>
          <button
            onClick={() => setStatutFilter('pending')}
            disabled={filterLoading}
            className={`px-4 py-2 rounded-lg border font-semibold flex items-center gap-2 transition-colors ${statutFilter === 'pending' ? 'bg-[#BCADFC] border-[#EAE3FF]' : 'bg-gray-100 border-gray-200'} ${filterLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            En attente
          </button>
          <button
            onClick={() => setStatutFilter('refused')}
            disabled={filterLoading}
            className={`px-4 py-2 rounded-lg border font-semibold flex items-center gap-2 transition-colors ${statutFilter === 'refused' ? 'bg-[#BCADFC] border-[#EAE3FF]' : 'bg-gray-100 border-gray-200'} ${filterLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Refusé
          </button>
        </div>
        <div className="flex items-center gap-3">
          {filterLoading && (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#BCADFC]"></div>
          )}
        <div className="text-md text-gray-600 font-medium">
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
              ) : paginatedExamens.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500 text-lg">
                    Aucun examen {statutFilter !== 'all' ? `avec le statut "${getStatutText(statutFilter)}"` : ''} trouvé.
                  </td>
                </tr>
              ) : (
                paginatedExamens.map((examen: ExamenType) => (
                  <tr key={examen.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">{formatDateTime(examen?.datetime)}</td>
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
                      <div className="flex items-center gap-2">
                        {examen.statut === 'refused' && (
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
                        <button
                          className={`text-red-600 hover:text-red-800 disabled:opacity-50 flex items-center justify-center`}
                          title="Supprimer"
                          onClick={() => handleDeleteClick(examen)}
                          disabled={deletingId === examen.id}
                        >
                          <Trash2 className="w-5 h-5" />
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
        {paginatedExamens.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4">
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

      <AddExamenModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        // moniteurs={moniteurs.map(m => ({ id: m.id, name: m.firstname + ' ' + m.lastname }))}
        // apprenants={apprenants.map(a => ({ id: a.id, name: a.firstname + ' ' + a.lastname }))}
        token={token}
        dispatch={dispatch}
        statutFilter={statutFilter}
        onExamenAdded={handleExamenAdded}
      />


      {editingExamen && (
        <StatutExamen
          examen={editingExamen}
          onClose={() => setEditingExamen(null)}
          onExamenUpdated={handleExamenUpdated}
        />
      )}

      {viewingExamen && (
        <DetailExamen
          examen={viewingExamen}
          onClose={() => setViewingExamen(null)}
        />
      )}

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirmer la suppression"
        message={`Voulez-vous vraiment supprimer l'examen de ${examenToDelete?.apprenant.firstname || ''} ${examenToDelete?.apprenant.lastname || ''} ?`}
      />
    </div>
  );
};

export default Examen;
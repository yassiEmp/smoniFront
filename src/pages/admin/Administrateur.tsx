import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@/components/common/Loader';
import { getAdmins, toggleAdminStatus, deleteAdmin } from '@/api/admin/admin';
import type { RootState } from '@/store/configureStore';
import type { AdminType, AdminListPagination } from '@/types/admin/initialState';
import AdminAddModal from '@/components/admin/AdminAddModal';
import DeleteConfirmationModal from '@/components/common/DeleteConfirmationModal';
import { LockKeyhole, LockKeyholeOpen, Trash2 } from 'lucide-react';
import { imageUrl } from '@/api';

const PER_PAGE_OPTIONS = [10, 20, 30, 40];

const Administrateur = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.authReducer);
  const adminsPagination = useSelector((state: RootState) => state.adminReducer.admins) as AdminListPagination | undefined;
  const [isLoading, setIsLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [statusLoading, setStatusLoading] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<AdminType | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'block'>('all');

  useEffect(() => {
    const fetchAdmins = async () => {
      if (statusFilter === 'all' && currentPage === 1) {
        setIsLoading(true);
      } else {
        setFilterLoading(true);
      }
      
      try {
        await getAdmins(token, dispatch, currentPage, perPage, statusFilter); 
      } catch (error) {
        console.error('Erreur lors du chargement des administrateurs:', error);
      } finally {
        setIsLoading(false);
        setFilterLoading(false);
      }
    };
    fetchAdmins();
  }, [token, currentPage, perPage, statusFilter, dispatch]);

  // Quand on change de filtre, on revient à la page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleToggleStatus = async (admin: AdminType) => {
    setStatusLoading(admin.id);
    await toggleAdminStatus(token, admin.id, dispatch);
    
    // Récupérer les données mises à jour et ajuster la pagination si nécessaire
    const updatedData = await getAdmins(token, dispatch, currentPage, perPage, statusFilter);
    await checkAndAdjustPagination(updatedData);
    
    setStatusLoading(null);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteClick = (admin: AdminType) => {
    setAdminToDelete(admin);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!adminToDelete) return;
    setDeleteLoading(adminToDelete.id);
    try {
      await deleteAdmin(adminToDelete.id, token, dispatch);
      
      // Récupérer les données mises à jour et ajuster la pagination si nécessaire
      const updatedData = await getAdmins(token, dispatch, currentPage, perPage, statusFilter);
      await checkAndAdjustPagination(updatedData);
      
      setDeleteModalOpen(false);
      setAdminToDelete(null);
    } catch (e) {
      console.error("Erreur lors de la suppression de l'administrateur :", e);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setAdminToDelete(null);
  };

  // Fonction utilitaire pour vérifier et ajuster la pagination après une action
  const checkAndAdjustPagination = async (updatedData: any) => {
    if (updatedData && updatedData.data) {
      const totalPages = Math.ceil(updatedData.data.total / perPage);
      if (currentPage > totalPages && totalPages > 0) {
        // Si la page actuelle n'existe plus, aller à la dernière page
        setCurrentPage(totalPages);
        await getAdmins(token, dispatch, totalPages, perPage, statusFilter);
      }
    }
  };

  const getStatusLabel = (is_active: number) => {
    return (
      <span
        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
          is_active
            ? 'border border-green-300 bg-green-100 text-green-700'
            : 'border border-red-300 bg-red-100 text-red-700'
        }`}
      >
        {is_active ? 'Actif' : 'Bloqué'}
      </span>
    );
  };

  // Utiliser directement les données de l'API (filtrage côté serveur)
  const admins = adminsPagination?.data || [];

  return (
    <div className="mx-auto w-full px-6 py-7">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Liste des administrateurs</h1>
          <p className="mt-2 text-sm text-gray-600">Retrouvez ici tous les administrateurs inscrits sur la plateforme</p>
        </div>
        <button
          className="bg-[#6C61F6] rounded-md px-6 py-2 text-white transition hover:brightness-110 w-auto mt-5"
          onClick={handleOpenModal}
        >
          Ajouter un administrateur
        </button>
      </div>
      {/* Filtres */}
      <div className="bg-white rounded-t-lg p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Statut */}
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              disabled={filterLoading}
              className={`px-4 py-2 rounded-lg border font-semibold flex items-center gap-2 transition-colors ${statusFilter === 'all' ? 'bg-[#BCADFC] border-[#EAE3FF]' : 'bg-gray-100 border-gray-200'} ${filterLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Tous les statuts
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              disabled={filterLoading}
              className={`px-4 py-2 rounded-lg border font-semibold flex items-center gap-2 transition-colors ${statusFilter === 'active' ? 'bg-[#BCADFC] border-[#EAE3FF]' : 'bg-gray-100 border-gray-200'} ${filterLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Actif
            </button>
            <button
              onClick={() => setStatusFilter('block')}
              disabled={filterLoading}
              className={`px-4 py-2 rounded-lg border font-semibold flex items-center gap-2 transition-colors ${statusFilter === 'block' ? 'bg-[#BCADFC] border-[#EAE3FF]' : 'bg-gray-100 border-gray-200'} ${filterLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Bloqué
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {filterLoading && (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#BCADFC]"></div>
          )}
          <div className="text-md text-gray-600 font-medium">
            Résultat Total : {adminsPagination?.total || 0}
          </div>
        </div>
      </div>
      {/* Tableau harmonisé */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">Photo</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">Genre</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">Téléphone</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center">
                    <Loader />
                  </td>
                </tr>
              ) : admins.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500 text-lg">
                    Aucun administrateur {statusFilter !== 'all' ? `avec le statut "${statusFilter === 'active' ? 'Actif' : 'Bloqué'}"` : ''} trouvé.
                  </td>
                </tr>
              ) : (
                admins.map((admin: AdminType) => {
                  if (admin.email !== "admin@smoni.fr") {
                    return (
                      <tr key={admin.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {admin.photo ? (
                            <img
                              src={imageUrl + admin.photo}
                              alt={admin.firstname + ' ' + admin.lastname}
                              className="h-10 w-10 rounded-full object-cover border"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-lg">
                              {admin.firstname?.charAt(0) ?? ''}{admin.lastname?.charAt(0) ?? ''}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{admin.firstname} {admin.lastname}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{
                          admin.genre === null ? '-' : admin.genre === 'homme' ? 'Homme' : admin.genre === 'femme' ? 'Femme' : 'Autre'
                        }</td>
                        <td className="px-6 py-4 whitespace-nowrap">{admin.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{admin.phone || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{getStatusLabel(admin.is_active)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              className={`flex items-center justify-center gap-1  text-xs font-semibold transition-colors ${admin.is_active ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100" : "border-green-200 bg-green-50 text-green-600 hover:bg-green-100"}`}
                              disabled={statusLoading === admin.id}
                              onClick={() => handleToggleStatus(admin)}
                              title={admin.is_active ? "Bloquer" : "Débloquer"}
                            >
                              {statusLoading === admin.id ? (
                                "..."
                              ) : admin.is_active ? (
                                <>
                                  <LockKeyhole className="w-5 h-5" />
                                </>
                              ) : (
                                <>
                                  <LockKeyholeOpen className="w-5 h-5" />
                                </>
                              )}
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800 disabled:opacity-50 flex items-center justify-center"
                              title="Supprimer"
                              disabled={deleteLoading === admin.id}
                              onClick={() => handleDeleteClick(admin)}
                            >
                              <Trash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  }
                })
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {adminsPagination && adminsPagination.total > 0 && (
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="hidden text-sm text-gray-700 md:block">
                  Page {adminsPagination?.current_page ?? 1} sur {adminsPagination?.last_page ?? 1}
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
                  onClick={() => handlePageChange((adminsPagination?.current_page ?? 1) - 1)}
                  disabled={(adminsPagination?.current_page ?? 1) === 1}
                  className={`p-2 rounded-md ${(adminsPagination?.current_page ?? 1) === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {'<'}
                </button>
                {(() => {
                  const totalPages = adminsPagination?.last_page ?? 1;
                  const currentPage = adminsPagination?.current_page ?? 1;
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
                      onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                      disabled={page === '...' || page === currentPage}
                      className={`px-3 py-1 rounded-md text-sm ${
                        page === '...'
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
                  onClick={() => handlePageChange((adminsPagination?.current_page ?? 1) + 1)}
                  disabled={(adminsPagination?.current_page ?? 1) === (adminsPagination?.last_page ?? 1)}
                  className={`p-2 rounded-md ${(adminsPagination?.current_page ?? 1) === (adminsPagination?.last_page ?? 1) ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {'>'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AdminAddModal
        open={isModalOpen}
        onClose={handleCloseModal}
      />

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirmer la suppression"
        message={`Voulez-vous vraiment supprimer l'administrateur ${adminToDelete?.firstname || ''} ${adminToDelete?.lastname || ''} ?`}
      />
    </div>
  );
};

export default Administrateur;
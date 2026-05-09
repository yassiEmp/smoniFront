import { ApprenantMonitorType } from '@/types/monitor/settings/configuration';
import VueNouvelUtilisateur from '@components/moniteurs/apprenant/VueNouvelUtilisateur';
import ProfilApprenant from '@components/moniteurs/ProfilApprenant';
import ProposeCourseModal from '@components/moniteurs/ProposeCourseModal';
import { Eye, ChevronLeft, ChevronRight, Plus, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { getApprenants } from '@/api/monitor/apprenants';
import Loader from '@/components/common/Loader';
import { imageUrl } from '@/api';
import { resetLearnerTest } from '@/api/monitor/resetLearnerTest';
import { checkFirstAppointment } from '@/api/monitor/checkFirstAppointment';
import { toast } from 'react-hot-toast';

const PER_PAGE_OPTIONS = [10, 20, 30, 40];

const Apprenants = () => {
  const [selectedApprenant, setSelectedApprenant] = useState<ApprenantMonitorType | null>(null);
  const [selectedStudentForCourse, setSelectedStudentForCourse] = useState<ApprenantMonitorType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showProposeCourseModal, setShowProposeCourseModal] = useState(false);
  const [paginationMeta, setPaginationMeta] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10
  });
  const [firstAppointmentLearners, setFirstAppointmentLearners] = useState<Set<number>>(new Set());
  const [loadingReset, setLoadingReset] = useState<number | null>(null);

  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.authReducer);
  const apprenants = useSelector((state: RootState) => state.monitorReducer.apprenants);

  useEffect(() => {
    const fetchApprenants = async () => {
      setIsLoading(true);
      try {
        const response = await getApprenants(user?.id, token, dispatch, currentPage, perPage);
        setPaginationMeta(response.meta);
      } catch (error) {
        console.error('Erreur lors du chargement des apprenants:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApprenants();
  }, [user?.id, token, dispatch, currentPage, perPage]);

  // Vérifier quels apprenants sont à leur premier rendez-vous
  useEffect(() => {
    const checkFirstAppointments = async () => {
      if (!apprenants || apprenants.length === 0 || !token) return;

      const firstAppointmentSet = new Set<number>();
      
      for (const apprenant of apprenants) {
        try {
          const result = await checkFirstAppointment(token, apprenant.learner.id);
          if (result.data.total_appointments === 1) {
            firstAppointmentSet.add(apprenant.learner.id);
          }
        } catch (error) {
          console.error(`Erreur lors de la vérification pour l'apprenant ${apprenant.learner.id}:`, error);
        }
      }
      
      setFirstAppointmentLearners(firstAppointmentSet);
    };

    checkFirstAppointments();
  }, [apprenants, token]);

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); 
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleResetTest = async (learnerId: number) => {
    setLoadingReset(learnerId);
    try {
      await resetLearnerTest(token, learnerId);
      toast.success('Test réinitialisé avec succès !');
      // Retirer l'apprenant de la liste des premiers rendez-vous
      setFirstAppointmentLearners(prev => {
        const newSet = new Set(prev);
        newSet.delete(learnerId);
        return newSet;
      });
    } catch (error: any) {
      console.error('Erreur lors du reset du test:', error);
      toast.error(error.message || 'Erreur lors du reset du test');
    } finally {
      setLoadingReset(null);
    }
  };

  return (
    <div className="">
      <div className="w-full p-7 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Mes apprenants</h1>
          <p className="mt-2 text-sm text-gray-600">
            Suivez ici l'évolution de tous vos élèves
          </p>
        </div>

        {isLoading ? (
          <Loader />
        ) : !apprenants || apprenants.length === 0 ? (
          <VueNouvelUtilisateur contenue="Aucun apprenant pour l'instant. Créez votre planning de disponibilité pour commencer votre aventure de moniteur indépendant avec SMONI." />
        ) : (
          <div className="bg-white rounded-lg shadow">
            {/* En-tête avec le nombre total */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-end">
                <div className="text-md text-gray-600 font-medium">
                  Résultat Total : {paginationMeta.total}
                </div>
              </div>
            </div>

            {/* Tableau avec données */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">
                      Apprenant
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">
                      Heures estimées
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">
                      Heures réalisées
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-sm font-medium text-gray-700 tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {apprenants.map((appt) => (
                    <tr key={appt.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => setSelectedApprenant(appt)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            {appt.learner.photo ? (
                              <img
                                src={`${imageUrl}${appt.learner.photo}`}
                                alt={`${appt.learner.firstname} ${appt.learner.lastname}`}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-lg font-semibold text-white">
                                {`${appt.learner.lastname?.charAt(0) ?? ''}${appt.learner.firstname?.charAt(0) ?? ''}`}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {`${appt.learner.firstname} ${appt.learner.lastname}`}
                            </div>
                            <div className="text-sm text-gray-500">
                              {appt.learner.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appt.learner.phone ? appt.learner.phone : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appt.hour_estimate ? appt.hour_estimate + "h" : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appt.total_duration ? appt.total_duration + "h" : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 font-medium"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedApprenant(appt);
                            }}
                          >
                            <Eye className='w-5 h-5' />
                          </button>
                          <button
                            className="text-green-600 hover:text-green-900 font-medium"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStudentForCourse(appt);
                              setShowProposeCourseModal(true);
                            }}
                            title="Proposer un cours"
                          >
                            <Plus className='w-5 h-5' />
                          </button>
                          {/* Bouton Reload - affiché uniquement pour les apprenants à leur premier rendez-vous */}
                          {firstAppointmentLearners.has(appt.learner.id) && (
                            <button
                              className="text-blue-600 hover:text-blue-900 font-medium disabled:opacity-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleResetTest(appt.learner.id);
                              }}
                              disabled={loadingReset === appt.learner.id}
                              title="Reset test (premier rendez-vous)"
                            >
                              {loadingReset === appt.learner.id ? (
                                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <RotateCcw className='w-5 h-5' />
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {apprenants && apprenants.length > 0 && (
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
                      onClick={() => handlePageChange(paginationMeta.current_page - 1)}
                      disabled={paginationMeta.current_page === 1}
                      className={`p-2 rounded-md ${
                        paginationMeta.current_page === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    {(() => {
                      const totalPages = paginationMeta.last_page;
                      const currentPage = paginationMeta.current_page;
                      const pages: (number | string)[] = [];

                      if (totalPages <= 5) {
                        // Si moins de 5 pages, afficher toutes les pages
                        for (let i = 1; i <= totalPages; i++) {
                          pages.push(i);
                        }
                      } else {
                        // Toujours afficher la première page
                        pages.push(1);

                        // Calculer les pages autour de la page courante
                        const startPage = Math.max(2, currentPage - 1);
                        const endPage = Math.min(totalPages - 1, currentPage + 1);

                        // Ajouter les points de suspension si nécessaire
                        if (startPage > 2) {
                          pages.push('...');
                        }

                        // Ajouter les pages autour de la page courante
                        for (let i = startPage; i <= endPage; i++) {
                          pages.push(i);
                        }

                        // Ajouter les points de suspension si nécessaire
                        if (endPage < totalPages - 1) {
                          pages.push('...');
                        }

                        // Toujours afficher la dernière page
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
                      onClick={() => handlePageChange(paginationMeta.current_page + 1)}
                      disabled={paginationMeta.current_page === paginationMeta.last_page}
                      className={`p-2 rounded-md ${
                        paginationMeta.current_page === paginationMeta.last_page
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {selectedApprenant && (
          <ProfilApprenant
            nom={`${selectedApprenant.learner.firstname} ${selectedApprenant.learner.lastname}`}
            profil={selectedApprenant.learner?.photo}
            onClose={() => setSelectedApprenant(null)}
            learner={selectedApprenant.learner}
            total_duration={selectedApprenant.total_duration}
            status={selectedApprenant.status}
          />
        )}

        {showProposeCourseModal && (
          <ProposeCourseModal
            isOpen={showProposeCourseModal}
            onClose={() => {
              setShowProposeCourseModal(false);
              setSelectedStudentForCourse(null);
            }}
            selectedStudent={selectedStudentForCourse}
          />
        )}
      </div>
    </div>
  );
};

export default Apprenants;
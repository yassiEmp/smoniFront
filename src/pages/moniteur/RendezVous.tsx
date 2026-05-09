import { ApointmentType, } from '@/types/monitor/settings/configuration';
import VueNouvelUtilisateur from '@components/moniteurs/apprenant/VueNouvelUtilisateur';
import { getApointments } from '@/api/monitor/rendezvous';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import Loader from '@/components/common/Loader';
import { Eye, MessageSquareMore, PencilLine, ChevronLeft, ChevronRight, } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import DetailApointment from '@/components/moniteurs/apprenant/DetailApointment';
import EditApointment from '@/components/moniteurs/apprenant/EditApointment';
import CommentairesApprenantModal from '@/components/moniteurs/rendezvous/CommentApprenantModal';
import { imageUrl } from '@/api';

type FilterType = 'all' | 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'notation' | 'pending';

const PER_PAGE_OPTIONS = [10, 20, 30, 40];

const RendezVous = () => {
  const [selectedApointment, setSelectedApointment] = useState<ApointmentType | null>(null);
  const [editingApointment, setEditingApointment] = useState<ApointmentType | null>(null);
  const [selectedCommentApointment, setSelectedCommentApointment] = useState<ApointmentType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [paginationMeta, setPaginationMeta] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10
  });

  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.authReducer);
  const apointments = useSelector((state: RootState) => state.monitorReducer.apointments);

  // const isAppointmentPast = (appointmentDate: string) => {
  //   const today = new Date();
  //   const appointment = new Date(appointmentDate);
  //   return today > appointment;
  // };

  useEffect(() => {
    const fetchApointment = async () => {
      if (filter === 'all' && currentPage === 1) {
      setIsLoading(true);
      } else {
        setFilterLoading(true);
      }
      
      try {
        const response = await getApointments(token, dispatch, currentPage, perPage, filter);
        if (response && response.data) {
          setPaginationMeta({
            current_page: response.data.current_page,
            last_page: response.data.last_page,
            total: response.data.total,
            per_page: response.data.per_page
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement des rendez-vous:', error);
      } finally {
        setIsLoading(false);
        setFilterLoading(false);
      }
    };

    fetchApointment();
  }, [token, dispatch, currentPage, perPage, filter]);

  // Quand on change de filtre, on revient à la page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // const filteredAppointments = useMemo(() => {
  //   return apointments.filter((appt) => {
  //     if (filter === 'all') return true;
  //     return appt.status === filter;
  //   });
  // }, [filter, apointments]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
      case 'confirmed':
        return 'Confirmé';
      case 'scheduled':
        return 'En attente';
      case 'notation':
        return 'À noter';
      case 'pending':
        return 'En cours';
      default:
        return status;
    }
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };



  // Callback pour recharger les données après modification d'un rendez-vous
  const handleAppointmentUpdated = () => {
    // Recharger les données avec le filtre actuel
    getApointments(token, dispatch, currentPage, perPage, filter);
  };



  return (
    <div className="">
      <div className="w-full p-7 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Mes rendez-vous</h1>
          <p className="mt-2 text-sm text-gray-600">
            Suivez ici l'évolution de tous vos rendez-vous
          </p>
        </div>

        {isLoading ? (
          <Loader />
        ) : (paginationMeta.total === 0 && filter === 'all') ? (
          <VueNouvelUtilisateur contenue="Aucun rendez-vous pour l'instant. Cette liste sera automatiquement mise à jour lors de votre premier rendez-vous." />
        ) : (
          <div className="bg-white rounded-lg shadow">
            {/* Filtres */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg border font-semibold flex items-center gap-2 transition-colors ${filter === 'all'
                      ? 'bg-[#BCADFC] border-[#EAE3FF]'
                      : 'bg-gray-100 border-gray-200'
                      }`}
                  >
                    Tous les rendez-vous
                    {/* <span className={`px-2 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-[#D3C8FE]' : 'bg-gray-200'
                      }`}>
                      {filteredAppointments.length}
                    </span> */}
                  </button>

                  <button
                    onClick={() => setFilter('scheduled')}
                    className={`px-4 py-2 rounded-lg border font-semibold flex items-center gap-2 transition-colors ${filter === 'scheduled'
                      ? 'bg-[#BCADFC] border-[#EAE3FF]'
                      : 'bg-gray-100 border-gray-200'
                      }`}
                  >
                    En attente
                    {/* <span className={`px-2 py-1 rounded-full text-sm ${filter === 'scheduled' ? 'bg-[#D3C8FE]' : 'bg-gray-200'
                      }`}>
                      {filter === 'scheduled' ? filteredAppointments.length : apointments.filter(a => a.status === 'scheduled').length}
                    </span> */}
                  </button>

                  
                  <button
                    onClick={() => setFilter('confirmed')}
                    className={`px-4 py-2 rounded-lg border font-semibold flex items-center gap-2 transition-colors ${filter === 'confirmed'
                      ? 'bg-[#BCADFC] border-[#EAE3FF]'
                      : 'bg-gray-100 border-gray-200'
                      }`}
                  >
                    Cours à venir
                    {/* <span className={`px-2 py-1 rounded-full text-sm ${filter === 'confirmed' ? 'bg-[#D3C8FE]' : 'bg-gray-200'
                      }`}>
                      {filter === 'confirmed' ? filteredAppointments.length : apointments.filter(a => a.status === 'confirmed').length}
                    </span> */}
                  </button>

                  <button
                    onClick={() => setFilter('completed')}
                    className={`px-4 py-2 rounded-lg border font-semibold flex items-center gap-2 transition-colors ${filter === 'completed'
                      ? 'bg-[#BCADFC] border-[#EAE3FF]'
                      : 'bg-gray-100 border-gray-200'
                      }`}
                  >
                    Terminés
                    {/* <span className={`px-2 py-1 rounded-full text-sm ${filter === 'completed' ? 'bg-[#D3C8FE]' : 'bg-gray-200'
                      }`}>
                      {filter === 'completed' ? filteredAppointments.length : apointments.filter(a => a.status === 'completed').length}
                    </span> */}
                  </button>

                  <button
                    onClick={() => setFilter('cancelled')}
                    className={`px-4 py-2 rounded-lg border font-semibold flex items-center gap-2 transition-colors ${filter === 'cancelled'
                      ? 'bg-[#BCADFC] border-[#EAE3FF]'
                      : 'bg-gray-100 border-gray-200'
                      }`}
                  >
                    Annulés
                    {/* <span className={`px-2 py-1 rounded-full text-sm ${filter === 'cancelled' ? 'bg-[#D3C8FE]' : 'bg-gray-200'
                      }`}>
                      {filter === 'cancelled' ? filteredAppointments.length : apointments.filter(a => a.status === 'cancelled').length}
                    </span> */}
                  </button>
                  
                  <button
                    onClick={() => setFilter('notation')}
                    className={`px-4 py-2 rounded-lg border font-semibold flex items-center gap-2 transition-colors ${filter === 'notation'
                      ? 'bg-[#BCADFC] border-[#EAE3FF]'
                      : 'bg-gray-100 border-gray-200'
                      }`}
                  >
                    À noté
                    {/* <span className={`px-2 py-1 rounded-full text-sm ${filter === 'notation' ? 'bg-[#D3C8FE]' : 'bg-gray-200'
                      }`}>
                      {filter === 'notation' ? filteredAppointments.length : apointments.filter(a => a.status === 'notation').length}
                    </span> */}
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  {filterLoading && (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#BCADFC]"></div>
                  )}
                <div className="text-md text-gray-600 font-medium">
                  Résultat Total : {paginationMeta.total}
                  </div>
                </div>
              </div>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">
                      Apprenant
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">
                      Date & heure
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">
                      Presence moniteur
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">
                      Presence apprenant
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">
                      Statut
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {apointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center">
                        <p className="text-gray-500 text-lg">Aucun rendez-vous {filter !== 'all' ? `avec le statut "${getStatusLabel(filter)}"` : ''} pour le moment.</p>
                      </td>
                    </tr>
                  ) : (
                  apointments.map((appt) => (
                      <tr key={appt.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
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
                          {format(new Date(appt.date), 'dd/MM/yyyy', { locale: fr })}
                          <br />
                          <span className="text-gray-500">{`${appt.start_time} - ${appt.end_time}`}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${appt.presence_monitor ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                            {appt.presence_monitor ? 'Présent' : 'Absent'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${appt.presence_student ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                            {appt.presence_student ? 'Présent' : 'Absent'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${appt.status === 'completed' ? 'bg-green-100 text-green-800' :
                            appt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              appt.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                            }`}>
                            {getStatusLabel(appt.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 grid grid-cols-3 gap-1 whitespace-nowrap text-center">
                          
                          {appt.status !== 'cancelled' && appt.status !== 'completed' && user.is_active !== 0 && (
                            <button
                              className="py-4 text-yellow-500 hover:text-yellow-700 font-medium"
                              onClick={() => setEditingApointment(appt)}
                            >
                              <PencilLine className='w-5 h-5' />
                            </button>
                          )}

                          {(appt.status === 'notation' || appt.status === 'completed') && user.is_active !== 0 && (
                            <button
                              className="py-4 text-orange-600 hover:text-orange-900 font-medium"
                              onClick={() => setSelectedCommentApointment(appt)}
                            >
                              <MessageSquareMore className='w-5 h-5' />
                            </button>
                          )}

                          {appt.status === 'cancelled' && user.is_active !== 0 && (
                            <span
                              className="pl-2"
                            >
                            </span>
                          )}
                          <button
                            className="py-4 text-indigo-600 hover:text-indigo-900 font-medium"
                            onClick={() => setSelectedApointment(appt)}
                          >
                            <Eye className='w-5 h-5' />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
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
                      className={`p-2 rounded-md ${paginationMeta.current_page === 1
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
                      onClick={() => handlePageChange(paginationMeta.current_page + 1)}
                      disabled={paginationMeta.current_page === paginationMeta.last_page}
                      className={`p-2 rounded-md ${paginationMeta.current_page === paginationMeta.last_page
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
      </div>

      {selectedApointment && (
        <DetailApointment
          appointment={selectedApointment}
          onClose={() => setSelectedApointment(null)}
        />
      )}

      {editingApointment && (
        <EditApointment
          appointment={editingApointment}
          onClose={() => setEditingApointment(null)}
          currentPage={currentPage}
          perPage={perPage}
          onAppointmentUpdated={handleAppointmentUpdated}
        />
      )}

      {selectedCommentApointment && (
        <CommentairesApprenantModal
          learner={selectedCommentApointment.learner}
          learnerId={selectedCommentApointment.learner.id}
          token={token}
          onClose={() => setSelectedCommentApointment(null)}
        />
      )}
    </div>
  );
};

export default RendezVous;
import React, { useEffect, useMemo, useState } from "react";
import Loader from "@/components/common/Loader";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { getMonitorsApointements } from "@/api/admin/monitor";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { imageUrl } from "@/api";
import { useLocation, useNavigate } from "react-router";

const PER_PAGE_OPTIONS = [10, 20, 30, 40];
const FILTERS = [
  { key: 'all', label: 'Tous les rendez-vous' },
  { key: 'scheduled', label: 'En attente' },
  { key: 'confirmed', label: 'Confirmés' },
  { key: 'completed', label: 'Terminés' },
  { key: 'cancelled', label: 'Annulés' },
];
type FilterType = 'all' | 'scheduled' | 'confirmed' | 'completed' | 'cancelled';

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'completed': return 'Terminé';
    case 'cancelled': return 'Annulé';
    case 'confirmed': return 'Confirmé';
    case 'scheduled': return 'En attente';
    case 'notation': return 'À noter';
    case 'pending': return 'En cours';
    default: return status;
  }
};
const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    case 'confirmed': return 'bg-blue-100 text-blue-800';
    case 'scheduled': return 'bg-yellow-100 text-yellow-800';
    case 'notation': return 'bg-purple-100 text-purple-800';
    case 'pending': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const AppointmentDetailSheet = ({ appointment, open, onClose }: { appointment: any; open: boolean; onClose: () => void }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  if (!appointment) return null;
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={`${isMobile ? 'h-[80vh] rounded-t-xl' : 'sm:max-w-[450px]'} p-0 bg-white border-none`}
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="flex flex-row justify-between pb-2 pt-6 px-6">
            <SheetTitle className="text-xl font-semibold">Détails du rendez-vous</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center gap-4">                  
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">
                    {`${appointment.learner.firstname} ${appointment.learner.lastname}`}
                  </h3>
                  <p className="text-gray-500 flex items-center gap-2">
                    @{appointment.learner.email}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    {appointment.learner.phone}
                  </p>
                </div>
                {appointment.learner.photo ? (
                  <img
                    src={`${imageUrl}${appointment.learner.photo}`}
                    alt={`${appointment.learner.firstname} ${appointment.learner.lastname}`}
                    className="h-28 w-28 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-28 w-28 rounded-full bg-gray-500 flex items-center justify-center text-5xl font-semibold text-white">
                    {`${appointment.learner.lastname?.charAt(0) ?? ''}${appointment.learner.firstname?.charAt(0) ?? ''}`}
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Informations du rendez-vous</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">📅</span>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">
                        {format(new Date(appointment.date), 'EEEE d MMMM yyyy', { locale: fr })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">⏰</span>
                    <div>
                      <p className="text-sm text-gray-500">Heure</p>
                      <p className="font-medium">{`${appointment.start_time} - ${appointment.end_time}`}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Statut et présence</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Statut</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                      {getStatusLabel(appointment.status)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Présence moniteur</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${appointment.presence_monitor ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {appointment.presence_monitor ? 'Présent' : 'Absent'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Présence apprenant</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${appointment.presence_student ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {appointment.presence_student ? 'Présent' : 'Absent'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const MonitorApointementListe = () => {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [paginationMeta, setPaginationMeta] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10
  });
  const navigate = useNavigate();
  const location = useLocation();
  const monitorId = location.state?.monitorId;

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const data = await getMonitorsApointements(token, monitorId, currentPage, perPage);
        setAppointments(data.data);
        setPaginationMeta({
          current_page: data.current_page,
          last_page: data.last_page,
          total: data.total,
          per_page: data.per_page
        });
      } catch {
        setAppointments([]);
        setPaginationMeta({ current_page: 1, last_page: 1, total: 0, per_page: perPage });
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointments();
  }, [token, currentPage, perPage, monitorId]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      if (filter === 'all') return true;
      return appt.status === filter;
    });
  }, [filter, appointments]);

  const handleShow = (appt: any) => {
    setSelectedAppointment(appt);
    setSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setSheetOpen(false);
    setTimeout(() => setSelectedAppointment(null), 300);
  };

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
        <h1 className="text-3xl font-semibold text-gray-900">Liste des rendez-vous du moniteur</h1>
      </div>
      <p className="mt-2 text-sm text-gray-600">Consultez la liste et les détails des rendez-vous</p>
      {/* Filtres */}
      <div className="pt-6 pb-2 border-b border-gray-200">
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
                    ? filteredAppointments.length
                    : appointments.filter(a => f.key === 'all' ? true : a.status === f.key).length
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
        <div className="text-center text-gray-500 py-10">Aucun rendez-vous trouvé.</div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Apprenant</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date & heure</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Présence moniteur</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Présence apprenant</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Statut</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center">
                      <p className="text-gray-500 text-lg">Aucun rendez-vous {filter !== 'all' ? `avec le statut "${getStatusLabel(filter)}"` : ''} pour le moment.</p>
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appt) => (
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
                              @{appt.learner.email}
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
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${appt.presence_monitor ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{appt.presence_monitor ? 'Présent' : 'Absent'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${appt.presence_student ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{appt.presence_student ? 'Présent' : 'Absent'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appt.status)}`}>{getStatusLabel(appt.status)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button className="text-indigo-600 hover:text-indigo-900 font-medium" onClick={() => handleShow(appt)}>
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
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
      <AppointmentDetailSheet appointment={selectedAppointment} open={sheetOpen} onClose={handleCloseSheet} />
    </div>
  );
};

export const MonitorAppointmentsTab = ({ monitorId }: { monitorId: number }) => {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [paginationMeta, setPaginationMeta] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const data = await getMonitorsApointements(token, monitorId, currentPage, perPage);
        setAppointments(data.data);
        setPaginationMeta({
          current_page: data.current_page,
          last_page: data.last_page,
          total: data.total,
          per_page: data.per_page
        });
      } catch {
        setAppointments([]);
        setPaginationMeta({ current_page: 1, last_page: 1, total: 0, per_page: perPage });
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointments();
  }, [token, currentPage, perPage, monitorId]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      if (filter === 'all') return true;
      return appt.status === filter;
    });
  }, [filter, appointments]);

  const handleShow = (appt: any) => {
    setSelectedAppointment(appt);
    setSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setSheetOpen(false);
    setTimeout(() => setSelectedAppointment(null), 300);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full mx-auto">
      {/* Filtres */}
      <div className="pt-6 pb-2 border-b border-gray-200">
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
                    ? filteredAppointments.length
                    : appointments.filter(a => f.key === 'all' ? true : a.status === f.key).length
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
        <div className="text-center text-gray-500 py-10">Aucun rendez-vous trouvé.</div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Apprenant</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date & heure</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Présence moniteur</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Présence apprenant</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Statut</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center">
                      <p className="text-gray-500 text-lg">Aucun rendez-vous {filter !== 'all' ? `avec le statut "${getStatusLabel(filter)}"` : ''} pour le moment.</p>
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appt) => (
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
                              @{appt.learner.email}
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
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${appt.presence_monitor ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{appt.presence_monitor ? 'Présent' : 'Absent'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${appt.presence_student ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{appt.presence_student ? 'Présent' : 'Absent'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appt.status)}`}>{getStatusLabel(appt.status)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button className="text-indigo-600 hover:text-indigo-900 font-medium" onClick={() => handleShow(appt)}>
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
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
      <AppointmentDetailSheet appointment={selectedAppointment} open={sheetOpen} onClose={handleCloseSheet} />
    </div>
  );
};

export default MonitorApointementListe;

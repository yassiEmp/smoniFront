import { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, MapPin, Car } from 'lucide-react';
import { ApprenantMonitorType, ScheduleSlot } from '@/types/monitor/settings/configuration';
import { getUnbookedAvailabilities } from '@/api/monitor/planning';
import { proposeCourse } from '@/api/monitor/rendezvous';
import { imageUrl } from '@/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ProposeCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStudent: ApprenantMonitorType | null;
}

const ProposeCourseModal = ({ isOpen, onClose, selectedStudent }: ProposeCourseModalProps) => {
  const [selectedAvailability, setSelectedAvailability] = useState<ScheduleSlot | null>(null);
  const [availabilities, setAvailabilities] = useState<ScheduleSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.authReducer);

  useEffect(() => {
    if (isOpen && selectedStudent) {
      // Récupérer les disponibilités pour la semaine actuelle
      const today = new Date();
      const monday = new Date(today);
      monday.setDate(today.getDate() - today.getDay() + 1);
      
      // S'assurer que la date n'est pas antérieure à aujourd'hui
      const selectedDate = monday < today ? today : monday;
      const dateString = selectedDate.toISOString().split('T')[0];
      
      setSelectedDate(dateString);
      fetchAvailabilities(dateString);
    }
  }, [isOpen, selectedStudent, token]);


  const fetchAvailabilities = async (date: string) => {
    setIsLoading(true);
    try {
      const unbookedAvailabilities = await getUnbookedAvailabilities(token, date);
      setAvailabilities(unbookedAvailabilities.data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des disponibilités:', error);
      setAvailabilities([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    fetchAvailabilities(date);
  };

  const handleProposeCourse = async () => {
    if (selectedAvailability && selectedStudent) {
      setIsLoading(true);
      try {
        const success = await proposeCourse(
          token,
          selectedAvailability.id,
          selectedStudent.learner.id,
          dispatch
        );
        
        if (success) {
          onClose();
        }
      } catch (error) {
        console.error('Erreur lors de la proposition du cours:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'EEEE dd MMMM yyyy', { locale: fr });
  };

  if (!isOpen || !selectedStudent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl custom-scrollbar w-full p-6 relative animate-fade-in mx-5 overflow-auto">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="Fermer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Proposer un cours
          </h2>
          <p className="text-gray-600">
            Proposez un cours à {selectedStudent.learner.firstname} {selectedStudent.learner.lastname}
          </p>
        </div>

        {/* Informations de l'étudiant */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 flex-shrink-0">
              {selectedStudent.learner.photo ? (
                <img
                  src={`${imageUrl}${selectedStudent.learner.photo}`}
                  alt={`${selectedStudent.learner.firstname} ${selectedStudent.learner.lastname}`}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gray-500 flex items-center justify-center text-lg font-semibold text-white">
                  {`${selectedStudent.learner.lastname?.charAt(0) ?? ''}${selectedStudent.learner.firstname?.charAt(0) ?? ''}`}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {selectedStudent.learner.firstname} {selectedStudent.learner.lastname}
              </h3>
              <p className="text-sm text-gray-500">{selectedStudent.learner.email}</p>
            </div>
          </div>
        </div>

        {/* Sélection de la date */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Sélectionner une date
          </label>
          <input
            type="date"
            value={selectedDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BCADFC] focus:border-transparent"
          />
        </div>

        {/* Liste des disponibilités */}
        <div className="mb-10">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Clock className="w-4 h-4 inline mr-2" />
            Choisir une disponibilité
          </label>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#BCADFC] mx-auto"></div>
              <p className="mt-2 text-gray-500">Chargement des disponibilités...</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-64 custom-scrollbar pr-2 overflow-y-auto">
              {availabilities.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Aucune disponibilité trouvée pour cette date</p>
                </div>
              ) : (
                availabilities.map((availability) => (
                  <div
                    key={availability.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedAvailability?.id === availability.id
                        ? 'border-[#BCADFC] bg-[#BCADFC]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedAvailability(availability)}
                  >
                    <div className="md:flex flex-col items-center justify-between">
                      <div className="md:flex flex-col items-center md:space-x-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">
                            {formatTime(availability.start_time)} - {formatTime(availability.end_time)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {availability.meeting_point.label}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Car className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {availability.vehicle.brand} {availability.vehicle.model}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(availability.date)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 absolute bottom-2 right-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleProposeCourse}
            disabled={!selectedAvailability || isLoading}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedAvailability && !isLoading
                ? 'bg-[#BCADFC] text-white hover:bg-[#BCADFC]/90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Proposition en cours...' : 'Proposer le cours'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposeCourseModal;

import { useState } from 'react';
import { addMeetingPoint } from '@/api/monitor/parametre';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { MapPin, X } from 'lucide-react';
import { meetingPoints } from '@/types/data';

export interface MeetingPoint {
  id?: number;
  label: string;
  address: string;
  city: string;
  postal_code: string;
  latitude: number;
  longitude: number;
}

interface MeetingPointAddComponentProps {
  closeModal: () => void;
  onAddSuccess: () => void;
  existingPointsCount: number;
}

const MeetingPointAddComponent = ({ closeModal, onAddSuccess, existingPointsCount }: MeetingPointAddComponentProps) => {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPoints, setSelectedPoints] = useState<MeetingPoint[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const maxPoints = 3;
  const remainingSlots = maxPoints - existingPointsCount;

  const filteredPoints = meetingPoints.filter(point =>
    point.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    point.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    point.postal_code?.includes(searchTerm) === true
  );

  const handleSelectPoint = (point: MeetingPoint) => {
    if (selectedPoints.length < remainingSlots && !selectedPoints.some(p => p.id === point.id)) {
      setSelectedPoints([...selectedPoints, point]);
    }
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const handleRemovePoint = (id: number | undefined) => {
    if (id) {
      setSelectedPoints(selectedPoints.filter(point => point.id !== id));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      for (const point of selectedPoints) {
        console.log(point)
        await addMeetingPoint({
          label: point.label,
          address: point.address,
          city: point.city,
          postal_code: point.postal_code,
          latitude: point.latitude,
          longitude: point.longitude
        }, token);
      }
      onAddSuccess();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de l\'ajout des points de rendez-vous:', error);
    } finally {
      setLoading(false);
    }
  };

  if (remainingSlots <= 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Limite atteinte</h2>
            <p className="text-gray-600 mb-4">Vous avez déjà atteint la limite de 3 points de rendez-vous.</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-[#6c61f6] text-white rounded-md hover:bg-[#5a50e0]"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Ajouter des points de rendez-vous</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Vous pouvez ajouter jusqu'à {remainingSlots} point{remainingSlots > 1 ? 's' : ''} de rendez-vous.
          </p>
        </div>

        <div className="relative mb-4">
          <div className="flex items-center border rounded-lg p-2">
            <MapPin className="text-gray-400 mr-2" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="Rechercher une mairie..."
              className="w-full outline-none"
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredPoints.length > 0 ? (
                [...filteredPoints]
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((point) => (
                    <div
                      key={point.id}
                      onClick={() => handleSelectPoint(point)}
                      className="p-3 hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="font-medium">{point.label}</div>
                      <div className="text-sm text-gray-600">
                        {point.address}, {point.city}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="p-3 text-gray-500">Aucune mairie trouvée</div>
              )}
            </div>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">
            Points sélectionnés ({selectedPoints.length}/{remainingSlots}):
          </h3>
          <div className="space-y-2">
            {selectedPoints.map((point) => (
              <div
                key={point.id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
              >
                <div>
                  <div className="font-medium">{point.label}</div>
                  <div className="text-sm text-gray-600">
                    {point.address}, {point.city}
                  </div>
                </div>
                <button
                  onClick={() => handleRemovePoint(point.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-[#EEEEEE] rounded-md text-gray-600 hover:text-gray-800"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedPoints.length === 0 || loading}
            className={`px-4 py-2 rounded-md ${
              selectedPoints.length > 0 && !loading
                ? 'bg-[#6c61f6] text-white hover:bg-[#5a50e0]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingPointAddComponent; 
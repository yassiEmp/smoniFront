import { useState } from 'react';
import { editMeetingPoint } from '@/api/monitor/parametre';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { MapPin, X } from 'lucide-react';
import { meetingPoints } from '@/types/data';
import { MeetingPointType } from '@mytypes/monitor/settings/configuration';

interface MeetingPointEditComponentProps {
  closeModal: () => void;
  data: MeetingPointType;
  id: number | undefined;
  onEditSuccess: () => void;
}

const MeetingPointEditComponent = ({ closeModal, data, id, onEditSuccess }: MeetingPointEditComponentProps) => {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPoint, setSelectedPoint] = useState<MeetingPointType | null>(data);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredPoints = meetingPoints.filter(point =>
    point.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    point.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    point.postal_code?.includes(searchTerm) === true
  );

  const handleSelectPoint = (point: MeetingPointType) => {
    setSelectedPoint(point);
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const handleSubmit = async () => {
    if (!selectedPoint) return;

    if (!id) return;

    try {
      setLoading(true);
      await editMeetingPoint({
        label: selectedPoint.label,
        address: selectedPoint.address,
        city: selectedPoint.city,
        postal_code: selectedPoint.postal_code,
        latitude: selectedPoint.latitude,
        longitude: selectedPoint.longitude
      }, id, token);
      closeModal();
      onEditSuccess();
    } catch (err) {
      setError("Une erreur est survenue lors de la modification du point de rendez-vous");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Modifier le point de rendez-vous</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

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
                filteredPoints.map((point) => (
                  <div
                    key={point.id}
                    onClick={() => handleSelectPoint(point)}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="font-medium">{point.label}</div>
                    <div className="text-sm text-gray-600">
                      {point.address}, {point.postal_code} {point.city}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-gray-500">Aucune mairie trouvée</div>
              )}
            </div>
          )}
        </div>

        {selectedPoint && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Point sélectionné :</h3>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="font-medium">{selectedPoint.label}</div>
              <div className="text-sm text-gray-600">
                {selectedPoint.address}, {selectedPoint.postal_code} {selectedPoint.city}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            disabled={loading}
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedPoint || loading}
            className={`px-4 py-2 rounded-md ${
              selectedPoint && !loading
                ? 'bg-[#6c61f6] text-white hover:bg-[#5a50e0]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? "Modification..." : "Modifier"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingPointEditComponent; 
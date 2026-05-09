import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Plus, Pencil, Trash2, } from 'lucide-react';
import { MeetingPointType } from '@mytypes/monitor/settings/configuration';
import { getMeetingPoints } from '@/api/monitor/parametre';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import MeetingPointConfirmDelete from './MeetingPointConfirmDelete';
import MeetingPointEditComponent from './MeetingPointEditComponent';
import MeetingPointAddComponent from './MeetingPointAddComponent';
import Loader from '@/components/common/Loader';
import { toast } from "react-hot-toast";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Correction pour les icônes Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MeetingComponent = () => {
  const { token } = useSelector((state: RootState) => state.authReducer)
  const [meetingPoints, setMeetingPoints] = useState<MeetingPointType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [_, setSelectedPoint] = useState<MeetingPointType | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [pointToDelete, setPointToDelete] = useState<number | null>(null);
  const [pointToEdit, setPointToEdit] = useState<MeetingPointType | null>(null);
  const [mapKey, setMapKey] = useState(0); // Pour forcer le rechargement de la carte
  const dispatch = useDispatch();
  // Position par défaut centrée sur l'Île-de-France
  const defaultCenter = {
    lat: 48.8566,
    lng: 2.3522
  };

  const fetchMeetingPoints = async () => {
    try {
      setLoading(true);
      const data = await getMeetingPoints(token, dispatch);
      setMeetingPoints(data.data);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des points de rendez-vous");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const reloadMap = () => {
    setMapKey(prev => prev + 1); // Force le rechargement de la carte
  };

  const handleDeleteClick = (id: number | undefined) => {
    if (id) {
      setPointToDelete(id);
      setShowDeleteModal(true);
    }
  };

  const handleDeleteSuccess = () => {
    fetchMeetingPoints();
    reloadMap();
    toast.success('Point de rendez-vous supprimé avec succès');
  };

  const handleEditClick = (point: MeetingPointType) => {
    if (point.id) {
      setPointToEdit(point);
      setShowEditModal(true);
    }
  };

  const handleEditSuccess = () => {
    fetchMeetingPoints();
    reloadMap();
    toast.success('Point de rendez-vous modifié avec succès');
  };

  const handleAddSuccess = () => {
    fetchMeetingPoints();
    reloadMap();
    toast.success('Point de rendez-vous ajouté avec succès');
  };

  useEffect(() => {
    fetchMeetingPoints();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h2 className="pb-2 text-[13px] font-semibold text-[#616161]">
          Lieux de rendez-vous
        </h2>
        {meetingPoints.length < 3 && (
          <button
            className="flex items-center gap-2 rounded-md bg-[#6c61f6] px-4 py-2 text-sm text-white hover:bg-[#5a50e0]"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={16} />
            Ajouter un point
          </button>
        )}
      </div>

      <div className="h-[600px] w-full overflow-hidden relative mt-4">
        <div style={{ zIndex: 0, position: 'relative', height: '100%', width: '100%' }}>
          <MapContainer
            key={mapKey}
            center={[defaultCenter.lat, defaultCenter.lng]}
            zoom={6}
            style={{ height: '500px', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {meetingPoints.map((point) => (
              point.latitude && point.longitude && (
                <Marker
                  key={point.id}
                  position={[point.latitude, point.longitude]}
                  eventHandlers={{
                    click: () => setSelectedPoint(point)
                  }}
                >
                  <Popup>
                    <div className="min-w-[200px]">
                      <h3 className="font-semibold text-lg">{point.label}</h3>
                      <span className="text-sm text-gray-600">{point.address}</span>
                      <br />
                      <span className="text-sm text-gray-600">{point.city}</span>
                      <br />
                      <span className="text-sm text-gray-600">{point.postal_code}</span>
                      <br />
                      <div className="flex gap-2 justify-end pt-1">
                        <button
                          onClick={() => handleEditClick(point)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(point.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>
        </div>
      </div>

      {showDeleteModal && pointToDelete && (
        <MeetingPointConfirmDelete
          closeModal={() => {
            setShowDeleteModal(false);
            setPointToDelete(null);
          }}
          id={pointToDelete}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}

      {showEditModal && pointToEdit && (
        <MeetingPointEditComponent
          closeModal={() => {
            setShowEditModal(false);
            setPointToEdit(null);
          }}
          data={pointToEdit}
          id={pointToEdit.id}
          onEditSuccess={handleEditSuccess}
        />
      )}

      {showAddModal && (
        <MeetingPointAddComponent
          closeModal={() => setShowAddModal(false)}
          onAddSuccess={handleAddSuccess}
          existingPointsCount={meetingPoints.length}
        />
      )}
    </div>
  );
};

export default MeetingComponent; 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapSectionProps {
  meetingPoints: Array<{
    id: number;
    label: string;
    address: string;
    city: string;
    postal_code: string;
    latitude: number | string;
    longitude: number | string;
  }>;
}

// Correction pour les icônes Leaflet
// (sinon les marqueurs ne s'affichent pas correctement)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const defaultCenter = {
  lat: 48.8566,
  lng: 2.3522
};

const MapSection: React.FC<MapSectionProps> = ({ meetingPoints }) => {

  return (
    <div className="w-full md:w-1/2 lg:w-2/3 relative overflow-hidden rounded-lg shadow-lg ">
      <div className="w-full h-[400px] md:h-full z-10">
        <div style={{ zIndex: 0, position: 'relative', height: '100%', width: '100%' }}>
          <MapContainer center={[defaultCenter.lat, defaultCenter.lng]} zoom={8} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {meetingPoints?.length > 0 && meetingPoints?.map((point) => (
              point.latitude && point.longitude && (
                <Marker
                  key={point.id}
                  position={[Number(point.latitude), Number(point.longitude)]}
                >
                  <Popup>
                    <div className="min-w-[180px]">
                      <h3 className="font-semibold text-base">{point.label}</h3>
                      <span className="text-sm text-gray-600">{point.address}</span><br />
                      <span className="text-sm text-gray-600">{point.city}</span><br />
                      <span className="text-sm text-gray-600">{point.postal_code}</span>
                    </div>
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}
export default MapSection;
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface MapSectionMobileProps {
  meetingPoints: Array<{
    id: number;
    label: string;
    address: string;
    city: string;
    postal_code: string;
    latitude: number | string;
    longitude: number | string;
    vehicle?: {
      type: string;
    };
  }>;
}

// Correction pour les icônes Leaflet
// (sinon les marqueurs ne s'affichent pas correctement)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const defaultCenter = {
  lat: 48.8566,
  lng: 2.3522,
};

const MapSectionMobile: React.FC<MapSectionMobileProps> = ({
  meetingPoints,
}) => {

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg shadow-lg"
      style={{ minHeight: 400, height: 400, background: "red" }}
    >
      <div className="z-10 h-full w-full">
        <div
          style={{
            zIndex: 0,
            position: "relative",
            height: "100%",
            width: "100%",
          }}
        >
          
          <MapContainer
            center={[defaultCenter.lat, defaultCenter.lng]}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {meetingPoints?.length > 0 &&
              meetingPoints?.map(
                (point) =>
                  point.latitude &&
                  point.longitude && (
                    <Marker
                      key={point.id}
                      position={[
                        Number(point.latitude),
                        Number(point.longitude),
                      ]}
                    >
                      <Popup>
                        <div className="min-w-[180px]">
                          <h3 className="text-base font-semibold">
                            {point.label}
                          </h3>
                          <span className="text-sm text-gray-600">
                            {point.address}
                          </span>
                          <br />
                          <span className="text-sm text-gray-600">
                            {point.city}
                          </span>
                          <br />
                          <span className="text-sm text-gray-600">
                            {point.postal_code}
                          </span>
                          {point.vehicle && point.vehicle.type && (
                            <>
                              <br />
                              <span className="text-sm font-semibold text-indigo-600">
                                Type de boîte : {point.vehicle.type}
                              </span>
                            </>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ),
              )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};
export default MapSectionMobile;

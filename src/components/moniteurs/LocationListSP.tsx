import { MeetingPointTypeAttributes } from "@/types/monitor/settings/configuration";
import { CheckCircle2 } from "lucide-react";

type LocationListSPProps = {
  locations: MeetingPointTypeAttributes[];
  selectedLocationIds: string[];
  setSelectedLocationIds: (ids: string[]) => void;
  mairie: string;
  usedLocations?: string[];
};

export default function LocationListSP({
  locations,
  selectedLocationIds,
  setSelectedLocationIds,
  mairie,
  usedLocations = []
}: LocationListSPProps) {
  const handleLocationClick = (id: string) => {
    setSelectedLocationIds([id]);
  };

  return (
    <div className="mb-8">
      <label className="mb-2 block font-medium">
        Selectionner le lieu à marquer comme disponible
      </label>
      {locations.map((l) => {
        const isUsed = usedLocations.includes(l.id.toString());
        return (
          <div
            key={l.id}
            className={`flex items-center bg-white rounded-lg shadow-sm p-4 mb-4 cursor-pointer border-2 transition-colors ${
              selectedLocationIds.includes(l.id.toString())
                ? 'border-[#6C61F6] bg-[#f5f3ff]'
                : 'border-transparent hover:border-[#6C61F6]/50'
            }`}
            onClick={() => handleLocationClick(l.id.toString())}
          >
            <div className="flex items-center justify-center w-10 h-10">
              <input
                type="radio"
                checked={selectedLocationIds.includes(l.id.toString())}
                onChange={() => handleLocationClick(l.id.toString())}
                className="w-5 h-5 rounded-full border-2 transition-colors"
                style={{ accentColor: '#6C61F6' }}
                name="location-selection"
              />
            </div>
            <img src={mairie} alt="location" className="h-10 w-10 ml-2" />
            <div className="ml-4 flex-grow">
              <div className="font-medium">{l.label}</div>
              <div className="text-sm text-gray-500">{l.address}</div>
            </div>
            {isUsed && (
              <div className="flex items-center text-green-500 ml-2">
                <CheckCircle2 className="w-5 h-5 mr-1" />
                <span className="text-sm">Utilisé</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
} 
import { MeetingPointTypeAttributes } from "@/types/monitor/settings/configuration";

type LocationListProps = {
  locations: MeetingPointTypeAttributes[];
  selectedLocation: number| undefined;
  setSelectedLocationId: (id: number) => void;
  mairie: string;
};

export default function LocationList({
  locations,
  selectedLocation,
  setSelectedLocationId,
  mairie,
}: LocationListProps) {
  return (
    <div className="mb-8">
      <label className="mb-2 block font-medium">
        Selectionner le(s) lieu(x) à marquer comme disponible(s)
      </label>
      {locations.map((l) => (
        <div
          key={l.id}
          className={`flex items-center bg-white rounded-lg shadow-sm p-4 mb-4 cursor-pointer border-2 transition-colors ${selectedLocation === l.id ? 'border-[#6C61F6] bg-[#f5f3ff]' : 'border-transparent hover:border-[#6C61F6]/50'}`}
          onClick={() => setSelectedLocationId(l.id)}
        >
          <img src={mairie} alt="location" className="h-10 w-10" />
          <div className="ml-4">
            <div className="font-medium">{l.label}</div>
            <div className="text-sm text-gray-500">{l.address}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

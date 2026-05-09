import { VehicleType } from "@/types/monitor/settings/configuration";

type VehicleListProps = {
  vehicles: VehicleType[];
  selectedVehicleId: number | null;
  setSelectedVehicleId: (id: number) => void;
  cardtype: string;
};

export default function VehicleList({ vehicles, selectedVehicleId, setSelectedVehicleId, cardtype }: VehicleListProps) {
  return (
    <div className="mb-8">
      <label className="font-medium block mb-2">
        Sélectionner un véhicule à marquer comme disponible
      </label>
      {vehicles.map((v) => (
        <div
          key={v.id}
          className={`flex items-center bg-white rounded-lg shadow-sm p-4 mb-4 cursor-pointer border-2 transition-colors ${selectedVehicleId === v.id ? 'border-[#6C61F6] bg-[#f5f3ff]' : 'border-transparent hover:border-[#6C61F6]/50'}`}
          onClick={() => setSelectedVehicleId(v.id)}
        >
          <img src={cardtype} alt="car" className="w-10 h-10" />
          <div className="ml-4">
            <div className="font-medium">{v.brand} {v.model} {v.year}</div>
            <div className="text-gray-500 text-sm">{v.plate_number}</div>
          </div>
        </div>
      ))}
    </div>
  );
} 
import { VehicleType } from "@/types/monitor/settings/configuration";

type VehicleListSPProps = {
  vehicles: VehicleType[];
  selectedVehicleIds: string[];
  setSelectedVehicleIds: (ids: string[]) => void;
  cardtype: string;
};

export default function VehicleListSP({ vehicles, selectedVehicleIds, setSelectedVehicleIds, cardtype }: VehicleListSPProps) {
  const handleVehicleClick = (id: string) => {
    setSelectedVehicleIds([id]);
  };

  return (
    <div className="">
      <label className="font-medium block mb-2">
        Sélectionner le véhicule à marquer comme disponible
      </label>
      {vehicles.map((v) => (
        <div
          key={v.id}
          className={`flex items-center bg-white rounded-lg shadow-sm p-4 mb-4 cursor-pointer border-2 transition-colors ${
            selectedVehicleIds.includes(v.id.toString()) 
              ? 'border-[#6C61F6] bg-[#f5f3ff]' 
              : 'border-transparent hover:border-[#6C61F6]/50'
          }`}
          onClick={() => handleVehicleClick(v.id.toString())}
        >
          <div className="flex items-center justify-center w-10 h-10">
            <input
              type="radio"
              checked={selectedVehicleIds.includes(v.id.toString())}
              onChange={() => handleVehicleClick(v.id.toString())}
              className="w-5 h-5 rounded-full border-2 transition-colors"
              style={{ accentColor: '#6C61F6' }}
              name="vehicle-selection"
            />
          </div>
          <img src={cardtype} alt="car" className="w-10 h-10 ml-2" />
          <div className="ml-4">
            <div className="font-medium">{v.brand} {v.model} {v.year}</div>
            <div className="text-gray-500 text-sm">{v.plate_number}</div>
          </div>
        </div>
      ))}
    </div>
  );
} 
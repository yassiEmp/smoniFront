import cardtype from "@assets/apprenants/dashboard/vehicle_icon.svg";
import { VehicleType } from "@mytypes/monitor/settings/configuration";
import { Edit2Icon, Loader2, Trash2 } from "lucide-react";

interface VehicleProps {
  item: VehicleType[];
  gearbox_type: "manual" | "automatic";
  addVehicle: () => void;
  editVehicle: (vehicle: VehicleType) => void;
  deleteVehicle: (vehicle: VehicleType) => void;
  maxReached: boolean;
  loading: boolean;
}

const VehicleComponent = ({
  item,
  gearbox_type,
  addVehicle,
  editVehicle,
  deleteVehicle,
  maxReached,
  loading,
}: VehicleProps) => {
  // Filter vehicles by gearbox_type
  const filteredVehicles = item.filter(
    (vehicle) => vehicle.gearbox_type === gearbox_type
  );

  return (
    <div className="space-y-6 rounded-xl bg-white pb-6 pt-6 shadow ">
      <div className="space-y-4 mx-4">
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin" size={24} />
          </div>
        ) : filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <div
              key={`${vehicle.id}-${vehicle.plate_number}`}
              className="flex flex-row items-center justify-between rounded-lg bg-[#F6F6FB] p-4"
            >
              <div className="flex items-center gap-4">
                <img src={cardtype} alt="" className="h-10 w-10" />
                <div>
                  <p className="font-semibold">
                    {vehicle.brand} {vehicle.year}
                  </p>
                  <p className="text-[14px] text-[#757575]">
                    {vehicle.plate_number}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  onClick={() => editVehicle(vehicle)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-200 p-2"
                >
                  <Edit2Icon className="text-blue-500" size={18} />
                </div>
                <div
                  onClick={() => deleteVehicle(vehicle)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-red-200 p-2"
                >
                  <Trash2 className="text-red-500" size={18} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-gray-400">
            Aucun véhicule pour ce type.
          </div>
        )}
      </div>
      {maxReached && (
        <div className="mx-4 mb-2 flex items-center justify-center rounded-xl bg-[#EAE3FF] px-2 py-4 text-center text-[13px] font-semibold">
          <span>1 véhicule maximum autorisé par type</span>
        </div>
      )}
      {!maxReached && (
        <div className="flex justify-center">
          <button
            onClick={addVehicle}
            className="rounded-full bg-[#6C61F6] px-6 py-3 text-[15px] font-semibold text-white shadow transition hover:bg-[#5746c6]"
          >
            <span>Ajouter un véhicule</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default VehicleComponent;

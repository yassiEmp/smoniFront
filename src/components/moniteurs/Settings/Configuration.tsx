import { useEffect, useState } from "react";
import homme from "@assets/apprenants/dashboard/vehicle.svg";
import VehicleAddComponent from "./VehicleAddComponent";
import VehicleEditComponent from "./VehicleEditComponent";
import VehicleComponent from "./VehicleComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { deleteVehicle, getVehicles } from "@/api/monitor/parametre";
import { VehicleType } from "@mytypes/monitor/settings/configuration";
import MeetingComponent from "./MeetingComponent";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";

const Configuration = () => {
  const [selectedMode, setSelectedMode] = useState<"manual" | "automatic">(
    "automatic",
  );
  const { vehicles } = useSelector((state: RootState) => state.monitorReducer);
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [showEditVehicle, setShowEditVehicle] = useState<boolean>(false);
  const [showAddVehicle, setShowAddVehicle] = useState<boolean>(false);
  const [showDeleteVehicle, setShowDeleteVehicle] = useState<boolean>(false);
  const [vehicleToEdit, setVehicleToEdit] = useState<VehicleType | null>(null);
  const [vehicleToDelete, setVehicleToDelete] = useState<VehicleType | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);

  interface HandleClickProps {
    mode: "manual" | "automatic";
  }

  const handleClick = (mode: HandleClickProps["mode"]): void => {
    setSelectedMode(mode);
    setShowAddVehicle(false);
    setShowEditVehicle(false);
    setShowDeleteVehicle(false);
  };

  const handleShowAddVehicle = () => {
    setShowAddVehicle(!showAddVehicle);
  };

  const handleShowEditVehicle = (vehicle: VehicleType) => {
    setVehicleToEdit(vehicle);
    setShowEditVehicle(true);
  };

  const handleShowDeleteVehicle = (vehicle: VehicleType) => {
    setVehicleToDelete(vehicle);
    setShowDeleteVehicle(!showDeleteVehicle);
  };

  const dispatch = useDispatch();

  const fetchVehicles = async () => {
    setLoading(true);
    await getVehicles(token, dispatch);
    setLoading(false);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const vehiclesOfType = vehicles && vehicles.length > 0 ? vehicles.filter((v: VehicleType) => v.gearbox_type === selectedMode) : [];
  const maxReached = vehiclesOfType.length >= 1;

  return (
    <>
      <div className="space-y-8">
        <h1 className="text-[13px] font-semibold text-[#616161]">
          Vos véhicules disponibles pour les leçons
        </h1>
        <div className="flex gap-2 rounded-full bg-white p-2 shadow">
          <button
            onClick={() => handleClick("automatic")}
            className={`flex items-center rounded-full border px-4 py-1 text-[14px] font-semibold transition ${
              selectedMode === "automatic"
                ? "bg-indigo-100 text-[#6c61f6] ring-2 ring-indigo-400 ring-offset-2"
                : "bg-[#FAFAFA] text-[#757575]"
            } `}
          >
            <img className="mr-2 h-[20px] w-[20px]" src={homme} alt="homme" />
            Automatique
          </button>
          <button
            onClick={() => handleClick("manual")}
            className={`flex items-center rounded-full border px-5 py-1 text-[14px] font-semibold transition ${
              selectedMode === "manual"
                ? "bg-indigo-100 text-[#6c61f6] ring-2 ring-indigo-400 ring-offset-2"
                : "bg-[#FAFAFA] text-[#757575]"
            } `}
          >
            <img className="mr-2 h-[20px] w-[20px]" src={homme} alt="homme" />
            Manuel
          </button>
        </div>
        <VehicleComponent
          item={vehiclesOfType}
          gearbox_type={selectedMode}
          addVehicle={handleShowAddVehicle}
          editVehicle={handleShowEditVehicle}
          deleteVehicle={handleShowDeleteVehicle}
          maxReached={maxReached}
          loading={loading}
        />

        
        <MeetingComponent />
        
      </div>
      {showAddVehicle && (
        <VehicleAddComponent
          closeModal={handleShowAddVehicle}
          gearbox_type={selectedMode}
        />
      )}
      {showEditVehicle && vehicleToEdit && (
        <VehicleEditComponent
          data={vehicleToEdit}
          closeModal={() => setShowEditVehicle(false)}
          gearbox_type={selectedMode}
          id={vehicleToEdit.id}
        />
      )}
      {showDeleteVehicle && vehicleToDelete && (
        <DeleteConfirmationModal
          isOpen={showDeleteVehicle}
          onClose={() => setShowDeleteVehicle(false)}
          onConfirm={async () => {
            const res = await deleteVehicle(vehicleToDelete.id, token, dispatch);
            if (res) {
              setShowDeleteVehicle(false);
            }
          }}
          title="Confirmer suppression"
          message="Voulez-vous supprimer ce véhicule ?"
        />
      )}
    </>
  );
};

export default Configuration;

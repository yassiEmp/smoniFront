import SpecialDateTimeSelector from "./planning/SpecialDateTimeSelector";
import VehicleList from "./planning/VehicleList";
import LocationList from "./planning/LocationList";
import mairie from "@assets/dashboard-moniteur/mairie.png";
import cardtype from "@assets/apprenants/dashboard/vehicle_icon.svg";
import {
  VehicleType,
  MeetingPointTypeAttributes,
} from "@/types/monitor/settings/configuration";
import { getDayNameInFrench, formatDateToISO, getMonday, formatDateToLocalYYYYMMDD } from "@/utils/dateUtils";
import { createSpecialSlot } from "@/api/monitor/planning";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface PlanningSpecialProps {
  specialDate: string;
  vehicles: VehicleType[];
  specialSelectedVehicleId: number | null;
  setSelectedVehicleId: (id: number | null) => void;
  locations: MeetingPointTypeAttributes[];
  specialSelectedLocation: number | null;
  setSelectedLocationId: (id: number | null) => void;
  specialSelectedHour: number | null;
  onClose: () => void;
}

const PlanningSpecial = ({
  specialDate,
  vehicles,
  specialSelectedVehicleId,
  setSelectedVehicleId,
  locations,
  specialSelectedLocation,
  setSelectedLocationId,
  specialSelectedHour,
  onClose,
}: PlanningSpecialProps) => {
  const token = useSelector((state: RootState) => state.authReducer.token);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="animate-fade-in relative w-full max-w-7xl rounded-lg bg-white p-6 shadow-lg">
        <button
          className="absolute right-4 top-4 text-2xl font-bold text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Fermer"
        >
          &times;
        </button>
        <h2 className="mb-2 text-2xl font-semibold">Planning Spécial</h2>
        <SpecialDateTimeSelector date={specialDate} isSpecial={true} />
        <div className="my-4 border-b-2 border-gray-200"></div>
        <div
          className="scrollbar-hide max-h-[55vh] overflow-y-auto pr-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`
            .scrollbar-hide::-webkit-scrollbar { display: none; }
          `}</style>
          <VehicleList
            vehicles={vehicles}
            selectedVehicleId={specialSelectedVehicleId}
            setSelectedVehicleId={setSelectedVehicleId}
            cardtype={cardtype}
          />
          {specialSelectedVehicleId && (
            <LocationList
              locations={locations}
              selectedLocation={specialSelectedLocation}
              setSelectedLocationId={setSelectedLocationId}
              mairie={mairie}
            />
          )}
        </div>

        <div className="flex justify-end border-t border-gray-200 pt-2 items-center">
          <button
            className={`mt-4 rounded px-8 py-2 lg:w-[20%] w-auto justify-center items-center ${specialSelectedVehicleId ? "text-white" : "text-gray-400"} ${loading ? "opacity-50" : ""}`}
            style={{
              backgroundColor: specialSelectedVehicleId ? "#6C61F6" : "#E0E0E0",
            }}
            disabled={!specialSelectedVehicleId}
            onClick={async () => {
              if (
                specialSelectedLocation &&
                specialSelectedVehicleId &&
                specialSelectedHour !== null
              ) {
                setLoading(true);
                const dateISO = formatDateToISO(specialDate);
                const dayName = getDayNameInFrench(dateISO);
                const mondayDate = getMonday(new Date(dateISO));
                const mondayISO = formatDateToLocalYYYYMMDD(mondayDate);
                
                const success = await createSpecialSlot(
                  token,
                  specialSelectedLocation,
                  specialSelectedVehicleId,
                  dayName,
                  dateISO,
                  specialSelectedHour,
                  specialSelectedHour + 1,
                  dispatch,
                  mondayISO
                );
                if (success) {
                  setLoading(false);
                  setSelectedVehicleId(null);
                  setSelectedLocationId(null);
                  onClose();
                } else {
                  setLoading(false);
                }
              } else {
                toast.error(
                  "Veuillez sélectionner une location et un véhicule",
                );
              }
            }}
          >
            {loading ? "Ajout en cours..." : "Valider ce créneau"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanningSpecial;

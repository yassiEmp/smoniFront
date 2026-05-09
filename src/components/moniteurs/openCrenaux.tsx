import { X } from "lucide-react";
import Calendar from "@assets/dashboard-moniteur/Calendar.png";
import { useEffect, useState } from "react";
import PlanningSpecial from "./PlanningSpecial";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";

interface Props {
  date: string;
  hour: number;
  onClose: () => void;
}

const OpenCrenaux = ({ date, hour, onClose }: Props) => {
  const [showPlanningSpecial, setShowPlanningSpecial] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(
    null,
  );
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
    null,
  );
  const [selectedHour, setSelectedHour] = useState<number | null>(hour);
  const { vehicles, locations } = useSelector(
    (state: RootState) => state.monitorReducer,
  );
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    setShowPlanningSpecial(false);
    setSelectedVehicleId(null);
    setSelectedLocationId(null);
    setSelectedHour(null);
    onClose();
  };

  if (showPlanningSpecial) {
    return (
      <div className="px-4">
        <PlanningSpecial
          specialDate={date}
          vehicles={vehicles}
          specialSelectedVehicleId={selectedVehicleId}
          setSelectedVehicleId={setSelectedVehicleId}
          locations={locations}
          specialSelectedLocation={selectedLocationId}
          setSelectedLocationId={setSelectedLocationId}
          specialSelectedHour={selectedHour}
          onClose={handleClose}
        />
      </div>
    );
  }

  return (
    <div>
      {
        <div className="flex md:min-w-[471px] md:max-w-[471px] w-full flex-col gap-[16px] rounded-[8px] border-[0.5px] border-[#F5F5F5] bg-white px-[16px] py-[24px] shadow-lg transition-shadow duration-300 hover:shadow-2xl">
          <div className="flex items-start justify-between">
            <h1 className="w-3/4 font-semibold">Ouvrir ce créneau</h1>
            <div className="flex items-center gap-2">
              <X
                onClick={onClose}
                className="cursor-pointer transition-colors hover:text-red-500"
              />
            </div>
          </div>
          <div className="space-y-[12px]">
            <div className="flex items-center gap-2">
              <img src={Calendar} alt="" />
              {/* Date du cours */}
              <p className="text-[14px]">{date}</p>
              <div className="h-1 w-1 rounded-full bg-black"></div>
              <p className="text-[14px]">
                <span>{hour}H00</span> - <span>{hour + 1}H00</span>
              </p>
            </div>
          </div>
          <p className="text-center text-[14px]">Créneau Fermé</p>
          <div className="space-y-[4px] border-t border-[#E0E0E0] pt-[16px]">
            <button
              className="w-full rounded-[6.22px] border-[0.39px] border-[#F5F5F5] bg-[#6C61F6] py-2 text-[12px] font-semibold leading-[140%] text-[#FDFDFD]"
              onClick={() => setShowPlanningSpecial(true)}
            >
              Ouvrir le créneau
            </button>
            <button
              className="w-full rounded-[6.22px] border-[0.39px] border-[#BCADFC] bg-[#D3C8FE] py-2 text-[12px] font-semibold leading-[140%] text-[#463BE2]"
              onClick={() => onClose()}
            >
              Annuler
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default OpenCrenaux;

import { X } from "lucide-react";
import Calendar from "@assets/dashboard-moniteur/Calendar.png";
import Car from "@assets/dashboard-moniteur/car.png";
import Localisation from "@assets/dashboard-moniteur/Localisation.png";
import { useEffect } from "react";
import { ScheduleSlot } from "@/types/monitor/settings/configuration";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
interface Props {
  onClose: () => void;
  slot: ScheduleSlot | null;
  onDelete: () => void;
}

const CloseCrenaux = ({ onClose, slot, onDelete }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="">
      {
        <div className="flex md:min-w-[471px] md:max-w-[471px] w-full flex-col gap-[16px] rounded-[8px] border-[0.5px] border-[#F5F5F5] bg-white px-[16px] py-[24px] shadow-lg transition-shadow duration-300 hover:shadow-2xl">
          <div className="flex items-start justify-between">
            <h1 className="w-3/4 font-semibold">
              Modifier ce planning de disponibilité
            </h1>
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
              <p className="text-[14px]">
                {slot?.day_of_week}{" "}
                {format(new Date(slot?.date || ""), "dd MMMM yyyy", {
                  locale: fr,
                })}
              </p>
              <div className="h-1 w-1 rounded-full bg-black"></div>
              <p className="text-[14px]">
                <span>{slot?.start_time}</span> - <span>{slot?.end_time}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img src={Car} alt="" />
              <p className="text-[14px]">
                {slot?.vehicle.brand} {slot?.vehicle.model} {slot?.vehicle.year}{" "}
                – {slot?.vehicle.plate_number}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img src={Localisation} alt="" />
              <p className="text-[14px]">{slot?.meeting_point.label}</p>
            </div>
          </div>
          <div className="space-y-[4px] border-t border-[#E0E0E0] pt-[16px]">
            <h3 className="font-medium">Fermer ?</h3>
            <button
              onClick={() => {
                onDelete();
                onClose();
              }}
              className="w-full rounded-[6.22px] border-[0.39px] border-[#F5F5F5] bg-[#6C61F6] py-2 text-[12px] font-semibold leading-[140%] text-[#FDFDFD]"
            >
              Fermer le créneau
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default CloseCrenaux;

import { X } from "lucide-react";
import Calendar from "@assets/dashboard-moniteur/Calendar.png";
import Localisation from "@assets/dashboard-moniteur/Localisation.png";
import { useEffect, useState } from "react";
import { ScheduleSlot } from "@/types/monitor/settings/configuration";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { acceptAppointment } from "@/api/monitor/planning";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { formatDateToISO, formatDateToLocalYYYYMMDD, getMonday, isDateTimeGreaterOrEqual } from "@/utils/dateUtils";
import toast from "react-hot-toast";
import { imageUrl } from "@/api";
import { useNavigate } from "react-router";

interface Props {
  onClose: () => void;
  slot: ScheduleSlot | null;
  onDetails: () => void;
  date: string;
  setIsOpenCancel: (isOpen: boolean) => void;
}

const CrenauxModale = ({ onClose, slot, onDetails, date, setIsOpenCancel }: Props) => {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const [isAccepting, setIsAccepting] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Vérifie si le créneau est passé
  const isSlotPast = () => {
    if (slot?.start_time) {
      return isDateTimeGreaterOrEqual(date, slot.start_time);
    }
    return false;
  };

  // Vérifie si la date du créneau est aujourd'hui ou avant aujourd'hui
  const isTodayOrPast = () => {
    if (!slot?.date) return false;
    const today = new Date();
    const slotDate = new Date(slot.date);
    today.setHours(0, 0, 0, 0);
    slotDate.setHours(0, 0, 0, 0);
    return today.getTime() >= slotDate.getTime();
  };
  return (
    <div>
      <div className="flex w-full flex-col gap-[16px] rounded-[8px] border-[0.5px] border-[#F5F5F5] bg-white px-[16px] py-[24px] shadow-lg transition-shadow duration-300 hover:shadow-2xl md:min-w-[471px] md:max-w-[471px]">
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
            {slot?.appointment?.learner?.photo ? (
              <img
                src={imageUrl + slot.appointment.learner.photo}
                alt={
                  slot.appointment.learner.firstname +
                  " " +
                  slot.appointment.learner.lastname
                }
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#6C61F6]">
                <span className="font-bold text-white">
                  {(slot?.appointment?.learner?.firstname || "").charAt(0)}
                  {(slot?.appointment?.learner?.lastname || "").charAt(0)}
                </span>
              </div>
            )}
            <p className="text-[14px]">
              {slot?.appointment?.learner.firstname} {slot?.appointment?.learner.lastname}
            </p>
            <span className="rounded bg-[#FFE8E8] px-2 py-1 text-xs text-[#FF0000]">
              Débutant
            </span>
            {/* Affichage du status */}
            {slot?.appointment?.status && (
              <span className={`rounded px-2 py-1 text-xs ml-2 ${
                slot.appointment.status === 'completed' ? 'bg-[#e0f7fa] text-[#00bcd4]' :
                slot.appointment.status === 'cancelled' ? 'bg-red-200 text-red-600' :
                slot.appointment.status === 'scheduled' ? 'bg-[#F4F0FF] text-[#6C61F6]' :
                'bg-[#dcf1d7] text-[#30c538]'
              }`}>
                {slot.appointment.status === 'completed' ? 'Complété' :
                 slot.appointment.status === 'cancelled' ? 'Annulé' :
                 slot.appointment.status === 'scheduled' ? 'Planifié' :
                 slot.appointment.status}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <img src={Localisation} alt="" />
            <p className="text-[14px]">{slot?.meeting_point.label}</p>
          </div>
        </div>
        <div className="space-y-[4px] border-t border-[#E0E0E0] pt-[16px]">
          {/* <h3 className="font-medium">Prêt ?</h3> */}
          <div className="flex w-full justify-between gap-2">
            {/* <button className="flex-1 rounded-[6.22px] border-[0.39px] border-[#F5F5F5] bg-[#6C61F6] py-2 text-[12px] font-semibold leading-[140%] text-[#FDFDFD] transition-colors hover:bg-[#5A50E2]">
              Noter l'apprenant
            </button> */}
            {slot?.appointment?.status === "scheduled" && (
              <button
                disabled={isAccepting}
                onClick={async () => {
                  if (isSlotPast()) {
                    toast.error("Vous ne pouvez pas accepter un rendez-vous passé.");
                    return;
                  }
                  setIsAccepting(true);
                  const dateISO = formatDateToISO(date);
                  const mondayDate = getMonday(new Date(dateISO));
                  const mondayISO = formatDateToLocalYYYYMMDD(mondayDate);
                  await acceptAppointment(
                    token,
                    slot?.appointment?.id || 0,
                    dispatch,
                    onClose,
                    mondayISO,
                  );
                  setIsAccepting(false);
                }}
                className="flex-1 rounded-[6.22px] border-[0.39px] border-[#F5F5F5] bg-[#6C61F6] py-2 text-[12px] font-semibold leading-[140%] text-[#FDFDFD] transition-colors hover:bg-[#5A50E2]"
              >
                {isAccepting ? (
                  'Veuillez patienter...'
                ) : (
                  "Accepter le rdv"
                )}
              </button>
            )}
            {slot?.appointment?.status === "confirmed" && isTodayOrPast() && (
              <button
                onClick={() => {
                  navigate(`/monitor/rendez-vous`);
                }}
                className="flex-1 rounded-[6.22px] border-[0.39px] border-[#30c538] bg-[#dcf1d7] py-2 text-[12px] font-semibold leading-[140%] text-[#30c538] transition-colors hover:bg-[#b6e6b2]"
              >
                Marquer présence
              </button>
            )}
            {/* <button
              onClick={onDetails}
              className="flex-1 rounded-[6.22px] border-[0.39px] border-[#F5F5F5] bg-[#F4F0FF] py-2 text-[12px] font-semibold leading-[140%] text-[#6C61F6] transition-colors hover:bg-[#E8E3FF]"
            >
              Voir plus
            </button> */}
            {['completed', 'pending', 'confirmed', 'scheduled'].includes(slot?.appointment?.status) && (
              <button
                onClick={() => {
                  if (isSlotPast()) {
                    toast.error("Vous ne pouvez pas annuler un rendez-vous passé.");
                    return;
                  }
                  onClose();
                  setIsOpenCancel(true);
                }}
                className="flex-1 rounded-[6.22px] border-[0.39px] border-[#F5F5F5] bg-[#F5F5F5] py-2 text-[12px] font-semibold leading-[140%] text-[#757575] transition-colors hover:bg-[#E0E0E0]"
              >
                Annuler le rdv
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrenauxModale;

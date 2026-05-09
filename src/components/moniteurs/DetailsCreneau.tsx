import { X } from "lucide-react";
import { useState, useEffect } from "react";
import {
  ScheduleSlot,
  Appointment,
} from "@/types/monitor/settings/configuration";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { imageUrl } from "@/api";
import { acceptAppointment } from "@/api/monitor/planning";
import {
  formatDateToISO,
  getMonday,
  formatDateToLocalYYYYMMDD,
  isDateTimeGreaterOrEqual,
} from "@/utils/dateUtils";

interface Props {
  availability: ScheduleSlot;
  onClose: () => void;
  setIsOpenCancel: () => void;
}

const DetailsCreneau = ({ availability, onClose, setIsOpenCancel }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.authReducer);
  const [isConfirm, setIsConfirm] = useState(
    availability.appointment?.status === "confirmed",
  );
  const [appointmentData, setAppointmentData] = useState<
    Appointment | undefined
  >(availability.appointment);
  const [accepting, setAccepting] = useState(false);
  const { token } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  console.log(availability)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9995] flex justify-end bg-black/40">
      <div className="scrollbar-hide fixed right-0 top-0 h-full w-full overflow-y-auto bg-white shadow-lg md:w-[471px] md:rounded-l-lg">
        <div className="relative h-[103px] bg-gradient-to-t from-[#FAFAFA] to-[#EAE3FF] pt-[39px]">
          <div
            className="absolute right-4 top-6 cursor-pointer"
            onClick={onClose}
          >
            <X />
          </div>
          {appointmentData?.learner?.photo ? (
            <img
              src={imageUrl + appointmentData?.learner.photo}
              width={128}
              height={128}
              className="absolute left-1/2 -translate-x-1/2 rounded-[100px] md:left-[38%] md:translate-x-0"
              alt=""
            />
          ) : (
            <div className="absolute left-1/2 -translate-x-1/2 rounded-[100px] md:left-[38%] md:translate-x-0">
              <div className="flex h-[128px] w-[128px] items-center justify-center rounded-[100px] bg-[#6C61F6]">
                <p className="text-3xl font-semibold text-white">
                  {(appointmentData?.learner.firstname || "").charAt(0)}
                  {(appointmentData?.learner.lastname || "").charAt(0)}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="space-y-7 px-4 pt-20 md:px-[20px]">
          <div className="flex items-center justify-between">
            <h1 className="text-[18px] font-semibold leading-[140%]">
              {`${appointmentData?.learner.firstname} ${appointmentData?.learner.lastname}`}
            </h1>
            {isOpen ? (
              <div className="flex items-center gap-1 rounded-[4px] border-[0.5px] border-[#F75555] bg-[#FDCCCC] px-2 py-1 text-[12px] font-medium text-[#F75555]">
                Débutant
                <div className="h-1 w-1 rounded-full bg-[#F75555]"></div>
              </div>
            ) : (
              <div
                onClick={() => setIsOpen(isOpen)}
                className="flex items-center gap-1 rounded-[4px] border-[0.5px] border-[#9E9E9E] bg-[#F5F5F5] px-2 py-1 text-[12px] font-medium"
              >
                Nouveau
                <div className="h-1 w-1 rounded-full bg-[#9E9E9E]"></div>
              </div>
            )}
          </div>
          <div className="space-y-[6px]">
            <div className="flex flex-col border-b-[0.38px] border-[#9E9E9E] px-2 py-[6px] md:flex-row md:justify-between">
              <p className="mb-2 text-[12px] font-semibold text-[#616161] md:mb-0">
                Date & Heure
              </p>
              <div className="flex items-center gap-3">
                <p className="text-[12px] font-semibold">
                  {format(availability.date, "EEEE d MMMM yyyy", {
                    locale: fr,
                  })}{" "}
                  | {availability.start_time} → {availability.end_time}
                </p>
              </div>
            </div>
            <div className="flex flex-col border-b-[0.38px] border-[#9E9E9E] px-2 py-[6px] md:flex-row md:justify-between">
              <p className="mb-2 text-[12px] font-semibold text-[#616161] md:mb-0">
                Point de rendez-vous
              </p>
              <p className="text-[12px] font-semibold">
                {availability.meeting_point.label}
              </p>
            </div>
            <div className="flex flex-col border-b-[0.38px] border-[#9E9E9E] px-2 py-[6px] md:flex-row md:justify-between">
              <p className="mb-2 text-[12px] font-semibold text-[#616161] md:mb-0">
                Type d'offre
              </p>
              <p className="text-[12px] font-semibold">Accompagnement</p>
            </div>
            <div className="flex flex-col border-b-[0.38px] border-[#9E9E9E] px-2 py-[6px] md:flex-row md:justify-between">
              <p className="mb-2 text-[12px] font-semibold text-[#616161] md:mb-0">
                Véhicule
              </p>
              <p className="text-[12px] font-semibold">
                {availability.vehicle.brand} {availability.vehicle.model}{" "}
                {availability.vehicle.year}
              </p>
            </div>
            <div className="flex flex-col border-b-[0.38px] border-[#9E9E9E] px-2 py-[6px] md:flex-row md:justify-between">
              <p className="mb-2 text-[12px] font-semibold text-[#616161] md:mb-0">
                Type de boîte
              </p>
              <p className="text-[12px] font-semibold">
                {availability.vehicle.gearbox_type}
              </p>
            </div>
          </div>
          <div className="space-y-[24px]">
            <h2 className="text-[12px] font-semibold">Notes & communication</h2>
            <div className="flex items-start gap-2 border-b-[0.5px] border-[#E0E0E0] py-2">
              {user?.photo ? (
                <img
                  src={imageUrl + user.photo}
                  alt=""
                  className="h-[40px] w-[40px] rounded-[100px]"
                />
              ) : (
                <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[100px] bg-[#F5F5F5]">
                  <p className="text-[12px] font-semibold">
                    {user?.firstname.charAt(0)}
                    {user?.lastname.charAt(0)}
                  </p>
                </div>
              )}
              <div className="space-y-[8px]">
                <h3 className="text-[16px] font-medium">
                  {user?.firstname} {user?.lastname}
                </h3>
                <p className="text-[14px] text-[#616161]">
                  {availability.appointment?.lesson_notes?.observation || "Aucune note"}
                </p>
                <span className="text-[14px] text-[#616161]">
                  {format(availability.date, "EEEE d MMMM yyyy", {
                    locale: fr,
                  })}
                </span>
              </div>
            </div>
          </div>
          {/* {isConfirm && (
            <div className="space-y-[6.85px]">
              <label htmlFor="text" className="text-[12px] font-semibold">
                {isConfirm
                  ? "Laisser une note pédagogique"
                  : "Vous pourrez ajouter une note en démarrant le rdv"}
              </label>
              <input
                type="text"
                id="text"
                placeholder="Votre note"
                className="h-[60px] w-full rounded-md border border-black pl-[5.14px] text-[10.28px] text-[#757575]"
              />
            </div>
          )} */}
          {isConfirm && !isDateTimeGreaterOrEqual(availability.date, availability.end_time) && (
              <button
                onClick={async () => {
                  setAccepting(true);
                  const dateISO = formatDateToISO(availability.date);
                  const mondayDate = getMonday(new Date(dateISO));
                  const mondayISO = formatDateToLocalYYYYMMDD(mondayDate);
                  await acceptAppointment(
                    token,
                    availability.appointment?.id as number,
                    dispatch,
                    () => {
                      setAccepting(false);
                    },
                    mondayISO,
                    (data: Appointment) => {
                      setAppointmentData(data);
                    },
                    (isConfirm: boolean) => {
                      setIsConfirm(isConfirm);
                    },
                  );
                }}
                className="w-full rounded-[6.22px] border-[0.39px] border-[#F5F5F5] bg-[#6C61F6] py-[16px] text-[12px] font-semibold leading-[140%] text-[#FDFDFD]"
              >
                {accepting ? "Veuillez patienter..." : "Accepter le rdv"}
              </button>
          )}
           
            {isConfirm && !isDateTimeGreaterOrEqual(availability.date, availability.start_time) && (
              <button
                onClick={()=>{
                  setIsOpenCancel();
                  onClose();
                }}
                className="w-full rounded-[6.22px] border-[0.39px] border-[#F5F5F5] bg-[#EEEEEE] py-[16px] text-[12px] font-semibold leading-[140%] text-[#757575]">
                Annuler le rdv
              </button>
            )}
          </div>
        </div>
      </div>
  );
};

export default DetailsCreneau;

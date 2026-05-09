import {
  getMonday,
  formatDateToLocalYYYYMMDD,
  toLocalMidnightISOString,
  formatDateToISO,
} from "@utils/dateUtils";
import { useEffect, useState } from "react";
import ScheduleCell from "./ScheduleCell";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { TimeSlot } from "./type";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleTimeColumn from "./ScheduleTimeColumn";
// import ModificationPlaning1 from "@components/moniteurs/ModificationPlaning1";
import CloseCrenaux from "@/components/moniteurs/CloseCreanux";
import OpenCrenaux from "@components/moniteurs/openCrenaux";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { ScheduleSlot } from "@/types/monitor/settings/configuration";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import { deleteAvailability } from "@/api/monitor/planning";
import CrenauxModale from "../CrenauModale";
import DetailsCreneau from "../DetailsCreneau";
import { addDays } from "date-fns";
import toast from "react-hot-toast";
import ScheduleHeaderMobile from "./SheduleHeaderMobile";
import ScheduleCellMobile from "./ScheduleCellMobile";
import CrenauCancel from "../CrenauCancel";

interface ScheduleGridProps {
  date: string;
  setDate: (date: string) => void;
}

const ScheduleGrid = ({ date, setDate }: ScheduleGridProps) => {
  const [days, setDays] = useState<Date[]>([]);
  const [actualDayMobile, setActualDayMobile] = useState<Date>(new Date());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { token } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const { availabilities } = useSelector(
    (state: RootState) => state.monitorReducer,
  );
  const [actualWeekFirstDay, setActualWeekFirstDay] = useState<
    string | number | Date
  >("");
  const hours = Array.from({ length: 17 }, (_, i) => i + 6);
  const [modalInfo, setModalInfo] = useState<{
    open: boolean;
    slot?: ScheduleSlot | TimeSlot | null;
    position?: { top: number; left: number };
  }>({ open: false, slot: null, position: undefined });
  // const [slots, setSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    // Synchronise la semaine locale avec la date parent
    const monday = getMonday(new Date(date));
    const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(monday, i));
    setDays(weekDays);
    setActualWeekFirstDay(monday);
    setActualDayMobile(monday);
  }, [date]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    // Initial check
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // useEffect(() => {
  //     setSlots([]);
  // }, []);

  const nextWeek = () => {
    const monday = getMonday(addDays(new Date(date), 7));
    setDate(formatDateToLocalYYYYMMDD(monday));
  };

  const prevWeek = () => {
    const monday = getMonday(addDays(new Date(date), -7));
    setDate(formatDateToLocalYYYYMMDD(monday));
  };

  const calculateModalPosition = (rect: DOMRect) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const modalWidth = 471;
    const modalHeight = 300;

    let left = rect.right + 56 + window.scrollX;

    if (left + modalWidth > windowWidth) {
      left = rect.left - modalWidth - 16 + window.scrollX;
    }

    let top = rect.top + window.scrollY;

    if (top + modalHeight > windowHeight + window.scrollY) {
      top = rect.bottom - modalHeight + window.scrollY;
    }

    return {
      top,
      left,
    };
  };

  // Fonction utilitaire pour extraire la date au format YYYY-MM-DD depuis une string ISO
  const extractYYYYMMDD = (isoString: string): string => isoString.slice(0, 10);

  const handleCellClick = (
    slot: ScheduleSlot | undefined,
    event?: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!slot || !event) return;
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const position = calculateModalPosition(rect);
    setModalInfo({ open: true, slot, position });
  };

  const isTimeSlot = (slot: ScheduleSlot | TimeSlot): slot is TimeSlot => {
    return "hourstart" in slot && "hourend" in slot;
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(null);  
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  // Ajout d'un gestionnaire pour le changement de date
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const monday = getMonday(selectedDate);
    setDate(formatDateToLocalYYYYMMDD(monday));
  };

  return (
    <div className="md:px-8">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full">
        <div className="flex items-center justify-between gap-2">
          <button onClick={prevWeek} className="rounded-full bg-[#6C61F6] px-3 py-2 font-medium text-white hover:bg-gray-300 transition">
            ←
          </button>
          <button onClick={nextWeek} className="rounded-full bg-[#6C61F6] px-3 py-2 font-medium text-white hover:bg-gray-300 transition">
             →
          </button>
        </div>
        {actualWeekFirstDay !== "" ? (
          <h2 className="text-lg font-semibold text-center flex-1">
            Semaine du {format(actualWeekFirstDay, "dd MMM yyyy", { locale: fr })}
          </h2>
        ) : null}
        <input
          type="date"
          className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition bg-white text-gray-700 w-full sm:w-auto"
          onChange={handleDateChange}
          value={date}
        />
      </div>

      <div className="overflow-x-auto">
        <div className="w-full md:min-w-[700px] sm:min-w-[400px] ">
          <div className="flex flex-col">
            <div className="flex">
              <div className="md:flex hidden h-[10px] w-[33.33px] min-w-[33.33px] flex-col justify-between text-[12px] text-[#9E9E9E] md:w-[33.33px] md:min-w-[33.33px]"></div>
              <div className="flex w-full flex-row md:justify-start sm:justify-center">
                {days.length
                  ? days.map((day: Date, index: number) => (
                      <div key={`${index}-${day}`} className="flex-grow">
                        <ScheduleHeader key={index} day={day} />
                        <ScheduleHeaderMobile key={`${index}-${day}`} day={day} actualDay={actualDayMobile} setActualDay={()=>{setActualDayMobile(day);}} />
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className="md:flex hidden">
              <div className="flex h-[10px] w-[33.33px] min-w-[33.33px] flex-col justify-between text-[12px] text-[#9E9E9E] md:w-[33.33px] md:min-w-[33.33px]"></div>
              <div className="flex w-full flex-row">
                {days.length
                  ? days.map((_: Date, index: number) => (
                      <ScheduleHeader key={index} />
                    ))
                  : null}
              </div>
            </div>
          </div>
          {/* Affichage des cellules */}
          <div className="md:flex flex-col hidden">
            {hours.length
            ? hours.map((hour, index) => (
                <div className="flex flex-row" key={index}>
                  <ScheduleTimeColumn hour={hour} />
                  <div className="flex w-full flex-row">
                    {days.length
                      ? days.map((day: Date, index: number) => {
                          const slot = availabilities.find((s) => {
                            const slotDate = extractYYYYMMDD(s.date);
                            const cellDate = format(day, "yyyy-MM-dd");
                            const slotHour = parseInt(
                              s.start_time.split(":")[0],
                              10,
                            );
                            return slotDate === cellDate && slotHour === hour;
                          });
                          return (
                            <ScheduleCell
                              key={index}
                              slot={slot}
                              onClick={(e) => handleCellClick(slot, e)}
                              onEmptyClick={(e) => {
                                const rect = (
                                  e.target as HTMLElement
                                ).getBoundingClientRect();
                                const position = calculateModalPosition(rect);
                                const isoDate = toLocalMidnightISOString(day);
                                const tomorrow = new Date();
                                tomorrow.setDate(tomorrow.getDate() + 1);
                                tomorrow.setHours(0, 0, 0, 0);
                                const slotDate = new Date(day);
                                slotDate.setHours(hour, 0, 0, 0);
                                
                                if (slotDate < tomorrow) {
                                  toast.error("Impossible d'ajouter un créneau pour aujourd'hui ou dans le passé. Vous pouvez seulement planifier à partir de demain.");
                                  return;
                                }
                                
                                setModalInfo({
                                  open: true,
                                  slot: {
                                    day: isoDate,
                                    hourstart: hour,
                                    hourend: hour + 1,
                                    status: "ferme",
                                  },
                                  position,
                                });
                              }}
                            />
                          );
                        })
                      : null}
                  </div>
                </div>
              ))
            : null}
          </div>

          <div className="flex flex-col md:hidden">
              {hours.length ? 
                hours.map((hour, index) => {
                  const slot = availabilities.find((s) => {
                    const slotDate = extractYYYYMMDD(s.date);
                    const cellDate = format(actualDayMobile, "yyyy-MM-dd");
                    const slotHour = parseInt(
                      s.start_time.split(":")[0],
                      10,
                    );
                    return slotDate === cellDate && slotHour === hour;
                  });
                  return (
                    <div className="mt-2 w-full flex justify-start items-center relative" key={index}>
                      <ScheduleCellMobile 
                        key={index}
                        slot={slot}
                        hour={hour}
                        onClick={(e) => handleCellClick(slot, e)}
                        onEmptyClick={(e) => {
                          const rect = (
                            e.target as HTMLElement
                          ).getBoundingClientRect();
                          const position = calculateModalPosition(rect);
                          const isoDate = toLocalMidnightISOString(actualDayMobile);
                          const tomorrow = new Date();
                          tomorrow.setDate(tomorrow.getDate() + 1);
                          tomorrow.setHours(0, 0, 0, 0);
                          const slotDate = new Date(actualDayMobile);
                          slotDate.setHours(hour, 0, 0, 0);
                          
                          if (slotDate < tomorrow) {
                            toast.error("Impossible d'ajouter un créneau pour aujourd'hui ou dans le passé. Vous pouvez seulement planifier à partir de demain.");
                            return;
                          }
                          
                          setModalInfo({
                            open: true,
                            slot: {
                              day: isoDate,
                              hourstart: hour,
                              hourend: hour + 1,
                              status: "ferme",
                            },
                            position,
                          });
                        }}
                      />
                    </div>
                  )
              }) : null}
          </div>
        </div>
      </div>

      {/* Affichage de la modale selon le statut du créneau */}
      {/* {modalInfo.open && (modalInfo.slot?.status === 'occupe' || modalInfo.slot?.status === 'attente') && (
                <ModificationPlaning1
                    statut={modalInfo.slot?.status === 'attente'}
                    onClose={() => setModalInfo({ open: false, slot: null })}
                />
            )} */}
      {modalInfo.open && modalInfo.slot && (
        <div
          style={{
            position: !isMobile ? "absolute" : "fixed",
            top: !isMobile ? modalInfo.position?.top : undefined,
            bottom: isMobile ? 0 : undefined,
            left: isMobile ? 0 : modalInfo.position?.left ?? 0,
            zIndex: 1000,
          }}
          className="w-full"
        >
          {isTimeSlot(modalInfo.slot) && modalInfo.slot.status === "ferme" ? (
            <OpenCrenaux
              date={modalInfo.slot.day}
              hour={modalInfo.slot.hourstart}
              onClose={() =>
                setModalInfo({ open: false, slot: null, position: undefined })
              }
            />
          ) : (!isTimeSlot(modalInfo.slot) && (modalInfo.slot as ScheduleSlot)?.appointment?.learner) ? (
            <CrenauxModale
              slot={modalInfo.slot as ScheduleSlot}
              date={modalInfo.slot.date}
              onDetails={() => {
                setIsDetailsModalOpen(true);
                setSelectedSlot(modalInfo.slot as ScheduleSlot);
                console.log(modalInfo.slot);
              }}
              onClose={() =>
                setModalInfo({ open: false, slot: null, position: undefined })
              }
              setIsOpenCancel={()=>{setIsOpenCancel(true); setSelectedSlot(modalInfo.slot as ScheduleSlot)}}
            />
          ) : (
            <CloseCrenaux
              slot={modalInfo.slot as ScheduleSlot}
              onClose={() =>
                setModalInfo({ open: false, slot: null, position: undefined })
              }
              onDelete={() => {
                setIsDeleteModalOpen(true);
                setSelectedSlot(modalInfo.slot as ScheduleSlot);
              }}
            />
          )}
        </div>
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={async () => {
            if (selectedSlot?.id) {
              const dateISO = formatDateToISO(selectedSlot.date);
              const mondayDate = getMonday(new Date(dateISO));
              const mondayISO = formatDateToLocalYYYYMMDD(mondayDate);
              await deleteAvailability(
                token,
                selectedSlot.id,
                dispatch,
                mondayISO,
              );
              setIsDeleteModalOpen(false);
            }
          }}
          title="Fermer le créneau"
          message="Voulez-vous vraiment fermer ce créneau ?"
        />
      )}

      {isDetailsModalOpen && (
        <DetailsCreneau
          availability={selectedSlot as ScheduleSlot}
          onClose={() => {
            setIsDetailsModalOpen(false);
            // setSelectedSlot(null);
            setModalInfo({ open: false, slot: null, position: undefined });
          }}
          setIsOpenCancel={()=>{setIsOpenCancel(true); setSelectedSlot(selectedSlot as ScheduleSlot)}}
        />
      )}
      {isOpenCancel && (
        <CrenauCancel isOpen={isOpenCancel} onClose={()=>{setIsOpenCancel(false)}} date={selectedSlot?.date} id={selectedSlot?.appointment.id} setIsOpenCancel={setIsOpenCancel} />
      )}
    </div>
  );
};

export default ScheduleGrid;

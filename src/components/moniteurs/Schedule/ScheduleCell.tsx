import "../../../styles/schedule.css";
import React from "react";
import { ScheduleSlot } from "@/types/monitor/settings/configuration";
import { imageUrl } from "@/api";

interface TimeSlotProps {
  slot?: ScheduleSlot;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onEmptyClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ScheduleCell = ({ slot, onClick, onEmptyClick }: TimeSlotProps) => {
  if (!slot || !slot.status)
    return (
      <div className="flex h-[100px] flex-shrink-0 items-center justify-center border-[0.5px] border-[#DDDDDD] text-gray-400 md:w-[220px] md:min-w-[220px]">
        <div
          className={`schedule-close h-[80px] w-full cursor-pointer rounded-[8px] p-3`}
          onClick={onEmptyClick}
        >
          <div className="flex h-full w-full items-center justify-center text-[#9E9E9E]">
            Fermé
          </div>
        </div>
      </div>
    );

  return (
    <div
      onClick={onClick}
      className={`flex h-[100px] flex-shrink-0 items-center justify-center border-[0.5px] border-[#DDDDDD] text-sm md:w-[220px] md:min-w-[220px]`}
    >
      {slot.appointment?.learner ? (
        <div
          className={` ${
            slot.appointment?.status === "scheduled"
              ? "bg-[#F4F0FF]"
              : slot.appointment?.status === "cancelled"
                ? "bg-red-200"
                : slot.appointment?.status === "completed"
                  ? "bg-[#e0f7fa]"
                  : "bg-[#dcf1d7]"
          } m-2 h-[80px] w-full rounded-[20px] p-3 ${["completed", "cancelled"].includes(slot.appointment?.status) ? "" : "cursor-pointer"} `}
        >
          <div
            className={`flex items-center border-l-[2.58px] pl-2 ${
              slot.appointment?.status === "scheduled"
                ? "border-[#6C61F6]"
                : slot.appointment?.status === "cancelled"
                  ? "border-red-500"
                  : slot.appointment?.status === "completed"
                    ? "border-[#00bcd4]"
                    : "border-[#30c538]"
            } h-full w-full`}
          >
            <div className="h-[36px] w-[36px] rounded-full bg-gray-500">
              {slot.appointment?.learner.photo ? (
                <img
                  src={imageUrl + slot.appointment?.learner.photo}
                  className="h-full w-full rounded-full"
                  alt=""
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-500">
                  <div className="text-lg font-bold text-white">
                    {(slot.appointment?.learner.firstname || "").charAt(0) +
                      (slot.appointment?.learner.lastname || "").charAt(0)}
                  </div>
                </div>
              )}
            </div>
            <div className="pl-2">
              <div className="font-semibold">
                {slot.appointment?.learner.firstname}{" "}
                {slot.appointment?.learner.lastname}
              </div>
              <div className="text-xs text-[#616161]">
                {slot.start_time}h - {slot.end_time}h
              </div>
              {/* Affichage du status */}
              {slot.appointment?.status && (
                <span
                  className={`ml-2 rounded px-2 py-1 text-xs ${
                    slot.appointment.status === "completed"
                      ? "bg-[#e0f7fa] text-[#00bcd4]"
                      : slot.appointment.status === "cancelled"
                        ? "bg-red-200 text-red-600"
                        : slot.appointment.status === "scheduled"
                          ? "bg-[#F4F0FF] text-[#6C61F6]"
                          : "bg-[#dcf1d7] text-[#30c538]"
                  }`}
                >
                  {slot.appointment.status === "completed"
                    ? "Complété"
                    : slot.appointment.status === "cancelled"
                      ? "Annulé"
                      : slot.appointment.status === "scheduled"
                        ? "Planifié"
                        : slot.appointment.status === "confirmed"
                          ? "Confirmé"
                          : slot.appointment.status}
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        // : slot.status === 'cancelled' ? (
        //     <div className="bg-[#FFD2B8] p-3 m-2 w-full h-[80px] rounded-[20px] cursor-pointer flex flex-col justify-center">
        //         <div className="flex items-center h-full w-full">
        //             <div className="border-l-4 border-[#FF7A00] h-[48px] mr-3 rounded"></div>
        //             <div className="flex flex-col justify-center">
        //                 <div className="flex items-center gap-2">
        //                     <span className="font-bold text-black">{slot.user?.name}</span>
        //                     <span className="text-[#757575]  text-xs">(En attente)</span>
        //                 </div>
        //                 <div className="text-[#757575] text-xs  mt-1">{slot.hourstart.toString().padStart(2, '0')} H - {(slot.hourend).toString().padStart(2, '0')} H</div>
        //             </div>
        //         </div>
        //     </div>
        // )

        <div
          className={`m-2 h-[80px] w-full cursor-pointer rounded-[20px] bg-[#F5F5F5] p-3`}
        >
          <div className="flex h-full w-full flex-col justify-center border-l-[2.58px] border-[#9E9E9E] pl-2">
            <div className="flex w-full items-center font-bold text-black">
              Créneaux libre
            </div>
            <div className="text-xs text-[#616161]">
              {slot.start_time}h - {slot.end_time}h
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleCell;

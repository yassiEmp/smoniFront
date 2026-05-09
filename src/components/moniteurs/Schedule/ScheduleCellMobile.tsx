import '../../../styles/schedule.css'
import React from "react";
import { ScheduleSlot } from "@/types/monitor/settings/configuration";

interface TimeSlotProps {
    slot?: ScheduleSlot,
    hour: any
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    onEmptyClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const ScheduleCellMobile = ({ slot, hour, onClick, onEmptyClick }: TimeSlotProps) => {
    if (!slot|| !slot.status) return (
        <div className="border-[0.5px] border-[#DDDDDD] rounded-[8px] flex justify-center items-center md:flex-grow-0 w-[100%] h-[100px] text-gray-400 flex-shrink-0 relative">
            
            <div className={`p-3 w-full h-[80px] rounded-[8px] schedule-close cursor-pointer`} onClick={onEmptyClick}>
                <div className="flex items-center justify-center h-full w-full text-[#9E9E9E]">Fermé ({hour}h - {hour+1}h)</div>
            </div>
        </div>
    );


    return (
        <div onClick={onClick} className={`border-[0.5px] border-[#DDDDDD] rounded-[8px] flex justify-center items-center md:flex-grow-0 w-[100%] h-[100px] text-sm flex-shrink-0`}>
            
            {slot.appointment?.learner ? (
                <div className={` ${slot.appointment.status=="confirmed" ? 'bg-green-100' : slot.appointment.status=="cancelled" ? 'bg-red-100' : slot.appointment.status=="completed" ? 'bg-[#e0f7fa]' : 'bg-[#F4F0FF]' } p-3 m-2 w-full h-[80px] rounded-[20px] ${["completed","cancelled"].includes(slot.appointment?.status) ? '' : 'cursor-pointer'}`}>
                    <div className="flex items-center pl-2 border-l-[2.58px] border-[#6C61F6] h-full w-full">
                        <div className="w-[36px] h-[36px] rounded-full bg-gray-500  ">
                            {slot.appointment?.learner.photo ? (
                                <img src={slot.appointment?.learner.photo} className="w-full h-full rounded-full" alt="" />
                            ) : (
                                <div className="w-full h-full rounded-full bg-gray-500 flex items-center justify-center">
                                    <div className="text-white text-lg font-bold">
                                        {(slot.appointment?.learner.firstname || '').charAt(0) + (slot.appointment?.learner.lastname || '').charAt(0)}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="pl-2">
                            <div className="font-semibold">{slot.appointment?.learner.firstname} {slot.appointment?.learner.lastname}</div>
                            <div className="text-xs text-[#616161] ">{slot.start_time}h - {slot.end_time}h</div>
                            {/* Affichage du status */}
                            {slot.appointment?.status && (
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
                    </div>
                </div>  
            ) 
            
            // : slot.status === 'attente' ? (
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
            
            : (
                <div className={`bg-[#F5F5F5] p-3 m-2 w-full h-[80px] rounded-[20px] cursor-pointer`}>
                    <div className="flex flex-col justify-center pl-2 border-l-[2.58px] border-[#9E9E9E] h-full w-full">
                        <div className="flex items-center w-full text-black font-bold ">Créneaux libre</div>
                        <div className="text-xs text-[#616161] ">{slot.start_time}h - {slot.end_time}h</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScheduleCellMobile
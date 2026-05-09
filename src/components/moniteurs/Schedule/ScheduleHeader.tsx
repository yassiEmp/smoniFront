import { format } from "date-fns"
import { fr } from "date-fns/locale"

const ScheduleHeader = ({day}:{day?:Date}) => {

    const newFormat = day && format(day,"EEE dd", {locale: fr}).split(' ')

    if (!day) return (
        <div className="border-[0.5px] border-[#EEEEEE] flex justify-center items-center sticky top-0 bg-white z-1 md:min-w-[220px] md:w-[220px] h-[33.33px] text-gray-400 flex-shrink-0 md:flex-grow-0 flex-grow`">

        </div>
    );

    return (
        <div className="border-[0.5px] border-[#EEEEEE] md:flex hidden flex-col justify-center items-center sticky top-0 bg-white z-1 md:min-w-[220px] md:w-[220px] h-[100px] flex-shrink-0">
            <h1 className="uppercase text-[#6C61F6] font-normal">{newFormat && newFormat[0]}</h1>
            <h1 className="text-[#9E9E9E]">{newFormat && newFormat[1]}</h1>
        </div>
    )
}

export default ScheduleHeader
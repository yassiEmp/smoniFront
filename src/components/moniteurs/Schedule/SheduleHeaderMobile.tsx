import { format } from "date-fns"
import { fr } from "date-fns/locale"

const ScheduleHeaderMobile = ({day, actualDay, setActualDay}:{day?:Date, actualDay: Date, setActualDay: ()=>void}) => {

    const newFormat = day && format(day,"EEE dd", {locale: fr}).split(' ')
    const dayToogle = format(actualDay,"EEE dd", {locale: fr}).split(' ');

    if (!day) return (
        <div className="border-[0.5px] border-[#EEEEEE] flex justify-center items-center sticky top-0 bg-white z-1 md:min-w-[220px] md:w-[220px] h-[33.33px] text-gray-400 flex-shrink-0">

        </div>
    );

    return (
        <div onClick={setActualDay} className={` ${newFormat && newFormat[1]==dayToogle[1] ? 'bg-[#6C61F6]/60' : 'bg-white'} border-[0.5px] border-[#EEEEEE] md:hidden flex flex-col justify-center items-center sticky top-0 z-1 h-[70px] sm:min-w-[220px] sm:w-[220px] sm:h-[100px] sm:h-[100px] flex-shrink-0 md:flex-grow-0 flex-grow cursor-pointer rounded-xl`}>
            <h1 className={`${newFormat && newFormat[1]==dayToogle[1] ? 'text-white' : 'text-[#6C61F6]'} uppercase text-[10px] font-normal`}>{newFormat && newFormat[0]}</h1>
            <h1 className={`${newFormat && newFormat[1]==dayToogle[1] ? 'text-white' : 'text-[#9E9E9E]'}`}>{newFormat && newFormat[1]}</h1>
        </div>
    )
}

export default ScheduleHeaderMobile
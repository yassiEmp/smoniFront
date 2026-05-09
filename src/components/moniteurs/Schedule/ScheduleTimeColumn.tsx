
const ScheduleTimeColumn = ({hour}:{hour:number}) => {
    return (
        <div className="h-[100px] min-w-[33.33px] w-[33.33px] lg:min-w-[33.33px] lg:w-[33.33px] flex flex-col justify-between text-[#9E9E9E] text-[12px] ">
            <h2 className="relative bottom-3">{hour<10 ? `0${hour}` : hour} H</h2>
            {hour== 22 ? <h2 className="">{hour+1} H</h2> : null }
        </div>
    )
}

export default ScheduleTimeColumn
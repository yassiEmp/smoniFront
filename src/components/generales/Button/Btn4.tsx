import { ServiceSwitchSubbuttonPropsType } from "@mytypes/general"

const Btn4 = ({item,activeSub,setActiveSub}:ServiceSwitchSubbuttonPropsType) => {
    return (
        <div onClick={()=>setActiveSub(item.id)} className={` ${activeSub==item.id ? 'bg-blue-100 border-primary/50' : 'bg-slate-100 border-slate-400'} border md:w-[200px] px-4 py-4 rounded-lg cursor-pointer transition-transform hover:scale-105 relative overflow-hidden w-[200px] `}>

            {
                activeSub == item.id && (
                    <>
                        <span className=' inline-block absolute -top-6 -left-5 w-14 h-14 rounded-full rotate-12 bg-primary/10'></span>
                        <span className=' inline-block absolute -bottom-8 -right-4 w-14 h-14 rounded-xl rotate-12 bg-primary/10'></span>
                        <span className=' inline-block absolute bottom-8 left-4 w-5 h-5 rounded-full bg-primary/10'></span>
                    </>
                )
            }

            <p className={`${activeSub == item.id ? 'text-primary font-bold' : 'text-slate-500'} text-center text-[18px]`}>{item.text}</p>
        
        </div>
    )
}

export default Btn4
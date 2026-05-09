import { X } from 'lucide-react'
import Calendar from '@assets/dashboard-moniteur/Calendar.png'
import Car from '@assets/dashboard-moniteur/car.png'
import Localisation from '@assets/dashboard-moniteur/Localisation.png'
import { useState } from 'react'

const ValidationModification = () => {

    const [statue, setStatue] = useState(false)

    const handleTest = () => {
        setStatue(true)
    }

    return (
        <div className="border-[#F5F5F5] border-[0.5px] py-[24px] px-[16px] max-w-[371px] flex flex-col gap-[16px] bg-white rounded-[8px]">
            <div className='flex items-start justify-between'>
                <h1 className='max-w-[179px] font-semibold'>Valider la modification</h1>
                <X />
            </div>
            { statue && <div className='space-y-[12px]'>
                <div className='flex items-center gap-2'>
                    <img src={Calendar} alt="" />
                    {/* Date du cours */}
                    <p className='text-[14px]'>Lundi 5 mai 2025</p>
                    <div className='w-1 h-1 bg-black rounded-full'></div>
                    <p className='text-[14px]'><span>09H00</span> - <span>10H00</span></p>
                </div>
                <div className='flex items-center gap-2'>
                    <img src={Car} alt="" />
                    <p className='text-[14px]'>Toyota Camry 2018 – AA-123-AA</p>
                </div>
                <div className='flex items-center gap-2'>
                    <img src={Localisation} alt="" />
                    <p className='text-[14px]'>Mairie de l'île de France</p>
                </div>
            </div>}
            <p className='text-[14px] text-center'>Marquer le créneau comme fermé ?</p>
            <div className=' space-y-[8px]'>
                <button onClick={()=>handleTest()} className='h-[33px] text-[#FDFDFD] text-[12px] font-semibold leading-[140%] bg-[#6C61F6] py-2 w-full rounded-[6.22px] border-[#F5F5F5] border-[0.39px]'>
                    Confirmer
                </button>
                <button className='h-[33px] text-[#463BE2] text-[12px] font-semibold leading-[140%] bg-[#D3C8FE] py-2 w-full rounded-[6.22px] border-[#BCADFC] border-[0.39px]'>
                    Annuler
                </button>
            </div>
        </div>
    )
}

export default ValidationModification
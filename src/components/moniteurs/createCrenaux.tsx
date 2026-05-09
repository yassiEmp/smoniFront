import Pencil from '@assets/dashboard-moniteur/Pencil.png'
import Expand from '@assets/dashboard-moniteur/Expand.png'
import { X } from 'lucide-react'
import Calendar from '@assets/dashboard-moniteur/Calendar.png'
import Car from '@assets/dashboard-moniteur/car.png'
import Localisation from '@assets/dashboard-moniteur/Localisation.png'
import DetailsCreneau from "./DetailsCreneau";
import { useState } from "react";

interface Props {
  statut: boolean; 
  onClose: () => void;
}


const ModificationPlaning2 = ({ statut, onClose }: Props) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div>
            { <div className="border-[#F5F5F5] border-[0.5px] py-[24px] px-[16px] max-w-[471px] flex flex-col gap-[16px] bg-white rounded-[8px]">
                <div className='flex items-start justify-between'>
                    <h1 className='w-3/4 font-semibold'>Modifier ce planning de disponibilité</h1>
                    <div className='flex items-center gap-2'>
                        <img src={Pencil} alt="" />
                        <img src={Expand} alt="" />
                        <X onClick={onClose} />
                    </div>                </div>
                { statut && <div className='space-y-[12px]'>
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
                { statut && <p className='text-[14px] text-center'>Créneau libre</p>}
                { !statut && <p className='text-[14px] text-center'>Indisponible</p>}
                <div className='pt-[16px] space-y-[4px] border-t border-[#E0E0E0]'>
                    <h3 className='font-medium'>Modifier ?</h3>
                    { statut && <button className=' text-[#FDFDFD] text-[12px] font-semibold leading-[140%] bg-[#6C61F6] py-2 w-full rounded-[6.22px] border-[#F5F5F5] border-[0.39px]'>
                        Fermer le créneau
                    </button>}
                    { !statut && <button className=' text-[#FDFDFD] text-[12px] font-semibold leading-[140%] bg-[#6C61F6] py-2 w-full rounded-[6.22px] border-[#F5F5F5] border-[0.39px]'>
                        Marquer comme créneau libre
                    </button>}
                    <button
                        className=' text-[#463BE2] text-[12px] font-semibold leading-[140%] bg-[#D3C8FE] py-2 w-full rounded-[6.22px] border-[#BCADFC] border-[0.39px]'
                        onClick={() => setShowDetails(true)}
                    >
                        Voir plus 
                    </button>
                </div>
            </div>}
            {showDetails && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
                    <div className="w-[400px] h-full bg-white shadow-lg">
                        <DetailsCreneau />
                    </div>
                    <div className="flex-1" onClick={() => setShowDetails(false)} />
                </div>
            )}
        </div>
    )
}

export default ModificationPlaning2
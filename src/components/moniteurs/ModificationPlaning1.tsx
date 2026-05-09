import Pencil from '@assets/dashboard-moniteur/Pencil.png'
import Expand from '@assets/dashboard-moniteur/Expand.png'
import { X } from 'lucide-react'
import Calendar from '@assets/dashboard-moniteur/Calendar.png'
import Localisation from '@assets/dashboard-moniteur/Localisation.png'
import Profil from '@assets/dashboard-moniteur/Compte.png'
import DetailsCreneau from "./DetailsCreneau";
import { useState } from "react";

interface Props {
  statut: boolean; 
  onClose: () => void;
}


const ModificationPlaning1 = ({ statut, onClose }: Props) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div>
            { <div className="border-[#F5F5F5] border-[0.5px] py-[24px] px-[16px] max-w-[371px] flex flex-col gap-[16px] bg-white rounded-[8px]">
                <div className='flex items-start justify-between'>
                    <h1 className='max-w-[179px] font-semibold'>Modifier ce planning de disponibilité</h1>
                    <div className='flex items-center gap-2'>
                        <img src={Pencil} alt="" />
                        <img src={Expand} alt="" />
                        <X onClick={onClose} />
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <img src={Calendar} alt="" />
                    {/* Date du cours */}
                    <p className='text-[14px]'>Lundi 5 mai 2025</p>
                    <div className='w-1 h-1 bg-black rounded-full'></div>
                    <p className='text-[14px]'><span>09H00</span> - <span>10H00</span></p>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        <img src={Profil} alt="" />
                        <div className='space-y-1'>
                            <h2 className='text-[12px] font-semibold'>Lina A.</h2>
                            { !statut && <div className='text-[12px] font-medium flex items-center gap-1  bg-[#FDCCCC] border-[#F75555] border-[0.5px] rounded-[4px] py-1 px-2'>
                                Débutant
                                <div className='w-1 h-1 bg-[#F75555] rounded-full'></div>
                            </div>}
                            { statut && <div className='text-[12px] font-medium flex items-center gap-1 bg-[#F5F5F5] border-[#9E9E9E] border-[0.5px] rounded-[4px] py-1 px-2'>
                                Nouveau
                                <div className='w-1 h-1 bg-[#9E9E9E] rounded-full'></div>
                            </div>}
                        </div>
                    </div>
                    { !statut && <p className='text-[14px]'>Créneau déjà bouclé</p>}
                    { statut && <p className='text-[14px]'>Demande de rdv</p>}
                </div>
                <div className='flex items-center gap-2'>
                    <img src={Localisation} alt="" />
                    <p className='text-[10px]'>Mairie de l'île de France – 10 rue Alexandre Dumas 75011 Paris</p>
                </div>
                <div className='pt-[16px] space-y-[4px] border-t border-[#E0E0E0]'>
                    <h3>Prêt ?</h3>
                    <div className='flex gap-2'>
                        { !statut && <button className=' text-[#FDFDFD] text-[12px] font-semibold leading-[140%] bg-[#6C61F6] py-2 w-1/3 rounded-[6.22px] border-[#F5F5F5] border-[0.39px]'>
                            Noter l'apprenant
                        </button>}
                        { statut && <button className='text-[#FDFDFD] text-[12px] font-semibold leading-[140%] bg-[#6C61F6] py-2 w-1/3 rounded-[6.22px] border-[#F5F5F5] border-[0.39px]'>
                            Accepter le rdv 
                        </button>}
                        <button
                            className=' text-[#463BE2] text-[12px] font-semibold leading-[140%] bg-[#D3C8FE] py-2 w-1/3 rounded-[6.22px] border-[#BCADFC] border-[0.39px]'
                            onClick={() => setShowDetails(true)}
                        >
                            Voir plus 
                        </button>
                        { !statut && <button className=' text-[#757575] text-[12px] font-semibold leading-[140%] bg-[#EEEEEE] py-2 w-1/3 rounded-[6.22px] border-[#F5F5F5] border-[0.39px]'>
                            Annuler le rdv
                        </button>}
                        { statut && <button className=' text-[#757575] text-[12px] font-semibold leading-[140%] bg-[#EEEEEE] py-2 w-1/3 rounded-[6.22px] border-[#F5F5F5] border-[0.39px]'>
                            Refuser le rdv
                        </button>}
                    </div>
                </div>
            </div>}
            {showDetails && (
                <div className="fixed inset-0 z-[1000000] flex bg-black/40 w-[100vw]">
                    <div className=" h-full bg-white shadow-lg">
                        <DetailsCreneau />
                    </div>
                    <div className="flex-1" onClick={() => setShowDetails(false)} />
                </div>
            )}
        </div>
    )
}

export default ModificationPlaning1

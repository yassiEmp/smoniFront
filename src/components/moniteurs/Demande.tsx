import Profil from '@assets/dashboard-moniteur/Compte.png'
import Tel from '@assets/dashboard-moniteur/Tel.png'
import Localisation from '@assets/dashboard-moniteur/Localisation.png'
import Valide from '@assets/dashboard-moniteur/Valide.png'

const Demande = () => {

    return (
        <div className='space-y-[24px] p-4 min-w-[388px] bg-white rounded-[12px]'>
            <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                    <img src={Profil} alt="" />
                    <div className='space-y-[4px]'>
                        <h1 className='text-[14px] font-semibold leading-[140%)'>Lina Aghali</h1>
                        <div className='flex items-center gap-2'>
                            <img src={Tel} alt="" />
                            <p className='text-[12px] text-[#616161]'>07 43 20 75 87</p>
                        </div>
                    </div>
                </div>
                <button className='text-[#757575] text-[12px] font-semibold bg-[#F5F5F5] flex items-center gap-1 px-[20px] py-[16px] rounded-[6.22px]'>
                    Valider le rdv
                    <img src={Valide} alt="" />
                </button>
            </div>
            <div className='flex justify-between'>
                <div className='space-y-[4px]'>
                        <h2 className='text-[14px] font-semibold leading-[140%)'>Jeudi 8 mai 2025</h2>
                        <div className='flex items-center gap-2'>
                            <p className='text-[12px] text-[#616161]'>9h00 à 10h00</p>
                        </div>
                    </div>
                <div className='flex items-center gap-2'>
                    <img src={Localisation} alt="" />
                    <p className='text-[12px] max-w-[200px]'>Mairie de l'île de France – 10 rue Alexandre Dumas 75011 Paris</p>
                </div>
            </div>
                <button className='w-full bg-[#EEEEEE] py-[16px] px-[20px] rounded-[6.22px] border-[#F5F5F5] text-[12px] font-semibold text-[#757575]'>
                    Voir le profil
                </button>
        </div>
    )
}

export default Demande
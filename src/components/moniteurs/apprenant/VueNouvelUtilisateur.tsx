import Ilustration from '@assets/dashboard-moniteur/Creation-Planing.png'
import { Link } from 'react-router-dom'

const VueNouvelUtilisateur = ({ contenue }: { contenue: string }) => {
  return (
    <div className="bg-[#F5F5F5]">
      <div className='flex justify-center'>
        <div className="flex flex-col items-center justify-center text-center pt-[50px] max-w-[565px]">
          <img src={Ilustration} alt="" />
          <p className="text-[18px] text-center font-medium max-w-[565px]">{contenue}</p>
          <Link
            to="/monitor/planning"
            className='text-md text-[#FDFDFD] font-semibold leading-[140%] bg-[#6C61F6] rounded-full px-10 py-4 mt-6'>
            Voir mon planning
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VueNouvelUtilisateur
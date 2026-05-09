import { NavLink } from 'react-router-dom';
import Paiement from '@assets/dashboard-moniteur/payement.svg'
import Setting from '@assets/dashboard-moniteur/Setting.svg'
import Assistant from '@assets/dashboard-moniteur/assistant.svg'
import Apprenant from '@assets/dashboard-moniteur/apprenants.svg'
import RendezVous from '@assets/dashboard-moniteur/rendezvous.svg'
import { MdDashboard, } from 'react-icons/md'
import { FiCalendar, } from 'react-icons/fi'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStudents } from "@/api/students";
import { imageUrl } from "@/api";
import { RootState } from "@/store/configureStore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '@/utils/auth';
import Examen from '@assets/dashboard-admin/examen.svg'

const SideBar = () => {
  const NavItem = [
    {
      name: 'Dashboard',
      path: '/monitor/dashboard',
      icon: MdDashboard,
    },

    {
      name: 'Planning',
      path: '/monitor/planning',
      icon: FiCalendar,
    },
    {
      name: 'Paiement',
      path: '/monitor/paiement',
      icon: Paiement,
    },
    {
      name: 'Apprenants',
      path: '/monitor/apprenants',
      icon: Apprenant,
    },
    {
      name: 'Rendez-vous',
      path: '/monitor/rendez-vous',
      icon: RendezVous,
    },
    {
      name: 'Examens',
      path: '/monitor/examen',
      icon: Examen,
    },
    {
      name: 'Assistance',
      path: '/monitor/assistance',
      icon: Assistant,
    },
    {
      name: 'Paramètres',
      path: '/monitor/parametres',
      icon: Setting,
    }
  ]

  interface Learner {
    id: number;
    email: string;
    phone: string;
    firstname: string;
    lastname: string;
    photo?: string;
  }

  interface Student {
    learner: Learner;
  }

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state: RootState) => state.authReducer.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const data = await getStudents(token);
        setStudents(data);
      } catch {
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className='max-w-[255px] h-[100vh] pt-[10vh] fixed z-10 bg-white border-r border-[#BDBDBD] flex flex-col'>
      {/* Scrollable content */}
      <div className='h-[80vh] scrollbar-hide overflow-y-auto'>
        <nav className='flex flex-col my-2 space-y-[16px] px-[32px]'>
          {NavItem.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-[10px] py-[8px] ${isActive ? 'font-bold text-primary' : 'text-[#424242]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {typeof item.icon === "string" ? (
                    <img
                      src={item.icon}
                      alt={`${item.name} icon`}
                      className={`w-5 h-5 ${isActive
                          ? 'filter-primary'
                          : 'filter-none'
                        }`}
                    />
                  ) : (
                    <item.icon
                      className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-[#424242]'}`}
                    />
                  )}
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Recent students section */}
        <div className='px-[32px] space-y-[8px] mb-4 mt-4'>
          <h1 className='text-[#616161] text-[12px] font-semibold'>
            Vos 10 derniers apprenants
          </h1>
          <div className='space-y-[4px]'>
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white py-[12px] pr-[8px] w-[211px]"
                >
                  <div className="flex items-center space-x-2">
                    <Skeleton circle width={32} height={32} />
                    <div>
                      <Skeleton width={80} height={12} style={{ marginBottom: 4 }} />
                    </div>
                  </div>
                </div>
              ))
            ) : students.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-2 bg-white rounded-[8px]">
                <svg width="36" height="36" fill="none" className="mb-2 opacity-60">
                  <circle cx="18" cy="18" r="18" fill="#E0E0E0" />
                  <path d="M18 21c-3.314 0-6 1.343-6 3v1h12v-1c0-1.657-2.686-3-6-3Z" fill="#BDBDBD" />
                  <path d="M18 19a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="#BDBDBD" />
                </svg>
                <span className="text-sm text-[#616161] text-center font-medium">
                  Aucun apprenant récent.<br />Vous n'avez pas encore de nouveaux élèves.
                </span>
              </div>
            ) : (
              students.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white py-[12px] pr-[8px] w-[211px]"
                >
                  <div className="flex items-center space-x-2">
                    {item.learner.photo ? (
                      <img
                        src={`${imageUrl}${item.learner.photo}`}
                        alt={`${item.learner.firstname} ${item.learner.lastname}`}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-md font-semibold text-white">
                        {`${item.learner.lastname?.charAt(0) ?? ''}${item.learner.firstname?.charAt(0) ?? ''}`}
                      </div>
                    )}
                    <div>
                      <h1 className="text-xs font-medium">
                        {item.learner.firstname} {item.learner.lastname}
                      </h1>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Ici Logout button  */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => handleLogout(dispatch, navigate)}
          className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>


    </div>
  )
}

export default SideBar
import Logo from '@assets/dashboard-moniteur/Logo.png'
import { Settings, LogOut, ChevronDown, Bell } from 'lucide-react'
import Dashboard from '@assets/dashboard-moniteur/DashboardIcon.png'
import Planing from '@assets/dashboard-moniteur/Planing.png'
import Paiement from '@assets/dashboard-moniteur/Paiements.png'
import Apprenant from '@assets/dashboard-moniteur/Apprenants.png'
import Assistance from '@assets/dashboard-moniteur/assistansce.png'
import Setting from '@assets/dashboard-moniteur/Setting.png'
import RendezVous from '@assets/dashboard-moniteur/rendezvous.svg'
import { useState, useEffect, useRef } from 'react'
import { Squash as Hamburger } from 'hamburger-react'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/configureStore'
import { imageUrl } from '@/api'
import { handleLogout } from '@/utils/auth'
import NotificationModal  from '@/components/learners/NavBar/NotificationModalMonitor';
import NotificationBadge from '@/components/learners/NavBar/NotificationBadge';
import {fetchNotifications} from "@/api/learner/notifications";

const NavbarMobile = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
   const { token, user } = useSelector((state: RootState) => state.authReducer);
      const [showModal, setShowModal] = useState(false);
      const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate()
 
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
        setShowDropdown(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false)
  }

   const toggleNotifications = () => {
          setShowModal((prev) => !prev);
        };
      
        useEffect(() => {
          if (token) {
            fetchNotifications(token, "all")
              .then((res) => {
                setUnreadCount(res.data.data.filter(n => !n.read_at).length);
              })
              .catch(console.error);
          }
        }, [token]);

  return (
    <div>
      <div className='fixed top-0 left-0 right-0 z-50 bg-white flex justify-between items-center px-5 pt-6 pb-4 shadow-sm'>
        <Link to="/monitor/dashboard" onClick={handleLinkClick}>
          <img src={Logo} alt="" />
        </Link>
        <div className='flex items-center space-x-3'>
                <div className="relative">
                      <button 
                        onClick={toggleNotifications}
                        className="p-2 rounded-full bg-[#E0E0E0] hover:bg-gray-100 transition-colors duration-200"
                        aria-label="Notifications"
                      >
                        <Bell size={20} className="text-gray-600" />
                      </button>
                      <NotificationBadge count={unreadCount} />
                      {showModal && (
                        <NotificationModal 
                          onClose={() => setShowModal(false)} 
                          onNotificationRead={() => setUnreadCount(prev => Math.max(0, prev - 1))}
                          onNotificationsUpdate={(count) => setUnreadCount(count)}
                        />
                      )}
                    </div>

          <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
            <Hamburger
              toggled={isOpen}
              toggle={setIsOpen}
              size={24}
              color="#212121"
            />
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div className={`fixed w-full top-[72px] z-40 bg-white transition-all duration-300 ease-in-out transform rounded-b-xl ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
       <div className="md:max-h-[calc(100vh-120px)] h-[70vh] overflow-y-auto">
        <nav className='flex flex-col space-y-[16px] px-[32px] py-[24px]'>
          <Link to="/monitor/dashboard" onClick={handleLinkClick} className='flex items-center gap-[10px] py-[8px] pl-[12px] pr-[16px]'>
            <img src={Dashboard} alt="" />
            Dashboard
          </Link>
          <Link to="/monitor/planning" onClick={handleLinkClick} className='flex items-center gap-[10px] py-[8px] pl-[12px] pr-[16px]'>
            <img src={Planing} alt="" />
            Planning
          </Link>
          <Link to="/monitor/paiement" onClick={handleLinkClick} className='flex items-center gap-[10px] py-[8px] pl-[12px] pr-[16px]'>
            <img src={Paiement} alt="" />
            Paiement
          </Link>
          <Link to="/monitor/apprenants" onClick={handleLinkClick} className='flex items-center gap-[10px] py-[8px] pl-[12px] pr-[16px]'>
            <img src={Apprenant} alt="" />
            Apprenant
          </Link>
          <Link to="/monitor/rendez-vous" onClick={handleLinkClick} className='flex items-center gap-[10px] py-[8px] pl-[12px] pr-[16px]'>
            <img src={RendezVous} alt="" />
            Rendez-vous
          </Link>
          <Link to="/monitor/assistance" onClick={handleLinkClick} className='flex items-center gap-[10px] py-[8px] pl-[12px] pr-[16px]'>
            <img src={Assistance} alt="" />
            Assistance
          </Link>
          <Link to="/monitor/parametres" onClick={handleLinkClick} className='flex items-center gap-[10px] py-[8px] pl-[12px] pr-[16px]'>
            <img src={Setting} alt="" />
            Paramètres
          </Link>
        </nav>

        <div className='flex items-center w-full space-x-[4px] py-4 pl-[32px] relative' ref={dropdownRef}>
          <div
            className="flex items-center space-x-[4px] cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {user.photo ? (
              <img
                src={`${imageUrl}${user.photo}`}
                alt={`${user.firstname} ${user.lastname}`}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-lg font-semibold text-white">
                {`${user.lastname?.charAt(0) ?? ''}${user.firstname?.charAt(0) ?? ''}`}
              </div>
            )}
            <span>
              {user.firstname} {user.lastname}
            </span>
            <ChevronDown className={`w-5 h-5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </div>

          {/* Dropdown Menu juste en bas du profil */}
          {showDropdown && (
            <div className="absolute left-[32px] top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-10">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  setIsOpen(false);
                  navigate("/monitor/parametres");
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
              >
                <Settings className="w-4 h-4" />
                Paramètres
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  setIsOpen(false);
                  handleLogout(dispatch, navigate);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarMobile

import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, Settings, ChevronDown, LogOut, Home } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/configureStore";
import { handleLogout } from "@/utils/auth";
import { imageUrl } from "@/api";
import smoni_logo from "@assets/authentification/smoni-logo.svg";

import dashboardLog from "@assets/navbar/dashboard.png";
import codeLog from "@assets/navbar/code.png";
import conduiteLog from "@assets/navbar/conduite.png"; 
import examensLog from "@assets/navbar/examens.png";
import boutiqueLog from "@assets/navbar/boutique.png";   

import dashboardactif from "@assets/navbar/dashboardactif.png"; 
import codeactif from "@assets/navbar/codeactif.png"; 
import conduiteactif from "@assets/navbar/conduiteactif.png"; 
import examensactif from "@assets/navbar/examensactif.png";
import boutiqueactif from "@assets/navbar/boutiqueactif.png";   


import NavLink from './NavLink';
import NavbarMobile from './NavbarMoible';

import NotificationModal  from './NotificationModalLearner';
import NotificationBadge from './NotificationBadge';
// import { Link } from 'react-router-dom';
import {fetchNotifications} from "@/api/learner/notifications";

const Navbar  = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user,token } = useSelector((state: RootState) => state.authReducer);
  const [showModal, setShowModal] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();

  // Fermeture du dropdown au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  
  const navItems = [
    { label: 'Dashboard', to: '/learners/dashboard', icon: (active: boolean) => active ? dashboardactif : dashboardLog  },
    { label: 'Code', to: '/learners/code',icon: (active: boolean) => active ? codeactif : codeLog },
    { label: 'Conduite', to: '/learners/conduite', icon: (active: boolean) => active ? conduiteactif : conduiteLog },
    { label: 'Examens', to: '/learners/examens',icon: (active: boolean) => active ? examensactif : examensLog },
    { label: 'Quiz', to: '/quiz',icon: (active: boolean) => active ? examensactif : examensLog }, // Using same icon as Examens for now
    { label: 'Boutique', to: '/learners/boutique',icon: (active: boolean) => active ? boutiqueactif : boutiqueLog}
  ].map((item) => ({
    ...item,
    active: location.pathname === item.to || (item.to === '/quiz' && (location.pathname.startsWith('/quiz') || location.pathname.startsWith('/learners/quiz'))),
  }));

    const navItemsWithResolvedIcons = navItems.map((item) => ({
    ...item,
    icon: item.icon(item.active),
  }));

  return ( 
    <nav className="fixed w-full bg-white border-b border-gray-100 px-4 md:px-6 py-3 shadow-sm z-50">
      <div className="max-w-[1800px] mx-auto w-full px-4">
        <div className="flex justify-between items-center">
         
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <img 
            src={smoni_logo}
            alt="Logo" 
            className='h-7'
            />
          </div>
          
        
          <div className="hidden lg:flex items-center space-x-3">
            {navItems.map((item) => (
              <NavLink 
                key={item.label}
                to={item.to}
                active={item.active}
              >
                <div className="flex items-center gap-2 font-semibold ">
                  <img src={item.icon(item.active)} alt={item.label} className='w-3 h-3'/>
                  {item.label}
                </div>
              </NavLink>
            ))}
          </div>
        
          <div className="flex items-center space-x-2 lg:space-x-4">
          { /* Notifications button */ }
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
            
            {/* User Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="flex items-center gap-3 border-l pl-4">
                  {user?.photo ? (
                    <img
                      src={`${imageUrl}${user.photo}`}
                      alt={`${user.firstname} ${user.lastname}`}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {user?.firstname?.[0]}
                      </span>
                    </div>
                  )}
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium">{`${user?.firstname} ${user?.lastname}`}</p>
                    <p className="text-xs text-gray-500">Apprenant(e)</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100">
                   <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/");
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                  >
                    <Home className="w-4 h-4" />
                    Voir le site
                  </button>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/learners/parametres");
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                  >
                    <Settings className="w-4 h-4" />
                    Paramètres
                  </button>
                  <button
                    onClick={() => handleLogout(dispatch, navigate)}
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
      <NavbarMobile navItems={navItemsWithResolvedIcons} />
    </nav>
  );
};

export default Navbar;
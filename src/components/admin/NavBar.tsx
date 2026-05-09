import { RootState } from "@/store/configureStore";
import {  LogOut, Settings, ChevronDown, Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { imageUrl } from "@/api";
import smoni_logo from "@assets/authentification/smoni-logo.svg";
import { useNavigate } from "react-router";

import { handleLogout } from "@/utils/auth";
import { useState, useRef, useEffect } from "react";

import NotificationModal  from '@/components/learners/NavBar/NotificationModalAdmin';
import NotificationBadge from '@/components/learners/NavBar/NotificationBadge';
import {fetchNotifications} from "@/api/learner/notifications";


const NavBar = () => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
   const { user,token } = useSelector((state: RootState) => state.authReducer);
   const [showModal, setShowModal] = useState(false);
   const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

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



  return (
    <div className="fixed z-10 flex h-[10vh] w-full justify-between border-b border-[#BDBDBD] bg-white">
      <div className="flex items-center pl-8">
        <img src={smoni_logo} alt="Logo" className="h-7" />
      </div>
      <div className="flex items-center justify-end space-x-[16px] pr-6">
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
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center space-x-[4px] border-l border-[#BDBDBD] pl-[16px] cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {/* {user.photo ? (
              <img
                src={`${imageUrl}${user.photo}`}
                alt={`${user.firstname} ${user.lastname}`}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <img
                src={Prof}
                alt={Prof}
                className="h-10 w-10 rounded-full object-cover"
              />
            )} */}
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
            <span className="flex">
              {user.firstname} {user.lastname}
            </span>
            <ChevronDown className={`w-5 h-5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute z-50 right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  if (user?.role === "admin") {
                    navigate("/admin/parametres");
                  } else {
                    navigate("/monitor/parametres");
                  }
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
  );
};

export default NavBar;

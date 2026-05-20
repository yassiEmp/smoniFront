import React from 'react';
import { Link } from 'react-router';

interface NavItem {
  label: string;
  to: string;
  icon: string;
  active?: boolean;
}

interface NavbarMobileProps {
  navItems: NavItem[];
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({ navItems }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 shadow-inner lg:hidden">
      <div className="flex justify-around items-center px-2 py-3">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`flex flex-col items-center text-xs font-medium ${
              item.active ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-500'
            }`}
          >
            <img src={item.icon} alt={item.label} className="w-5 h-5 mb-1" />
          
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavbarMobile;

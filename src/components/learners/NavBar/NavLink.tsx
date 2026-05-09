import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink : React.FC<NavLinkProps> = ({ to, children }) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
          isActive
            ? 'text-indigo-600 bg-indigo-50'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`
      }
    >
      {children}
    </RouterNavLink>
  );
};

export default NavLink;
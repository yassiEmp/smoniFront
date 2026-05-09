import React from 'react';

interface NotificationBadgeProps {
  count: number; 
}

const NotificationBadge:React.FC<NotificationBadgeProps> = ({ count }) => {
  if (count <= 0) return null;
  
  return (
    <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold animate-pulse">
      {count > 99 ? '99+' : count}
    </span>
  );
};

export default NotificationBadge;
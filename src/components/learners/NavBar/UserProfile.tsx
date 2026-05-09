import React from 'react';
import userimage from "@assets/navbar/UserImage/lina.png";



interface UserProfileProps {
  name: string; 
  role: string;
  src : string;
}

const UserProfile :React.FC<UserProfileProps>= ({ name, role}) => {
  return (
    <div className="flex items-center">
      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-indigo-100">
        <img 
          src={userimage} 
          alt={`${name}'s profile`}
          className="h-full w-full object-cover"
          
        />
      </div>
      <div className="hidden md:block mr-3 text-right">
        <div className="text-[10px] font-semibold text-gray-900">{name}</div>
        <div className="text-[10px] text-gray-500">{role}</div>
      </div>
     
    </div>
  );
};

export default UserProfile;
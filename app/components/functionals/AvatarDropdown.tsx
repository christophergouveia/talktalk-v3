import React from 'react';
import { VscSymbolColor } from 'react-icons/vsc';

interface AvatarDropdownProps {
  children: React.ReactNode;
  openModal: (open: boolean) => void;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ children, openModal }) => {
  return (
    <div tabIndex={0} role="button" className="group flex items-center justify-center relative cursor-pointer after:transition-all after:opacity-0 hover:after:opacity-100 after:absolute after:rounded-full after:w-full after:h-full after:r-0 after:bg-black/[.6] focus:outline-none focus:rounded-full focus:ring-2 focus:ring-primary focus:after:opacity-100" onClick={() => openModal(true)} onKeyDown={(e) => {
      if (e.key === 'Enter') {
        openModal(true);
      }
    }}>
      
      {children}
      <VscSymbolColor className="transition-all absolute ease-in-out duration-300 opacity-0 group-focus:opacity-100 group-focus:scale-125 group-hover:opacity-100 group-hover:scale-125 transform z-10 text-2xl" />
    </div>
  );
};

export default AvatarDropdown;

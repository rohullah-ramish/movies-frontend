import React from "react";

type OverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Overlay: React.FC<OverlayProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div className="absolute inset-0 backdrop-blur-md"></div> 
      <div
        className="absolute bg-accent rounded-lg shadow-lg top-[120px] w-10/12 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Overlay;

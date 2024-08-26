import React from "react";

type OverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Overlay: React.FC<OverlayProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50" onClick={onClose}>
      <div className="relative backdrop-blur w-screen h-screen px-6">
        <div
          className="absolute bg-accent rounded-lg top-12 left-[50%] translate-x-[-50%] w-full max-w-[400px] h-8"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Overlay;

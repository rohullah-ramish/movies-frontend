import React from 'react';

type OverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Overlay: React.FC<OverlayProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="bg-black bg-opacity-50 back-drop-blur fixed flex h-full inset-0 items-center justify-center px-6 w-full z-50"
      onClick={onClose}
    >
      <div
        className="bg-accent w-10/12 rounded-lg shadow-lg absolute top-[100px] "
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Overlay;
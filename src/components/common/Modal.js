import React, { useCallback } from "react";

const Modal = ({ show, onClose, title, children }) => {
  const handleClickClose = useCallback(() => {
    onClose(false);
  }, [onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#090909] bg-opacity-50 z-10">
      <div className="bg-[#191919] rounded-lg shadow-xl w-full">
        <div className="flex justify-center items-center bg-[#191919] p-4 rounded-t-lg relative">
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <button
            onClick={handleClickClose}
            className="text-gray-500 hover:text-gray-700 absolute right-4 text-3xl"
          >
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

import React, { useCallback } from "react";

const Modal = ({ show, onClose, title, children }) => {
  const handleClickClose = useCallback(() => onClose(false), [onClose]);

  const handleClickBlur = useCallback(() => onClose(false), [onClose]);

  const handleClickBody = useCallback((e) => e.stopPropagation(), []);

  return (
    show && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-[#040404] bg-opacity-50 z-10"
        onClick={handleClickBlur}
      >
        <div
          className="bg-[#262626] rounded-lg shadow-xl w-full"
          onClick={handleClickBody}
        >
          <div className="flex justify-center items-center bg-[#262626] p-4 rounded-t-lg relative">
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
    )
  );
};

export default Modal;

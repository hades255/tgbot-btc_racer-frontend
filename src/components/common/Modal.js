import React, { useCallback } from "react";

const Modal = ({ show, onClose, title, children, className }) => {
  const handleClickClose = useCallback(() => onClose(false), [onClose]);

  const handleClickBlur = useCallback(() => onClose(false), [onClose]);

  const handleClickBody = useCallback((e) => e.stopPropagation(), []);

  return (
    show && (
      <div
        className={`fixed inset-0 flex justify-center bg-[#000000] bg-opacity-80 z-10 ${className}`}
        onClick={handleClickBlur}
      >
        <div
          className={`bg-[#08101F] rounded-lg shadow-xl w-full ${
            show ? "animate-slideUp" : "animate-slideDown"
          }`}
          onClick={handleClickBody}
        >
          <div className="flex justify-center items-center bg-[#08101F] p-4 rounded-t-lg relative">
            <div className="text-md font-medium text-white text-center">{title}</div>
            <button
              onClick={handleClickClose}
              className="absolute text-gray-500 hover:text-gray-700 right-4 top-2 text-3xl"
            >
              &times;
            </button>
          </div>
          <div className="px-4">{children}</div>
        </div>
      </div>
    )
  );
};

export default Modal;

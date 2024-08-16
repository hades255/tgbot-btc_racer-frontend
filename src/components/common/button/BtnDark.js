import React from "react";

const BtnDark = ({ children, onClick, disabled = false }) => {
  return (
    <div className="w-full bg-button-1-bg h-[50px] rounded-[25px] flex justify-center items-center relative">
      <button
        className={`bg-button-2 text-md font-medium w-[calc(100%-2px)] h-[48px] rounded-[25px] ${
          disabled ? "text-[#9E9E9E]" : "text-white"
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};

export default BtnDark;

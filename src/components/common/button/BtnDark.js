import React from "react";

const BtnDark = ({ children, onClick }) => {
  return (
    <div className="w-full bg-button-1-bg h-[50px] rounded-[25px] flex justify-center items-center relative">
      <button
        className="bg-button-2 text-white text-md font-medium w-[calc(100%-2px)] h-[48px] rounded-[25px]"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default BtnDark;

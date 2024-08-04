import React from "react";

const BtnLight = ({ children, onClick }) => {
  return (
    <div className="w-full bg-button-1-bg h-[50px] rounded-[25px] flex justify-center items-center relative">
      <button
        className="flex justify-between items-center bg-button-1 text-white text-md font-medium w-[calc(100%-2px)] h-[48px] rounded-[25px] p-4"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default BtnLight;

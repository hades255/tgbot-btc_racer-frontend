import React, { useCallback } from "react";

const BetButton = ({ title, icon, onClick, active, color }) => {
  const handleClickMoon = useCallback(() => onClick(), [onClick]);

  return (
    <div className="w-full relative">
      <div
        className={`w-full h-12 bg-${color}-800 border-4 border-white absolute rounded-2xl top-3`}
      ></div>
      <div className="w-full px-1">
        <button
          className={`w-full h-12 bg-${color}-400 rounded-xl hover:bg-${color}-500 transform active:translate-y-1 active:shadow-none transition-transform duration-150`}
          onClick={handleClickMoon}
          disabled={!active}
        >
          <div
            className={`flex justify-center text-xl font-bold ${
              active ? "text-white" : "text-stone-500"
            }`}
          >
            {title}
            <div className="ml-1 mt-2">{icon}</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default BetButton;

import React from "react";

const FuelSlider = ({ progress }) => {
  return (
    <div className="mx-1 w-[108px] h-[8px] rounded bg-white relative">
      <div
        className={`h-[8px] rounded bg-gradient-to-r from-[#36F2DA] to-[#705BFF] absolute top-0 left-0`}
        style={{ width: `${Math.round(108 * progress)}px` }}
      />
    </div>
  );
};

export default FuelSlider;

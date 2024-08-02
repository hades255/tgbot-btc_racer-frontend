import React from "react";

const FuelSlider = ({ progress }) => {
  return (
    <div className="mx-1 w-40 h-2 rounded bg-white relative">
      <div
        className={`h-2 rounded bg-gradient-to-r from-[#36F2DA] to-[#705BFF] absolute top-0 left-0`}
        style={{ width: `${Math.round(160 * progress)}px` }}
      />
    </div>
  );
};

export default FuelSlider;

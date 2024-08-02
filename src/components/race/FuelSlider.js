import React from "react";

const FuelSlider = ({ fuel }) => {
  return (
    <div className="mx-1 w-40 h-2 rounded bg-white relative">
      <div
        className={`h-2 rounded bg-gradient-to-r from-[#36F2DA] to-[#705BFF] absolute top-0 left-0`}
        style={{ width: `${fuel * 4 * 4}px` }}
      />
    </div>
  );
};

export default FuelSlider;

import React from "react";

const FuelSlider = ({ fuel }) => {
  return (
    <div className="mx-1 w-40 h-2 rounded bg-white relative">
      <div
        className={`${fuel} h-2 rounded bg-button-1 absolute top-0 left-0`}
      />
    </div>
  );
};

export default FuelSlider;

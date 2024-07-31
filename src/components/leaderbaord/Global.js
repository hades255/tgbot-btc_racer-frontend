import React from "react";

const Global = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <span className="text-stone-500 text-sm">1 racers</span>
        <span className="text-stone-500 text-sm">Total pts earned</span>
      </div>
      <div className="text-white my-4">my score, and friends score</div>
      <div className="text-stone-500 text-sm my-4">
        1-100 players
      </div>
    </div>
  );
};

export default Global;

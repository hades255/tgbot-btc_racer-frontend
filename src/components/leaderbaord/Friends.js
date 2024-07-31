import React from "react";
import CopyIcon from "../../assets/icons/Copy";

const Friends = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <span className="text-stone-500 text-sm">1 racers</span>
        <span className="text-stone-500 text-sm">Total pts earned</span>
      </div>
      <div className="text-white my-4">my score, and friends score</div>
      <div className="text-stone-500 text-sm my-4">
        You have yet to invite your friends. Invite them now to see their
        rankings here and race together!
      </div>
      <div className="flex justify-center">
        <button className="bg-white text-black text-lg font-medium w-2/3 h-[50px] rounded-[25px]">
          Invite via contacts
        </button>
        <button className="bg-white text-black text-lg font-medium h-[50px] w-[50px] rounded-[25px] ml-4 flex justify-center items-center">
          <CopyIcon width={18} height={18} color={"#000"} />
        </button>
      </div>
    </div>
  );
};

export default Friends;

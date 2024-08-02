import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import CopyIcon from "../../assets/icons/Copy";
import ArrowIcon from "../../assets/icons/Arrow";

const Friends = () => {
  const { name, point } = useAuth();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <span className="text-slate-500 text-xs">1 racers</span>
        <span className="text-slate-500 text-xs">Total pts earned</span>
      </div>
      <div className="flex flex-col">
        <div className="my-2 flex justify-between">
          <div className="flex">
            <div className="w-14">🥇</div>
            <div className="text-sm backdrop-blur-lg text-white">{name}</div>
          </div>
          <div className="flex">
            <span className="text-sm backdrop-blur-lg text-slate-400">
              🚀 {point} pts
            </span>
          </div>
        </div>
      </div>
      <div className="text-slate-500 text-sm my-4">
        You have yet to invite your friends. Invite them now to see their
        rankings here and race together!
      </div>
      <div className="mt-28 flex justify-start px-4">
        <div className="w-full bg-button-1-bg h-[50px] rounded-[25px] flex justify-between items-center relative">
          <button className="w-[calc(100%-2px)] p-4 bg-button-1 h-[48px] rounded-[25px] flex justify-between items-center">
            <span className="ml-2 text-white text-md font-medium">
              Invite friends
            </span>
            <ArrowIcon />
          </button>
        </div>
        <button className="bg-white text-black text-lg font-medium h-[50px] min-w-[50px] w-[50px] rounded-[25px] ml-4 flex justify-center items-center">
          <CopyIcon width={18} height={18} color={"#000"} />
        </button>
      </div>
    </div>
  );
};

export default Friends;

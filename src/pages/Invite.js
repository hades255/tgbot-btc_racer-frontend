import React from "react";
import DotIcon from "../assets/icons/Dot";
import CopyIcon from "../assets/icons/Copy";
// import ButtonIcon from "../assets/icons/InviteButton";
import ArrowIcon from "../assets/icons/Arrow";

const Invite = () => {
  return (
    <div className="w-full flex flex-col mb-24">
      <div className="mx-4 my-8">
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-white">
            Invite friends and
          </span>
          <span className="text-3xl font-bold justify-start  text-[#69d3fd] ">
            earn points
          </span>
        </div>
      </div>
      <div className="mx-4 my-4 mt-1 border-2 border-[#28426C] rounded-lg px-4 py-4">
        <div className="flex">
          <div className="px-2 pt-1">
            <DotIcon width={12} height={12} color={"#69d3fd"} />
          </div>
          <div className="flex flex-col">
            <span className="text-[#69d3fd] text-sm font-semibold">
              Refer your friends
            </span>
            <span className="text-[#9E9E9E] text-xs">
              Earn 5,000 points each for the first 5 friends that start racing.
            </span>
          </div>
        </div>
        <div className="mt-4 flex">
          <div className="px-2 pt-1">
            <DotIcon width={12} height={12} color={"#69d3fd"} />
          </div>
          <div className="flex flex-col">
            <span className="text-[#69d3fd] text-sm font-semibold">Bonus points</span>
            <span className="text-[#9E9E9E] text-xs">
              You'll get 10 % of each friend's total points, up to 10,000 bonus
              points per friend.
            </span>
          </div>
        </div>
      </div>
      <div className="mx-4 my-2 text-[#9E9E9E] text-sm">
        You've earned <span className="text-white">0 pts</span> from your
        friends.
      </div>
      <div className="flex justify-start ml-4">
        <div className="flex flex-row justify-between p-2 bg-gradient-to-r from-[#15b0ee] to-[#4a5bee] text-white text-lg font-medium h-[50px] w-[284px] rounded-[25px]">
          <span className="ml-4">Invite friends</span>
          <div className="mt-1 mr-2">
            <ArrowIcon />
          </div>
        </div>
        <button className="bg-white text-black text-lg font-medium h-[50px] w-[50px] rounded-[25px] ml-4 flex justify-center items-center">
          <CopyIcon width={18} height={18} color={"#000"} />
        </button>
      </div>
    </div>
  );
};

export default Invite;

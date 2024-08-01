import React from "react";
import DotIcon from "../assets/icons/Dot";
import CopyIcon from "../assets/icons/Copy";
import BackgroundIcon from "../assets/icons/Background";
// import ButtonIcon from "../assets/icons/InviteButton";
import ArrowIcon from "../assets/icons/Arrow";

const Invite = () => {
  return (
    <div className="w-full flex flex-col mb-24">
      <div className="mx-4 my-8">
        <div className="absolute">
          <BackgroundIcon />
        </div>
        <span className="text-4xl font-bold text-white">
          Invite friends and get
        </span>
        <span className="text-4xl font-bold text-blue-400 ml-2">
          earn points
        </span>
      </div>
      <div className="mx-4 my-4 border border-[#444] rounded-lg px-4 py-4 bg-[#222]">
        <div className="flex">
          <div className="px-2 pt-1">
            <DotIcon width={12} height={12} color={"#a3e635"} />
          </div>
          <div className="flex flex-col">
            <span className="text-blue-400 font-bold">Refer your friends</span>
            <span className="text-slate-400">
              Earn 5,000 points each for the first 5 friends that start racing.
            </span>
          </div>
        </div>
        <div className="mt-4 flex">
          <div className="px-2 pt-1">
            <DotIcon width={12} height={12} color={"#a3e635"} />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold">Bonus poits</span>
            <span className="text-slate-400">
              You'll get 10 % of each friend's total points, up to 10,000 bonus
              points per friend.
            </span>
          </div>
        </div>
      </div>
      <div className="mx-4 my-2 text-slate-400">
        You'll earned <span className="text-white">0 pts</span> from your
        friends.
      </div>
      <div className="flex justify-center">
        <button className="bg-gradient-to-b from-blue-700 via-#04C1FF to-#0062FF text-black text-lg font-medium w-2/3 h-[50px] rounded-[25px]">
          Invite friends
        </button>
        <ArrowIcon />
        <button className="bg-white text-black text-lg font-medium h-[50px] w-[50px] rounded-[25px] ml-4 flex justify-center items-center">
          <CopyIcon width={18} height={18} color={"#000"} />
        </button>
      </div>
    </div>
  );
};

export default Invite;

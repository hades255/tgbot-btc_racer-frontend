import React from "react";
import DotIcon from "../assets/icons/Dot";
import InviteBtn from "../components/leaderbaord/InviteBtn";
import CopyBtn from "../components/leaderbaord/CopyBtn";

const Invite = () => {
  return (
    <div className="w-full flex flex-col mb-24">
      <div className="mx-4 my-8">
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-white">
            Invite friends and
          </span>
          <span className="text-3xl font-bold justify-start bg-clip-text text-transparent bg-emphasize">
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
            <span className="text-[#69d3fd] text-sm font-semibold">
              Bonus points
            </span>
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
      <div className="mx-4 mt-24 flex justify-start py-2 px-2">
        <InviteBtn />
        <div className="ml-4 ">
          <CopyBtn />
        </div>
      </div>
    </div>
  );
};

export default Invite;

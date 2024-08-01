import React from "react";
import CupIcon from "../assets/icons/Cup";
import DotIcon from "../assets/icons/Dot";
import FlagIcon from "../assets/icons/Flag";
import { useAuth } from "../contexts/AuthContext";

const Tasks = () => {
  const { point } = useAuth();

  return (
    <div className="w-full flex flex-col mb-24 px-4 pt-8">
      <div className="flex justify-center">
        <div className="mr-1 pt-1">
          <CupIcon width={14} height={14} color={"yellow"} />
        </div>
        <span className="text-stone-400">Available points</span>
      </div>
      <div className="flex justify-center">
        <span className="text-white text-3xl font-bold">{point}</span>
      </div>
      <div className="mt-8 mb-2 text-white text-lg">Upgrade (4)</div>
      <div className="my-2 flex">
        <div className="bg-[#333] rounded-xl h-[180px] w-[200px] p-4 flex flex-col relative mr-4">
          <div className="bg-[#555] rounded-lg h-[50px] w-[50px]"></div>
          <div className="my-2">
            <span className="text-white">Auto-driving</span>
            <span className="ml-1 px-1 text-xs bg-lime-400 rounded">New</span>
          </div>
          <div className="text-stone-400 text-xs">
            Play while you're away, so you're always earning points.
          </div>
          <div className="text-stone-400 absolute bottom-2">Locked</div>
          {true && (
            <div className="absolute top-0 left-0 bg-[#222125d2] rounded-xl h-[180px] w-[200px] flex justify-center items-center">
              <div className="flex flex-col">
                <div className="flex justify-center">
                  <CupIcon width={32} height={32} color={"white"} />
                </div>
                <span className="text-white">Unlock {">"}</span>
              </div>
            </div>
          )}
        </div>
        <div className="bg-[#333] rounded-xl h-[180px] w-[200px] p-4 flex flex-col relative">
          <div className="bg-[#555] rounded-lg h-[50px] w-[50px]"></div>
          <div className="my-2">
            <span className="text-white">Reload Fuel Tank</span>
          </div>
          <div className="text-stone-400 text-xs">
            Enjoy 3 free fuel tank reward everyday!
          </div>
          <div className="text-stone-400 absolute bottom-2 flex">
            Free
            <div className="px-2 pt-3">
              <DotIcon width={4} height={4} color={"#a8a29e"} />
            </div>
            3/3
          </div>
        </div>
      </div>
      <div className="mt-8 mb-2 text-white text-lg">Tasks (4)</div>
      <div className="my-4 px-4 py-2 rounded-xl flex justify-between border border-[#333]">
        <div className="w-4/5 flex flex-col">
          <span className="text-white text-md font-medium">
            Connect Telegram and complete identity verification
          </span>
          <div className="flex">
            <div>
              <FlagIcon width={18} height={18} color={"#a8a29e"} />
            </div>
            <span className="text-stone-400 text-sm">+ 10,000 pts</span>
          </div>
        </div>
        <div className="text-white text-2xl font-bold flex items-center">
          {">"}
        </div>
      </div>
      <div className="my-4 px-4 py-2 rounded-xl flex justify-between border border-[#333]">
        <div className="w-4/5 flex flex-col">
          <span className="text-white text-md font-medium">
            Follow OKX official Twitter
          </span>
          <div className="flex">
            <div>
              <FlagIcon width={18} height={18} color={"#a8a29e"} />
            </div>
            <span className="text-stone-400 text-sm">+ 750 pts</span>
          </div>
        </div>
        <div className="text-white text-2xl font-bold flex items-center">
          {">"}
        </div>
      </div>
      <div className="my-4 px-4 py-2 rounded-xl flex justify-between border border-[#333]">
        <div className="w-4/5 flex flex-col">
          <span className="text-white text-md font-medium">Daily Rewards</span>
          <div className="flex">
            <div>
              <FlagIcon width={18} height={18} color={"#a8a29e"} />
            </div>
            <span className="text-stone-400 text-sm">+ 2,000 pts</span>
          </div>
        </div>
        <div className="text-white text-2xl font-bold flex items-center">
          {">"}
        </div>
      </div>
      <div className="my-4 px-4 py-2 rounded-xl flex justify-between border border-[#333]">
        <div className="w-4/5 flex flex-col">
          <span className="text-white text-md font-medium">
            Join announcement channel
          </span>
          <div className="flex">
            <div>
              <FlagIcon width={18} height={18} color={"#a8a29e"} />
            </div>
            <span className="text-stone-400 text-sm">+ 750 pts</span>
          </div>
        </div>
        <div className="text-white text-2xl font-bold flex items-center">
          {">"}
        </div>
      </div>
    </div>
  );
};

export default Tasks;

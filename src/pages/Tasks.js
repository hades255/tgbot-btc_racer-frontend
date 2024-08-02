import React, { useCallback, useMemo, useState } from "react";
import DotIcon from "../assets/icons/Dot";
import { useAuth } from "../contexts/AuthContext";
import RightIcon from "../assets/icons/Right";
import TaskModal, { fuelTankPoints } from "../components/task/TaskModal";
import LockIcon from "../assets/icons/Lock";
import SaturnIcon from "../assets/icons/Saturn";
import { useSelector } from "react-redux";
import Saturn1Icon from "../assets/icons/Saturn1";

const Tasks = () => {
  const { point } = useAuth();
  const { freeBoost, fueltank } = useSelector((state) => state.fuel);
  const fueltankpoint = useMemo(() => fuelTankPoints(fueltank), [fueltank]);

  const [selectedTaskItem, setSelectedTaskItem] = useState(null);

  const handleClickTaskItem = useCallback((value) => {
    setSelectedTaskItem(value);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTaskItem(null);
  }, []);

  return (
    <div className="w-full flex flex-col mt-4 mb-24">
      <div className="mt-18 flex justify-center">
        <div className="mr-1 pt-1"></div>
        <span className="text-sm">🔥</span>
        <span className="text-slate-400 text-sm">Available points</span>
      </div>
      <div className="flex justify-center">
        <span className="text-white text-3xl font-bold">{point}</span>
      </div>
      <div className="mx-4 mt-6 mb-2 text-white text-sm">Upgrade (4)</div>
      <div className="mx-4 my-2 flex overflow-x-auto scroll">
        <div
          onClick={() => {
            handleClickTaskItem("auto-driving");
          }}
          className="bg-blue-900 bg-opacity-10 rounded-lg h-[160px] min-w-[180px] w-[180px] px-4 py-2 flex flex-col relative"
        >
          <div className="blur-sm">
            <div className="bg-[#1A2B47] rounded-md h-[50px] w-[50px] flex justify-center items-center">
              <Saturn1Icon width={36} height={36} color={"random"} />
            </div>
            <div className="mt-2">
              <span className="text-white text-sm">Auto-driving</span>
              <span className="ml-1 px-1 text-xs bg-lime-400 rounded">New</span>
            </div>
            <div className="text-slate-400 text-xs">
              Play while you're away, so you're always earning...
            </div>
            <div className="text-slate-400 absolute bottom-1 text-sm">
              🚀 Locked
            </div>
          </div>
          {true && (
            <>
              <div className="absolute top-0 left-0 bg-[#0a0a0a79] rounded-lg h-[160px] w-[180px] flex justify-center items-center">
                <div className="flex flex-col">
                  <div className="flex justify-center">
                    <LockIcon width={32} height={32} color={"white"} />
                  </div>
                  <div className="flex items-center">
                    <span className="text-white text-sm mr-1">Unlock</span>
                    <RightIcon width={16} height={16} color={"white"} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div
          onClick={() => {
            handleClickTaskItem("reload-fuel");
          }}
          className="bg-blue-900 bg-opacity-10 rounded-lg h-[160px] min-w-[180px] w-[180px] px-4 py-2 flex flex-col relative ml-4"
        >
          <div className="bg-[#1A2B47] rounded-md h-[50px] w-[50px] flex justify-center items-center">
            <SaturnIcon width={36} height={36} color={"random"} />
          </div>
          <div className="mt-2">
            <span className="text-white text-sm">Reload Fuel Tank</span>
          </div>
          <div className="text-slate-500 text-xs">
            Enjoy 3 free fuel tank reward everyday!
          </div>
          <div className="text-slate-400 absolute bottom-1 flex text-sm">
            🚀 Free
            <div className="px-2 pt-3">
              <DotIcon width={4} height={4} color={"#a8a29e"} />
            </div>
            {freeBoost}/3
          </div>
        </div>
        <div
          onClick={() => {
            handleClickTaskItem("upgrade-fuel");
          }}
          className="bg-blue-900 bg-opacity-10 rounded-lg h-[160px] min-w-[180px] w-[180px] px-4 py-2 flex flex-col relative ml-4"
        >
          <div className="bg-[#1A2B47] rounded-md h-[50px] w-[50px] flex justify-center items-center">
            <Saturn1Icon width={36} height={36} color={"random"} />
          </div>
          <div className="mt-2">
            <span className="text-white text-sm">Fuel Tank</span>
          </div>
          <div className="text-slate-500 text-xs">
            Increase your maximun fuel tank by 2!
          </div>
          <div className="text-slate-400 absolute bottom-1 flex text-sm">
            🚀 -{fueltankpoint}pts
            <div className="px-2 pt-3">
              <DotIcon width={4} height={4} color={"#a8a29e"} />
            </div>
            Lvl {fueltank}
          </div>
        </div>
        <div
          onClick={() => {
            handleClickTaskItem("turbo-charger");
          }}
          className="bg-blue-900 bg-opacity-10 rounded-lg h-[160px] min-w-[180px] w-[180px] px-4 py-2 flex flex-col relative ml-4"
        >
          <div className="bg-[#1A2B47] rounded-md h-[50px] w-[50px] flex justify-center items-center">
            <SaturnIcon width={36} height={36} color={"random"} />
          </div>
          <div className="mt-2">
            <span className="text-white text-sm">Turbo Charger</span>
          </div>
          <div className="text-slate-500 text-xs">
            Each level up increases the base score earned by 10...
          </div>
          <div className="text-slate-400 absolute bottom-1 flex text-sm">
            🚀 -1000pts
            <div className="px-2 pt-3">
              <DotIcon width={4} height={4} color={"#a8a29e"} />
            </div>
            Lvl 0
          </div>
        </div>
      </div>
      <div className="mx-4 mt-3 text-white text-sm">Tasks (4)</div>
      <div
        className="mx-4 my-4 px-3 py-2 rounded-xl flex justify-between border border-[#173560]"
        onClick={() => {
          handleClickTaskItem("complete-identity");
        }}
      >
        <div className="w-4/5 flex flex-col">
          <span className="text-white text-sm font-medium">
            Connect Telegram and complete identity verification
          </span>
          <div className="mt-2 flex items-center">
            <span className="text-slate-400 text-xs">🚀 + 10,000 pts</span>
          </div>
        </div>
        <div className="text-white text-2xl font-bold flex items-center">
          <RightIcon width={18} height={18} color={"white"} />
        </div>
      </div>
      <div
        className="mx-4 my-4 px-3 py-2 rounded-xl flex justify-between border border-[#173560]"
        onClick={() => {
          handleClickTaskItem("follow-twitter");
        }}
      >
        <div className="w-4/5 flex flex-col">
          <span className="text-white text-sm font-medium">
            Follow Alphanomics official Twitter
          </span>
          <div className="mt-2 flex items-center">
            <span className="text-slate-400 text-xs">🚀 + 750 pts</span>
          </div>
        </div>
        <div className="text-white text-2xl font-bold flex items-center">
          <RightIcon width={18} height={18} color={"white"} />
        </div>
      </div>
      <div
        className="mx-4 my-4 px-3 py-2 rounded-xl flex justify-between border border-[#173560]"
        onClick={() => {
          handleClickTaskItem("daily-reward");
        }}
      >
        <div className="w-4/5 flex flex-col">
          <span className="text-white text-sm font-medium">Daily Rewards</span>
          <div className="mt-2 flex items-center">
            <span className="text-slate-400 text-xs">🚀 + 2,000 pts</span>
          </div>
        </div>
        <div className="text-white text-2xl font-bold flex items-center">
          <RightIcon width={18} height={18} color={"white"} />
        </div>
      </div>
      <div
        className="mx-4 my-4 px-3 py-2 rounded-xl flex justify-between border border-[#173560]"
        onClick={() => {
          handleClickTaskItem("announcement-channel");
        }}
      >
        <div className="w-4/5 flex flex-col">
          <span className="text-white text-sm font-medium">
            Join announcement channel
          </span>
          <div className="mt-2 flex items-center">
            <span className="text-slate-400 text-xs">🚀 + 750 pts</span>
          </div>
        </div>
        <div className="text-white text-2xl font-bold flex items-center">
          <RightIcon width={18} height={18} color={"white"} />
        </div>
      </div>
      <TaskModal
        selected={selectedTaskItem}
        show={selectedTaskItem}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Tasks;

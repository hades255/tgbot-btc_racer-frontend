import React, { useCallback, useState } from "react";
import DotIcon from "../assets/icons/Dot";
import { useAuth } from "../contexts/AuthContext";
import JoystickIcon from "../assets/icons/Joystick";
import RightIcon from "../assets/icons/Right";
import TaskModal from "../components/task/TaskModal";
import LockIcon from "../assets/icons/Lock";
import SaturnIcon from "../assets/icons/Saturn";
import { useSelector } from "react-redux";

const Tasks = () => {
  const { point } = useAuth();
  const { freeBoost } = useSelector((state) => state.fuel);

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
      <div className="ml-4 my-2 flex">
        <div
          onClick={() => {
            handleClickTaskItem(1);
          }}
          className="bg-blue-900 bg-opacity-10 rounded-lg h-[150px] min-w-[170px] w-[170px] px-4 py-2 flex flex-col relative mr-4"
        >
          <div className="blur-sm">
            <div className="bg-[#1A2B47] rounded-md h-[50px] w-[50px] flex justify-center items-center">
              <JoystickIcon width={40} height={40} color={"random"} />
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
              <div className="absolute top-0 left-0 bg-[#0a0a0a79] rounded-lg h-[150px] w-[170px] flex justify-center items-center">
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
            handleClickTaskItem(2);
          }}
          className="bg-blue-900 bg-opacity-10 rounded-lg h-[150px] min-w-[170px] w-[170px] px-4 py-2 flex flex-col relative"
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
      </div>
      <div className="mx-4 mt-3 text-white text-sm">Tasks (4)</div>
      <div
        className="mx-4 my-4 px-3 py-2 rounded-xl flex justify-between border border-[#173560]"
        onClick={() => {
          handleClickTaskItem(3);
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
          handleClickTaskItem(4);
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
          handleClickTaskItem(5);
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
          handleClickTaskItem(6);
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
      {selectedTaskItem && (
        <TaskModal
          selected={selectedTaskItem - 1}
          show={selectedTaskItem}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Tasks;

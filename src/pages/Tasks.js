import React, { useCallback, useState } from "react";
import CupIcon from "../assets/icons/Cup";
import DotIcon from "../assets/icons/Dot";
import FlagIcon from "../assets/icons/Flag";
import { useAuth } from "../contexts/AuthContext";
import FuelIcon from "../assets/icons/Fuel";
import JoystickIcon from "../assets/icons/Joystick";
import RightIcon from "../assets/icons/Right";
import TaskModal from "../components/task/TaskModal";
import LockIcon from "../assets/icons/Lock";

const Tasks = () => {
  const { point } = useAuth();
  const [selectedTaskItem, setSelectedTaskItem] = useState(null);

  const handleClickTaskItem = useCallback((value) => {
    setSelectedTaskItem(value);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTaskItem(null);
  }, []);

  return (
    <div className="w-full flex flex-col mt-8 mb-24">
      <div className="mt-18 flex justify-center">
        <div className="mr-1 pt-1">
          <CupIcon width={14} height={14} color={"yellow"} />
        </div>
        <span className="text-stone-400">Available points</span>
      </div>
      <div className="flex justify-center">
        <span className="text-white text-3xl font-bold">{point}</span>
      </div>
      <div className="mx-4 mt-8 mb-2 text-white text-lg">Upgrade (4)</div>
      <div className="ml-4 my-2 flex">
        <div
          onClick={() => {
            handleClickTaskItem(1);
          }}
          className="bg-[#333] rounded-xl h-[170px] min-w-[170px] w-[170px] p-4 flex flex-col relative mr-4"
        >
          <div className="bg-[#555] rounded-lg h-[50px] w-[50px] flex justify-center items-center">
            <JoystickIcon width={40} height={40} color={"random"} />
          </div>
          <div className="my-2">
            <span className="text-white">Auto-driving</span>
            <span className="ml-1 px-1 text-xs bg-lime-400 rounded">New</span>
          </div>
          <div className="text-stone-400 text-xs">
            Play while you're away, so you're always earning...
          </div>
          <div className="text-stone-400 absolute bottom-2 text-sm">Locked</div>
          {true && (
            <div className="absolute top-0 left-0 bg-[#22212579] rounded-xl h-[170px] w-[170px] flex justify-center items-center">
              <div className="flex flex-col">
                <div className="flex justify-center">
                  <LockIcon width={32} height={32} color={"white"} />
                </div>
                <div className="flex items-center">
                  <span className="text-white mr-1">Unlock</span>
                  <RightIcon width={14} height={14} color={"white"} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          onClick={() => {
            handleClickTaskItem(2);
          }}
          className="bg-[#333] rounded-xl h-[170px] min-w-[170px] w-[170px] p-4 flex flex-col relative"
        >
          <div className="bg-[#555] rounded-lg h-[50px] w-[50px] flex justify-center items-center">
            <FuelIcon width={36} height={36} color={"random"} />
          </div>
          <div className="my-2">
            <span className="text-white">Reload Fuel Tank</span>
          </div>
          <div className="text-stone-400 text-xs">
            Enjoy 3 free fuel tank reward everyday!
          </div>
          <div className="text-stone-400 absolute bottom-2 flex text-sm">
            <div className="mr-1 flex items-center">
              <FlagIcon width={16} height={16} color={"white"} />
            </div>
            Free
            <div className="px-2 pt-3">
              <DotIcon width={4} height={4} color={"#a8a29e"} />
            </div>
            3/3
          </div>
        </div>
      </div>
      <div className="mx-4 mt-8 mb-2 text-white text-lg">Tasks (4)</div>
      <div
        className="mx-4 my-4 px-4 py-2 rounded-xl flex justify-between border border-[#333]"
        onClick={() => {
          handleClickTaskItem(3);
        }}
      >
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
          <RightIcon width={18} height={18} color={"white"} />
        </div>
      </div>
      <div
        className="mx-4 my-4 px-4 py-2 rounded-xl flex justify-between border border-[#333]"
        onClick={() => {
          handleClickTaskItem(4);
        }}
      >
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
          <RightIcon width={18} height={18} color={"white"} />
        </div>
      </div>
      <div
        className="mx-4 my-4 px-4 py-2 rounded-xl flex justify-between border border-[#333]"
        onClick={() => {
          handleClickTaskItem(5);
        }}
      >
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
          <RightIcon width={18} height={18} color={"white"} />
        </div>
      </div>
      <div
        className="mx-4 my-4 px-4 py-2 rounded-xl flex justify-between border border-[#333]"
        onClick={() => {
          handleClickTaskItem(6);
        }}
      >
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

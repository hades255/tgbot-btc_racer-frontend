import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import CopyIcon from "../../assets/icons/Copy";
import FlagIcon from "../../assets/icons/Flag";
import MedalIcon from "../../assets/icons/Medal";
import ButtonIcon from "../../assets/icons/InviteButton";

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
            <div className="w-14">
              <MedalIcon width={16} height={16} />
            </div>
            <div className="text-sm backdrop-blur-lg text-white">{name}</div>
          </div>
          <div className="flex">
            <div className="flex pt-1 mr-2">
              <FlagIcon width={16} height={16} color={"#a8a29e"} />
            </div>
            <span className="text-sm backdrop-blur-lg text-slate-400">
              {point} pts
            </span>
          </div>
        </div>
      </div>
      <div className="text-slate-500 text-sm my-4">
        You have yet to invite your friends. Invite them now to see their
        rankings here and race together!
      </div>
      <div className="flex justify-center mt-[400px]">
        <ButtonIcon />
        <button className="bg-white text-black text-lg font-medium h-[50px] w-[50px] rounded-[25px] ml-4 flex justify-center items-center">
          <CopyIcon width={18} height={18} color={"#000"} />
        </button>
      </div>
    </div>
  );
};

export default Friends;

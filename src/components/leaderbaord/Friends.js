import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import InviteBtn from "./InviteBtn";
import CopyBtn from "./CopyBtn";

const Friends = () => {
  const { name, point } = useAuth();

  return (
    <div className="flex flex-col">
      <div className="min-h-44 flex flex-col">
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
      </div>
      <div className="mt-28 flex justify-start px-2">
        <InviteBtn />
        <div className="ml-4 ">
          <CopyBtn />
        </div>
      </div>
    </div>
  );
};

export default Friends;

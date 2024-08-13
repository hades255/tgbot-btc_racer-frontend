import React, { useCallback, useState } from "react";
import Friends from "../components/leaderbaord/Friends";
import Global from "../components/leaderbaord/Global";

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleActiveTab0 = useCallback(() => setActiveTab(0), []);
  const handleActiveTab1 = useCallback(() => setActiveTab(1), []);

  return (
    <div className="w-full flex flex-col">
      <div className="mx-6 mt-6">
        <span className="text-3xl spaced-text-2 font-bold text-white">Fly to the</span>
        <span className="text-3xl spaced-text-2 font-bold bg-clip-text text-transparent bg-emphasize ml-2">
          top
        </span>
      </div>
      <div className="text-sm text-slate-200 ml-6 mt-3">
        See where you stand and challenge the top pilots!
      </div>
      <div className="mt-4 mx-6 border-b-[1px] border-gray-700 flex">
        <span
          className={`pb-4 mr-2 hover:cursor-pointer text-sm ${
            activeTab === 0
              ? "text-white border-b-2 border-[#79DEFF]"
              : "text-slate-400"
          }`}
          onClick={handleActiveTab0}
        >
          Friends
        </span>
        <span
          className={`pb-4 hover:cursor-pointer text-sm ml-4 ${
            activeTab === 1
              ? "text-white border-b-2 border-[#79DEFF]"
              : "text-slate-400"
          }`}
          onClick={handleActiveTab1}
        >
          Global
        </span>
      </div>
      <div className="mx-3 my-4">
        {activeTab === 0 && <Friends />}
        {activeTab === 1 && <Global />}
      </div>
    </div>
  );
};

export default Leaderboard;

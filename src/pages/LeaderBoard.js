import React, { useCallback, useState } from "react";
import Friends from "../components/leaderbaord/Friends";
import Global from "../components/leaderbaord/Global";
import BackgroundIcon from "../assets/icons/Background";

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleActiveTab0 = useCallback(() => setActiveTab(0), []);
  const handleActiveTab1 = useCallback(() => setActiveTab(1), []);

  return (
<div className="w-full flex flex-col mb-24 relative">
  <div className="mx-4 my-8">
    <div className="absolute top-0">
      <BackgroundIcon />
    </div>
    <span className="text-4xl font-bold text-white">Race to the</span>
    <span className="text-4xl font-bold text-blue-400 ml-2">top</span>
  </div>
  <div className="text-lg text-white mx-4 mb-8">
    See where you stand and challenge the top racers!
  </div>
  <div className="mx-4 border-b-[1px] border-gray-700 flex">
    <span
      className={`hover:cursor-pointer text-md ${
        activeTab === 0
          ? "text-white border-b-2 border-white"
          : "text-stone-500"
      }`}
      onClick={handleActiveTab0}
    >
      Friends
    </span>
    <span
      className={`hover:cursor-pointer text-md ml-4 ${
        activeTab === 1
          ? "text-white border-b-2 border-white"
          : "text-stone-500"
      }`}
      onClick={handleActiveTab1}
    >
      Global
    </span>
  </div>
  <div className="mx-4 my-4">
    {activeTab === 0 && <Friends />}
    {activeTab === 1 && <Global />}
  </div>
</div>

  );
};

export default Leaderboard;

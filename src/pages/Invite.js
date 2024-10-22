import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { BACKEND_PATH } from "../constants/config";
import InviteBtn from "../components/leaderbaord/InviteBtn";
import CopyBtn from "../components/leaderbaord/CopyBtn";
import DotIcon from "../assets/icons/Dot";

const Invite = () => {
  const { userId } = useAuth();
  const [totalBonus, setTotalBonus] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${BACKEND_PATH}/referral/bonus?userId=${userId}`
        );
        setTotalBonus(response.data.totalBonus || 0);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  return (
    <div className="w-full flex flex-col mb-20">
      <div className="mx-4 my-8 flex flex-col">
        <span className="text-[32px] font-bold font-dmsans_bold text-white">
          Invite friends &
        </span>
        <span className="text-[32px] font-bold font-dmsans_bold justify-start bg-clip-text text-transparent bg-emphasize">
          earn points
        </span>
      </div>
      <div className="mx-4 my-4 mt-1 border-2 border-[#28426C] rounded-lg px-4 py-4">
        <div className="flex">
          <div className="px-2 pt-1">
            <DotIcon width={12} height={12} color={"#79DEFE"} />
          </div>
          <div className="flex flex-col">
            <span className="text-[#79DEFE] text-md">Refer your friends</span>
            <span className="text-[#9E9E9E] text-sm">
              Earn 5,000 points each for the first 5 friends that start battling.
            </span>
          </div>
        </div>
        <div className="mt-4 flex">
          <div className="px-2 pt-1">
            <DotIcon width={12} height={12} color={"#79DEFE"} />
          </div>
          <div className="flex flex-col">
            <span className="text-[#79DEFE] text-md">Bonus points</span>
            <span className="text-[#9E9E9E] text-sm">
              You'll get 10 % of each friend's total points, up to 10,000 bonus
              points per friend.
            </span>
          </div>
        </div>
      </div>
      <div className="mx-4 my-2 text-[#9E9E9E] text-sm">
        You've earned <span className="text-white">{totalBonus} pts</span> from
        your friends.
      </div>
      <div className="mx-4 mt-8 flex justify-center py-2 px-2">
        <InviteBtn />
        <div className="ml-4 ">
          <CopyBtn />
        </div>
      </div>
    </div>
  );
};

export default Invite;

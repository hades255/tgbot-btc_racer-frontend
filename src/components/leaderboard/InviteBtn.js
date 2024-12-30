import React, { useMemo } from "react";
import { BOT_URL } from "@constants/config";
import { useAuth } from "@contexts/AuthContext";
import ArrowIcon from "@icons/Arrow";

const InviteBtn = () => {
  const { userId } = useAuth();

  const message = useMemo(
    () =>
      `${BOT_URL}?startapp=linkCode_${userId}\nLet's race! Predict Ethereum's price and rack up points`,
    [userId]
  );
  const encodedMessage = useMemo(() => encodeURIComponent(message), [message]);

  return (
    <div className="w-full bg-button-1-bg h-[50px] rounded-[25px] flex justify-center items-center relative">
      <a
        className="w-[calc(100%-2px)] p-4 bg-button-1 h-[48px] rounded-[25px] flex justify-between items-center"
        href={`https://telegram.me/share/url?url=${encodedMessage}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="ml-2 text-white text-md font-medium">
          Invite friends
        </span>
        <ArrowIcon />
      </a>
    </div>
  );
};

export default InviteBtn;

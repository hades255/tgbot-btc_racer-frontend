import React, { useMemo } from "react";
import ArrowIcon from "../../assets/icons/Arrow";

const InviteBtn = () => {
  const message = useMemo(
    () =>
      `https://t.me/OKX_official_bot/OKX_Racer?startapp=linkCode_119285852\nLet's race! Predict Ethereum's price and rack up points`,
    []
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
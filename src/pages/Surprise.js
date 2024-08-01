import React from "react";
import CheckIcon from "../assets/icons/Check";
import DotIcon from "../assets/icons/Dot";
import InfoIcon from "../assets/icons/Info";

const Surprise = () => {
  return (
    <div className="w-full flex flex-col mb-24">
      <div className="mx-4 my-8">
        <span className="text-4xl font-bold text-white">Ready for more</span>
        <span className="text-4xl font-bold text-lime-400 ml-2">
          surprises?
        </span>
      </div>
      <div className="mx-4 text-white text-md">
        Complete these steps to unlock Auto-driving and be eligible for
        surprises.
      </div>
      <div className="mx-4 my-4 p-4 rounded-xl bg-[#222] flex">
        <div className="w-[60px] h-[60px] rounded-lg bg-[#333] mr-3"></div>
        <div className="flex flex-col">
          <div>
            <span className="text-white text-lg">Auto-driving</span>
            <span className="ml-1 px-1 text-xs bg-lime-400 rounded">New</span>
          </div>
          <div className="text-sm text-stone-400">
            Play while you're away, so you're always earning points.
          </div>
        </div>
      </div>
      <div className="mx-4 my-4 px-4 py-2 rounded-xl flex flex-col border border-[#333]">
        <div className="flex my-2">
          <div className="mr-1 pt-1">
            <CheckIcon width={14} height={16} color={"white"} />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-md font-medium">
              Sign up for an OKX account {">"}
            </span>
            <span className="text-stone-400 text-sm">
              Skip this step if you already have an account.
            </span>
          </div>
        </div>
        <div className="flex my-2">
          <div className="mr-1 pt-1">
            <CheckIcon width={14} height={16} color={"white"} />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-md font-medium">
              Install the OKX app {">"}
            </span>
          </div>
        </div>
        <div className="flex my-2">
          <div className="mr-1 pt-1">
            <DotIcon width={14} height={16} color={"#a3e635"} />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-md font-medium">
              Connect to Telegram {">"}
            </span>
            <span className="text-stone-400 text-sm">
              Go to your Profile on the OKX app, select Connected accounts, and
              link your Telegram account.
            </span>
          </div>
        </div>
        <div className="flex my-2">
          <div className="mr-1 pt-1">
            <DotIcon width={14} height={16} color={"#a3e635"} />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-md font-medium">
              Verify your identity {">"}
            </span>
            <span className="text-stone-400 text-sm">
              Pass identity verification on OKX.
            </span>
          </div>
        </div>
      </div>
      <div className="mx-4 my-4 text-[#DDD] text-sm flex">
        <div className="mr-1">
          <InfoIcon width={16} height={16} color={"#DDD"} />
        </div>
        <span>Check your eligibility after completing the steps.</span>
      </div>
      <div className="flex justify-center my-4">
        <button className="mx-4 w-full bg-white text-black text-lg font-medium h-[50px] rounded-[25px]">
          Check eligibility
        </button>
      </div>
      <div className="flex justify-center my-4">
        <span className="text-white text-xs underline">
          Terms and conditions
        </span>
      </div>
    </div>
  );
};

export default Surprise;

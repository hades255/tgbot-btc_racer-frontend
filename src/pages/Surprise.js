import React from "react";
import CheckIcon from "../assets/icons/Check";
import DotIcon from "../assets/icons/Dot";
import InfoIcon from "../assets/icons/Info";
import RightIcon from "../assets/icons/Right";
import BackgroundIcon from "../assets/icons/Background";
import ButtonIcon from "../assets/icons/CreateButton";

const Surprise = () => {
  return (
    <div className="w-full flex flex-col mb-24">
      <div className="mx-4 mt-4 flex flex-col">
        <span className="text-3xl font-bold text-white">Ready for more</span>
        <span className="text-3xl font-bold bg-clip-text text-transparent bg-emphasize">
          surprises?
        </span>
      </div>
      <div className="mt-4 mx-4 text-white text-sm">
        Complete these steps to unlock Auto-driving and be eligible for
        surprises.
      </div>
      <div className="mx-4 mt-4 p-3 rounded-lg bg-[#0F1F39] flex">
        <div className="w-[50px] min-w-[50px] h-[50px] rounded-md bg-[#1A2B47] mr-3"></div>
        <div className="flex flex-col">
          <div>
            <span className="text-white text-sm">Auto-Cap</span>
            <span className="ml-1 px-2 text-xs bg-emphasize-new text-white rounded">
              New
            </span>
          </div>
          <div className="text-xs text-slate-500">
            Play while you're away, so you're always earning points.
          </div>
        </div>
      </div>
      <div className="mx-4 mt-3 px-4 py-2 rounded-xl flex flex-col border border-[#173560]">
        <div className="flex my-2">
          <div className="mr-1 pt-1">
            <CheckIcon width={14} height={16} color={"white"} />
          </div>
          <div className="flex flex-col">
            <div className="text-white text-md font-medium flex">
              <span className="bg-clip-text text-transparent bg-emphasize-sm text-sm">
                Sign up for an Alphanomics account
              </span>
              <div className="ml-1 flex items-center">
                <RightIcon height={18} width={18} color={"white"} />
              </div>
            </div>
            <span className="text-slate-400 text-xs">
              Skip this step if you already have an account.
            </span>
          </div>
        </div>
        <div className="flex my-2">
          <div className="mr-1 pt-1">
            <CheckIcon width={14} height={16} color={"white"} />
          </div>
          <div className="flex flex-col">
            <div className="text-white text-md font-medium flex">
              <span className="bg-clip-text text-transparent bg-emphasize-sm text-sm">
                Install the OKX app
              </span>
              <div className="ml-1 flex items-center">
                <RightIcon height={18} width={18} color={"white"} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex my-2">
          <div className="mr-1 pt-1">
            <DotIcon width={14} height={16} color={"#04C3FF"} />
          </div>
          <div className="flex flex-col">
            <div className="text-white text-md font-medium flex">
              <span className="bg-clip-text text-transparent bg-emphasize-sm text-sm">
                Connect to Telegram
              </span>
              <div className="ml-1 flex items-center">
                <RightIcon height={18} width={18} color={"white"} />
              </div>
            </div>
            <span className="text-slate-400 text-xs">
              Go to your Profile on the Alphanomics website, select Connected
              accounts, and link your Telegram account.
            </span>
          </div>
        </div>
        <div className="flex my-2">
          <div className="mr-1 pt-1">
            <DotIcon width={14} height={16} color={"#04C3FF"} />
          </div>
          <div className="flex flex-col">
            <div className="text-white text-md font-medium flex">
              <span className="bg-clip-text text-transparent bg-emphasize-sm text-sm">
                Verify your identity
              </span>
              <div className="ml-1 flex items-center">
                <RightIcon height={18} width={18} color={"white"} />
              </div>
            </div>
            <span className="text-slate-400 text-xs">
              Pass identity verification on Alphanomics.
            </span>
          </div>
        </div>
      </div>
      <div className="mx-4 my-4 text-[#b3b3b3] text-xs flex items-center">
        <div className="mr-1">
          <InfoIcon width={14} height={14} color={"#b3b3b3"} />
        </div>
        <span>Check your eligibility after completing the steps.</span>
      </div>
      <div className="flex justify-center my-4">
        <div className="mx-4 w-full bg-button-1-bg h-[50px] rounded-[25px] flex justify-between items-center relative">
          <button className="w-[calc(100%-2px)] p-4 bg-button-1 h-[48px] rounded-[25px] flex justify-between items-center">
            <span className="ml-2 text-white text-md font-medium">
              Check eligibility
            </span>
            <RightIcon width={16} height={16} color={"white"} />
          </button>
        </div>
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

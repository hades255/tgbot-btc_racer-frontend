import React from "react";
import DotIcon from "../assets/icons/Dot";
import InfoIcon from "../assets/icons/Info";
import AstronautIcon from "../assets/icons/Astronaut";
import EligibilityBtn from "../components/surprise/EligibilityBtn";
import RedirectBtn from "../components/common/button/RedirectBtn";

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
        <div className="w-[50px] min-w-[50px] h-[50px] rounded-md bg-[#1A2B47] mr-3">
          <AstronautIcon width={48} height={48} color={"random"} />
        </div>
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
        <RedirectBtn url="https://www.okx.com/join">
          <div className="flex my-2">
            <div className="mr-1 pt-[2px]">
              <DotIcon width={14} height={16} color={"#04C3FF"} />
            </div>
            <div className="flex flex-col">
              <div className="text-white text-md font-medium flex">
                <span className="text-[#69d3fd] text-sm hover:cursor-pointer">
                  Sign up for an Alphanomics account
                </span>
                <div className="ml-1 flex items-center"></div>
              </div>
              <span className="text-slate-400 text-xs">
                Skip this step if you already have an account.
              </span>
            </div>
          </div>
        </RedirectBtn>
        <RedirectBtn url="https://www.okx.com/download?redirectAppStore=true">
          <div className="flex my-2">
            <div className="mr-1 pt-[2px]">
              <DotIcon width={14} height={16} color={"#04C3FF"} />
            </div>
            <div className="flex flex-col">
              <div className="text-white text-md font-medium flex">
                <span className="text-[#69d3fd] text-sm hover:cursor-pointer">
                  Install the OKX app
                </span>
                <div className="ml-1 flex items-center"></div>
              </div>
            </div>
          </div>
        </RedirectBtn>
        <RedirectBtn url="https://www.ouxyi.link/ul/3h87sZ">
          <div className="flex my-2">
            <div className="mr-1 pt-[2px]">
              <DotIcon width={14} height={16} color={"#04C3FF"} />
            </div>
            <div className="flex flex-col">
              <div className="text-white text-md font-medium flex">
                <span className="text-[#69d3fd] text-sm hover:cursor-pointer">
                  Connect to Telegram
                </span>
                <div className="ml-1 flex items-center"></div>
              </div>
              <span className="text-slate-400 text-xs">
                Go to your Profile on the Alphanomics website, select Connected
                accounts, and link your Telegram account.
              </span>
            </div>
          </div>
        </RedirectBtn>
        <RedirectBtn url="https://www.ouxyi.link/ul/3W2uzP">
          <div className="flex my-2">
            <div className="mr-1 pt-[2px]">
              <DotIcon width={14} height={16} color={"#04C3FF"} />
            </div>
            <div className="flex flex-col">
              <div className="text-white text-md font-medium flex">
                <span className="text-[#69d3fd] text-sm hover:cursor-pointer">
                  Verify your identity
                </span>
                <div className="ml-1 flex items-center"></div>
              </div>
              <span className="text-slate-400 text-xs">
                Pass identity verification on Alphanomics.
              </span>
            </div>
          </div>
        </RedirectBtn>
      </div>
      <div className="mx-4 my-4 text-[#b3b3b3] text-xs flex items-center">
        <div className="mr-1">
          <InfoIcon width={14} height={14} color={"#b3b3b3"} />
        </div>
        <span>Check your eligibility after completing the steps.</span>
      </div>
      <div className="flex justify-center my-4 mx-4">
        <EligibilityBtn />
      </div>
      <div className="flex justify-center my-4">
        <RedirectBtn url="https://www.okx.com/help/okx-racer-terms-and-conditions">
          <span className="text-white text-xs underline">
            Terms and conditions
          </span>
        </RedirectBtn>
      </div>
    </div>
  );
};

export default Surprise;

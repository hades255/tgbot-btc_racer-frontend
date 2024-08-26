import React from "react";
import DotIcon from "../assets/icons/Dot";
import InfoIcon from "../assets/icons/Info";
import EligibilityBtn from "../components/surprise/EligibilityBtn";
import RedirectBtn from "../components/common/button/RedirectBtn";
import { useAuth } from "../contexts/AuthContext";
import CheckIcon from "../assets/icons/Check";
import OTTbutton from "../components/surprise/OTTbutton";
import Saturn1Icon from "../assets/icons/Saturn1";
import AstronautIcon from "../assets/icons/Astronaut";

const Surprise = () => {
  const { eligibility } = useAuth();

  return (
    <div className="w-full flex flex-col mb-20">
      <div className="mx-4 mt-4 flex flex-col">
        <span className="text-[32px] font-bold font-dmsans_bold text-white">
          Ready for more
        </span>
        <span className="text-[32px] font-bold font-dmsans_bold bg-clip-text text-transparent bg-emphasize text-shadow">
          big bonuses?
        </span>
      </div>
      <div className="mt-4 mx-4 text-white text-md">
        Complete these steps to unlock Auto-Pilot and be eligible for big
        bonuses.
      </div>
      <div className="mx-4 mt-4 p-3 rounded-lg bg-[#435879] bg-opacity-15 flex">
        <div className="flex items-center mr-2">
          <AstronautIcon width={51} height={51} color={"random"} />
        </div>
        <div className="flex flex-col">
          <div>
            <span className="text-white text-md">Auto-Pilot</span>
            <span className="ml-1 px-2 text-xs bg-emphasize-new text-white rounded">
              New
            </span>
          </div>
          <div className="text-sm text-slate-500">
            Play while you're away, so you're
          </div>
          <div className="text-sm text-slate-500">always earning points.</div>
        </div>
      </div>
      <div className="mx-4 mt-3 px-4 py-2 rounded-xl flex flex-col border border-[#173560]">
        <RedirectBtn
          url={eligibility ? "" : "https://platform.alphanomics.io/"}
        >
          <div className="flex my-2">
            <div className="mr-1 pt-1">
              {eligibility ? (
                <CheckIcon width={14} height={14} color={"white"} />
              ) : (
                <DotIcon width={14} height={14} color={"#04C3FF"} />
              )}
            </div>
            <div className="flex flex-col">
              <div className="text-md font-medium flex">
                <span className="text-[#79DEFE]">
                  Create Your Alphanomics Account
                </span>
              </div>
              <span className="text-[#9E9E9E] text-sm">
                Head to Alphanomics and create an account here
              </span>
            </div>
          </div>
        </RedirectBtn>
        <OTTbutton />
        <RedirectBtn url="https://platform.alphanomics.io/">
          <div className="flex my-2">
            <div className="mr-1 pt-1">
              <DotIcon width={14} height={14} color={"#04C3FF"} />
            </div>
            <div className="flex flex-col">
              <div className="text-md font-medium flex">
                <span className="text-[#79DEFE]">
                  Unlock Alphanomics PLUS Account Level
                </span>
              </div>
              <span className="text-[#9E9E9E] text-sm">
                Go to your Alphanomics 'My Profile' page and earn 10 ANOM points
                to unlock PLUS level
              </span>
            </div>
          </div>
        </RedirectBtn>
      </div>
      {!eligibility && (
        <div className="mx-4 mt-4 text-[#b3b3b3] text-[10px] flex items-center">
          <div className="mr-1">
            <InfoIcon width={14} height={14} color={"#b3b3b3"} />
          </div>
          <span>Check your eligibility after completing the steps.</span>
        </div>
      )}
      <div className="flex justify-center my-4 mx-4">
        <EligibilityBtn />
      </div>
      <div className="flex justify-center my-4">
        <RedirectBtn url="https://platform.alphanomics.io/">
          <span className="text-white text-sm underline">
            Terms and conditions
          </span>
        </RedirectBtn>
      </div>
    </div>
  );
};

export default Surprise;

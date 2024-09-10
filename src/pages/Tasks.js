import React, { useCallback, useMemo, useState } from "react";
import DotIcon from "../assets/icons/Dot";
import { useAuth } from "../contexts/AuthContext";
import RightIcon from "../assets/icons/Right";
import LockIcon from "../assets/icons/Lock";
import { useSelector } from "react-redux";
import {
  dailyBonusPoints,
  fuelTankPoints,
  turborPoints,
} from "../helper/points";
import TaskModal from "../components/task/TaskModal";
import CheckIcon from "../assets/icons/Check";
import RocketIcon from "../assets/icons/Rocket";
import Task4Icon from "../assets/icons/tasks/Task4";
import Task3Icon from "../assets/icons/tasks/Task3";
import AstronautIcon from "../assets/icons/Astronaut";
import EligibilityModal from "../components/surprise/EligibilityModal";
import RedirectBtn from "../components/common/button/RedirectBtn";

const Tasks = () => {
  const {
    point,
    turboCharger,
    dailyBonusLevel,
    dailyBonus,
    dailyBonusVisitLevel,
    dailyBonusVisit,
    followTwitter,
    watchvideo,
    joinNewsletter,
    joinAnnouncementChannel,
    eligibility,
    pluslevel,
    liketweet,
    reactPost,
    subscribeUtv,
  } = useAuth();
  const { freeBoost, fueltank, autopilot } = useSelector((state) => state.fuel);
  const unlockAuthPilot = useMemo(
    () =>
      watchvideo &&
      followTwitter &&
      joinNewsletter &&
      joinAnnouncementChannel &&
      eligibility &&
      pluslevel &&
      liketweet &&
      reactPost &&
      subscribeUtv,
    [
      watchvideo,
      followTwitter,
      joinNewsletter,
      joinAnnouncementChannel,
      eligibility,
      pluslevel,
      liketweet,
      reactPost,
      subscribeUtv,
    ]
  );
  const fueltankpoint = useMemo(
    () => fuelTankPoints(fueltank).toLocaleString(),
    [fueltank]
  );
  const turborpoint = useMemo(
    () => turborPoints(turboCharger).toLocaleString(),
    [turboCharger]
  );
  const bonuspoints = useMemo(
    () => dailyBonusPoints(dailyBonusLevel).toLocaleString(),
    [dailyBonusLevel]
  );
  const bonusVisitpoints = useMemo(
    () => dailyBonusPoints(dailyBonusVisitLevel).toLocaleString(),
    [dailyBonusVisitLevel]
  );
  const lspoint = useMemo(() => point.toLocaleString(), [point]);

  const [selectedTaskItem, setSelectedTaskItem] = useState(null);
  const [show, setShow] = useState(false);

  const handleClick = useCallback(() => setShow(!show), [show]);

  const handleClickTaskItem = useCallback((value) => {
    setSelectedTaskItem(value);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTaskItem(null);
  }, []);

  const tasks = useMemo(
    () =>
      [
        // {
        //   event: "complete-identity",
        //   title: "Connect Telegram and complete identity verification",
        //   point: 10000,
        //   status: false,
        // },
        {
          event: "follow-twitter",
          title: "Follow Alphanomics X",
          point: 3000,
          status: followTwitter,
        },
        {
          event: "watch-video",
          title: "Watch Entire Alphanomics Guide Video",
          point: 5000,
          status: watchvideo,
        },
        {
          event: "announcement-channel",
          title: "Join announcement channel",
          point: 3000,
          status: joinAnnouncementChannel,
        },
        {
          event: "newsletter-channel",
          title: "Join Newsletter substack",
          point: 3000,
          status: joinNewsletter,
        },
        {
          event: "like-tweet",
          title: "Like, RT & Comment on Tweet",
          point: 5000,
          status: liketweet,
        },
        {
          event: "react-post",
          title: "React 🚀on this Telegram Post",
          point: 4000,
          status: reactPost,
        },
        {
          event: "subscribe-utv",
          title: "Subscribe to our Youtube",
          point: 5000,
          status: subscribeUtv,
        },
        {
          event: "daily-reward",
          title: "Daily Rewards - Check In",
          point: bonuspoints,
          status: dailyBonus,
        },
        {
          event: "daily-visit",
          title: "Daily Rewards - Visit Alphanomics Platform",
          point: bonusVisitpoints,
          status: dailyBonusVisit,
        },
      ].sort((a) => (a.status ? 1 : -1)),
    [
      dailyBonus,
      bonuspoints,
      bonusVisitpoints,
      dailyBonusVisit,
      followTwitter,
      watchvideo,
      joinNewsletter,
      joinAnnouncementChannel,
      liketweet,
      reactPost,
      subscribeUtv,
    ]
  );

  return (
    <div className="w-full flex flex-col mt-4 mb-20">
      <div className="mt-18 flex justify-center items-center">
        <span className="text-[20px] mr-1">💎</span>
        <span className="text-slate-400 text-md mr-1">Diamonds Collected</span>
      </div>
      <div className="mt-1 flex justify-center">
        <span className="text-white text-3xl spaced-text-2 font-bold font-dmsans_extrabold">
          {lspoint}
        </span>
      </div>
      <div className="mx-4 mt-6 mb-2 text-white text-md">Upgrade (4)</div>
      <div className="my-2 flex overflow-x-visible overflow-y-hidden">
        <div
          onClick={() => {
            handleClickTaskItem("auto-driving");
          }}
          className="ml-4 bg-[#435879] bg-opacity-15 rounded-lg h-[160px] min-w-[180px] w-[180px] px-4 py-2 flex flex-col relative"
        >
          <div className={`${unlockAuthPilot ? "" : "blur-sm"} h-full`}>
            <AstronautIcon width={51} height={51} color={"random"} />
            <div className="mt-2">
              <span className="text-white text-sm">Auto-Pilot</span>
              <span className="ml-1 px-2 text-xs bg-emphasize-new text-white rounded">
                New
              </span>
            </div>
            <div className="text-slate-400 text-xs">
              Play while you're away, so you're always earning...
            </div>
            <div className="text-slate-400 absolute bottom-1 text-sm flex">
              {autopilot.enabled ? (
                "Activated"
              ) : (
                <>🚀 {unlockAuthPilot ? "Free" : "Locked"}</>
              )}
            </div>
          </div>
          {!unlockAuthPilot && (
            <>
              <div className="absolute top-0 left-0 bg-[#0a0a0a79] rounded-lg h-[160px] w-[180px] flex justify-center items-center">
                <div className="flex flex-col">
                  <div className="flex justify-center">
                    <LockIcon width={28} height={28} color={"white"} />
                  </div>
                  <div className="flex items-center">
                    <span className="text-white text-sm mr-1">Unlock</span>
                    <RightIcon width={16} height={16} color={"white"} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div
          onClick={() => {
            handleClickTaskItem("reload-fuel");
          }}
          className="bg-[#435879] bg-opacity-15 rounded-lg h-[160px] min-w-[180px] w-[180px] px-4 py-2 flex flex-col relative ml-4"
        >
          <RocketIcon width={51} height={51} color={"random"} />
          <div className="mt-2">
            <span className="text-white text-sm">Rocket Pack Refill</span>
          </div>
          <div className="text-slate-500 text-xs">
            Enjoy 3 free rocket pack refills every day!
          </div>
          <div className="text-slate-400 absolute bottom-1 flex text-sm">
            🚀 Free
            <div className="px-1 pt-3">
              <DotIcon width={4} height={4} color={"#a8a29e"} />
            </div>
            {freeBoost}/3
          </div>
        </div>
        <div
          onClick={() => {
            handleClickTaskItem("upgrade-fuel");
          }}
          className="bg-[#435879] bg-opacity-15 rounded-lg h-[160px] min-w-[180px] w-[180px] px-4 py-2 flex flex-col relative ml-4"
        >
          <Task3Icon width={51} height={51} />
          <div className="mt-2">
            <span className="text-white text-sm">Fuel Up</span>
          </div>
          <div className="text-slate-500 text-xs">
            Increase Fuel tanks by 2.
          </div>
          <div className="text-slate-400 absolute bottom-1 flex text-sm">
            🚀 -{fueltankpoint}pts
            <div className="px-1 pt-3">
              <DotIcon width={4} height={4} color={"#a8a29e"} />
            </div>
            Lvl {fueltank}
          </div>
        </div>
        <div
          onClick={() => {
            handleClickTaskItem("turbo-charger");
          }}
          className="mr-4 bg-[#435879] bg-opacity-15 rounded-lg h-[160px] min-w-[180px] w-[180px] px-4 py-2 flex flex-col relative ml-4"
        >
          <Task4Icon width={51} height={51} />
          <div className="mt-2">
            <span className="text-white text-sm">Turbo Boosters</span>
          </div>
          <div className="text-slate-500 text-xs">
            Each level up increases the base score earned...
          </div>
          <div className="text-slate-400 absolute bottom-1 flex text-sm">
            🚀 -{turborpoint}pts
            <div className="px-1 pt-3">
              <DotIcon width={4} height={4} color={"#a8a29e"} />
            </div>
            Lvl {turboCharger}
          </div>
        </div>
      </div>
      <div className="mx-4 mt-3 text-white text-md">Tasks ({tasks.length})</div>
      <div className="flex flex-col">
        {tasks.map((item, index) => (
          <div
            className="mx-4 my-2 px-3 py-2 rounded-xl flex justify-between border border-[#173560]"
            onClick={() => {
              if (item.status) return;
              handleClickTaskItem(item.event);
            }}
            key={index}
          >
            <div className="w-4/5 flex flex-col">
              <span className="text-white text-md font-medium capitalize">
                {item.title}
              </span>
              {item.point && (
                <div className="mt-2 flex items-center text-slate-400 text-sm">
                  {item.status ? (
                    <span className="border rounded border-[#000] bg-emphasize-sm p-[1px]">
                      <CheckIcon width={14} height={14} color={"white"} />
                    </span>
                  ) : (
                    "🚀"
                  )}
                  &nbsp;+ {item.point.toLocaleString()} pts
                </div>
              )}
            </div>
            <div className="text-white text-sm flex items-center">
              {item.status ? (
                "Done"
              ) : (
                <RightIcon width={18} height={18} color={"white"} />
              )}
            </div>
          </div>
        ))}
        <RedirectBtn url={"https://alphanomics.io/connect"} className="w-full">
          <div
            className="mx-4 my-2 px-3 py-2 rounded-xl flex justify-between border border-[#173560]"
            onClick={handleClick}
          >
            <div className="w-4/5 flex flex-col">
              <span className="text-white text-md font-medium capitalize">
                Create & Connect wallet with Alphanomics
              </span>
              <div className="mt-2 flex items-center text-slate-400 text-sm">
                {eligibility ? (
                  <span className="border rounded border-[#000] bg-emphasize-sm p-[1px]">
                    <CheckIcon width={14} height={14} color={"white"} />
                  </span>
                ) : (
                  "🚀"
                )}
                &nbsp;+ 20,000 pts
              </div>
            </div>
            <div className="text-white text-sm flex items-center">
              {eligibility ? (
                "Done"
              ) : (
                <RightIcon width={18} height={18} color={"white"} />
              )}
            </div>
          </div>
        </RedirectBtn>
      </div>
      <TaskModal
        selected={selectedTaskItem}
        show={selectedTaskItem}
        onClose={handleCloseModal}
      />
      {show && <EligibilityModal show={show} onClose={handleClick} />}
    </div>
  );
};

export default Tasks;

// border border-[#000] bg-emphasize-sm

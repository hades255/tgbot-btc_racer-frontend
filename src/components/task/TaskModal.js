import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setScore,
  upgradeDailyBonus,
  upgradeDailyBonusVisit,
  upgradeTturboCharger,
  upgradeUser,
} from "../../redux/authSlice";
import { addToast } from "../../redux/toastSlice";
import { boost, upgrade, upgradeFuel } from "../../redux/fuelSlice";
import { useAuth } from "../../contexts/AuthContext";
import { BACKEND_PATH } from "../../constants/config";
import { fuelTankPoints, turborPoints } from "../../helper/points";
import Modal from "../common/Modal";
import BtnDark from "../common/button/BtnDark";
import RedirectBtn from "../common/button/RedirectBtn";
import DotIcon from "../../assets/icons/Dot";
import RocketIcon from "../../assets/icons/Rocket";
import Saturn1Icon from "../../assets/icons/Saturn1";
import Task3Icon from "../../assets/icons/tasks/Task3";
import Task4Icon from "../../assets/icons/tasks/Task4";

const TaskModal = ({ selected, onClose, show }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    userId,
    point,
    turboCharger,
    followTwitter,
    joinNewsletter,
    joinAnnouncementChannel,
    eligibility,
  } = useAuth();
  const { freeBoost, fueltank, fuelcount, fuelcapacity, autopilot } =
    useSelector((state) => state.fuel);
  const fueltankpoint = useMemo(() => fuelTankPoints(fueltank), [fueltank]);
  const turborpoint = useMemo(() => turborPoints(turboCharger), [turboCharger]);
  const unlockAuthPilot = useMemo(
    () =>
      followTwitter && joinNewsletter && joinAnnouncementChannel && eligibility,
    [followTwitter, joinNewsletter, joinAnnouncementChannel, eligibility]
  );

  const handleClose = useCallback(() => onClose(false), [onClose]);

  const handleClickUnlock = useCallback(() => {
    if (unlockAuthPilot) {
      if (autopilot.enabled) return;
      (async () => {
        try {
          await axios.get(
            `${BACKEND_PATH}/race/activate-autopilot?userId=${userId}`
          );
          dispatch(addToast({ message: "Success!", type: "success" }));
          dispatch(
            upgradeFuel({
              key: "autopilot",
              value: {
                enabled: true,
                started: null,
                earned: 0,
              },
            })
          );
        } catch (error) {
          console.log(error);
          dispatch(addToast({ message: error.message, type: "error" }));
        } finally {
          handleClose();
        }
      })();
    } else navigate("/surprise");
  }, [navigate, dispatch, userId, unlockAuthPilot, autopilot, handleClose]);

  const handleClickReloadFuel = useCallback(() => {
    if (freeBoost < 0 || fuelcount >= fuelcapacity) {
      dispatch(
        addToast({
          message:
            "You've reached the maximum level and cannot upgrade further.",
          type: "warn",
        })
      );
    } else {
      (async () => {
        try {
          await axios.get(`${BACKEND_PATH}/race/boost?userId=${userId}`);
          dispatch(addToast({ message: "Boost success", type: "success" }));
          dispatch(boost());
        } catch (error) {
          console.log(error);
          dispatch(addToast({ message: error.message, type: "error" }));
        }
      })();
    }
    handleClose();
  }, [freeBoost, dispatch, userId, handleClose, fuelcount, fuelcapacity]);

  const handleClickUpgradeFuel = useCallback(() => {
    if (fueltankpoint > point) {
      dispatch(
        addToast({
          message: "You have insufficient points for the upgrade.",
          type: "warn",
        })
      );
    } else {
      (async () => {
        try {
          await axios.get(`${BACKEND_PATH}/race/upgrade-fuel?userId=${userId}`);
          dispatch(addToast({ message: "success", type: "success" }));
          dispatch(upgrade());
          dispatch(setScore(point - fueltankpoint));
        } catch (error) {
          console.log(error);
          dispatch(addToast({ message: error.message, type: "error" }));
        }
      })();
    }
    handleClose();
  }, [dispatch, userId, point, fueltankpoint, handleClose]);

  const handleTurborCharger = useCallback(() => {
    if (turborpoint > point) {
      dispatch(
        addToast({
          message: "You have insufficient points for the upgrade.",
          type: "warn",
        })
      );
    } else {
      (async () => {
        try {
          await axios.get(
            `${BACKEND_PATH}/user/upgrade-turbor?userId=${userId}`
          );
          dispatch(addToast({ message: "success", type: "success" }));
          dispatch(upgradeTturboCharger());
          dispatch(setScore(point - turborpoint));
        } catch (error) {
          console.log(error);
          dispatch(addToast({ message: error.message, type: "error" }));
        }
      })();
    }
    handleClose();
  }, [dispatch, turborpoint, point, userId, handleClose]);

  const handleClickDailyReward = useCallback(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${BACKEND_PATH}/user/bonus?userId=${userId}`
        );
        dispatch(setScore(response.data.data));
        dispatch(upgradeDailyBonus());
        dispatch(
          addToast({
            message: "You've completed the task and earned points.",
            type: "success",
          })
        );
      } catch (error) {
        console.log(error);
      }
      handleClose();
    })();
  }, [dispatch, userId, handleClose]);

  const handleClickDailyVisit = useCallback(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${BACKEND_PATH}/user/bonus-visit?userId=${userId}`
        );
        dispatch(setScore(response.data.data));
        dispatch(upgradeDailyBonusVisit());
        dispatch(
          addToast({
            message: "You've completed the task and earned points.",
            type: "success",
          })
        );
      } catch (error) {
        console.log(error);
      }
      handleClose();
    })();
  }, [dispatch, userId, handleClose]);

  const handleClickFollowX = useCallback(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${BACKEND_PATH}/user/bonus-followx?userId=${userId}`
        );
        dispatch(setScore(response.data.data));
        dispatch(upgradeUser([{ key: "followTwitter", value: true }]));
        dispatch(
          addToast({
            message: "You've completed the task and earned points.",
            type: "success",
          })
        );
      } catch (error) {
        console.log(error);
      }
      handleClose();
    })();
  }, [dispatch, userId, handleClose]);

  const handleClicJoinAnnouncement = useCallback(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${BACKEND_PATH}/user/bonus-joinannouncement?userId=${userId}`
        );
        dispatch(setScore(response.data.data));
        dispatch(
          upgradeUser([{ key: "joinAnnouncementChannel", value: true }])
        );
        dispatch(
          addToast({
            message: "You've completed the task and earned points.",
            type: "success",
          })
        );
      } catch (error) {
        console.log(error);
      }
      handleClose();
    })();
  }, [dispatch, userId, handleClose]);

  const handleClickjoinNewsletter = useCallback(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${BACKEND_PATH}/user/bonus-joinnewsletter?userId=${userId}`
        );
        dispatch(setScore(response.data.data));
        dispatch(upgradeUser([{ key: "joinNewsletter", value: true }]));
        dispatch(
          addToast({
            message: "You've completed the task and earned points.",
            type: "success",
          })
        );
      } catch (error) {
        console.log(error);
      }
      handleClose();
    })();
  }, [dispatch, userId, handleClose]);

  const handleClickCompleteIdentity = useCallback(
    () =>
      dispatch(
        addToast({
          message: "You have not fulfilled the requirements of this task.",
          type: "error",
        })
      ),
    [dispatch]
  );

  const tasks = useMemo(
    () => ({
      "auto-driving": {
        icon: (
          <div className="flex flex-col">
            <div className="my-2 flex justify-center">
              <Saturn1Icon width={60} height={60} color={"random"} />
            </div>
            <div className="flex justify-center my-2">
              <span className="ml-1 px-1 text-xs bg-emphasize-new rounded text-white">
                New
              </span>
            </div>
          </div>
        ),
        title: "Auto Pilot",
        content: unlockAuthPilot
          ? "Plays the game authmatically while you're away, so you're always earning points. Auto-pilot lasts up to 3 hours or until you launch the game again."
          : "Link your Telegram to your Alphanomics account and pass identity verification on Alphanomics to unlock Auto-driving. This lets you automatically play the game while you’re away, so you’re always earning points.",
        subcontent: (
          <div className="text-slate-400 flex items-center">
            <span className="mx-2 text-sm text-white">🚀 Free</span>
            <DotIcon width={4} height={4} color={"#a8a29e"} />
            <span className="ml-2 text-sm">Lvl 0</span>
          </div>
        ),
        button: unlockAuthPilot
          ? autopilot.enabled
            ? "Activated"
            : "Boost Now"
          : "Learn More",
        disabled: autopilot.enabled,
        action: handleClickUnlock,
      },
      "reload-fuel": {
        icon: (
          <div className="flex flex-col">
            <div className="my-2 flex justify-center">
              <RocketIcon width={60} height={60} color={"random"} />
            </div>
          </div>
        ),
        title: "Rocket Pack Refill",
        content: "Enjoy 3 free rocket pack refills every day!",
        subcontent: (
          <div className="text-sm text-slate-400 flex">
            <span className="text-white">🚀 Free</span>
            <div className="px-2 pt-3">
              <DotIcon width={4} height={4} color={"#a8a29e"} />
            </div>
            <div className="flex items-center text-slate-400">
              <span className="text-md">{freeBoost}/3</span>
            </div>
          </div>
        ),
        button: "Boost Now",
        action: handleClickReloadFuel,
      },
      "upgrade-fuel": {
        icon: (
          <div className="flex flex-col">
            <div className="my-2 flex justify-center">
              <Task3Icon width={60} height={60} color={"random"} />
            </div>
          </div>
        ),
        title: "Fuel Up",
        content: "Increase fuel tank by 2!",
        subcontent: (
          <div className="text-sm text-slate-400 flex">
            <span className="text-white">
              🚀 -{fueltankpoint.toLocaleString()}pts
            </span>
            <div className="px-2 pt-3">
              <DotIcon width={4} height={4} color={"#a8a29e"} />
            </div>
            <div className="flex items-center text-slate-400">
              <span className="text-md">Lvl {fueltank}</span>
            </div>
          </div>
        ),
        button: "Boost Now",
        action: handleClickUpgradeFuel,
      },
      "turbo-charger": {
        icon: (
          <div className="flex flex-col">
            <div className="my-2 flex justify-center">
              <Task4Icon width={60} height={60} color={"random"} />
            </div>
          </div>
        ),
        title: "Turbo Booster",
        content: "Each level up increases the base score earned by 10 points",
        subcontent: (
          <div className="text-sm text-slate-400 flex">
            <span className="text-white">
              🚀 -{turborpoint.toLocaleString()}pts
            </span>
            <div className="px-2 pt-3">
              <DotIcon width={4} height={4} color={"#a8a29e"} />
            </div>
            <div className="flex items-center text-slate-400">
              <span className="text-md">Lvl {turboCharger}</span>
            </div>
          </div>
        ),
        button: "Boost Now",
        action: handleTurborCharger,
      },
      "complete-identity": {
        title: "Connect Telegram and complete identity verification",
        content:
          "Link your Telegram account using the 'Connected accounts' option in the User Center on the Alphanomics website. Then, complete the KYC verification with your ID. More details on the 'Surprises' page.",
        button: "I have completed the verification",
        action: handleClickCompleteIdentity,
      },
      "daily-reward": {
        title: "Daily Rewards - Check In",
        content: "Check in daily to earn rewards",
        button: "Check in",
        action: handleClickDailyReward,
      },
      "daily-visit": {
        title: "Daily Rewards - Visit Alphanomics Platform",
        content: "Check in daily to earn rewards",
        button: "Check in",
        action: handleClickDailyVisit,
        redirect: "https://platform.alphanomics.io/",
      },
      "follow-twitter": {
        title: "Follow Alphanomics official Twitter",
        content: "Follow Alphanomics official twitter for extra points!",
        button: "Go now",
        action: handleClickFollowX,
        redirect: "x.com/alphanomics_io",
      },
      "announcement-channel": {
        title: "Join announcement channel",
        content: "Follow Alphanomics official twitter for extra points!",
        button: "Go now",
        redirect: "http://t.me/anom_invaders_official_news",
        action: handleClicJoinAnnouncement,
      },
      "newsletter-channel": {
        title: "Join Newsletter substack",
        content: "Follow Alphanomics official twitter for extra points!",
        button: "Go now",
        redirect: "https://alphanomicsresearch.substack.com/",
        action: handleClickjoinNewsletter,
      },
    }),
    [
      freeBoost,
      fueltankpoint,
      fueltank,
      turborpoint,
      turboCharger,
      unlockAuthPilot,
      autopilot,
      handleClickReloadFuel,
      handleClickUpgradeFuel,
      handleClickUnlock,
      handleTurborCharger,
      handleClickCompleteIdentity,
      handleClickDailyReward,
      handleClickDailyVisit,
      handleClickFollowX,
      handleClicJoinAnnouncement,
      handleClickjoinNewsletter,
    ]
  );

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={
        show ? (
          <div className="mt-8 flex flex-col">
            {tasks[selected].icon && tasks[selected].icon}
            <span>{tasks[selected].title}</span>
          </div>
        ) : (
          ""
        )
      }
      className={"items-end"}
    >
      {show && (
        <div className="flex flex-col">
          <div className="flex justify-center">
            <span className="mx-4 text-[#9E9E9E] text-[18px] text-wrap text-center">
              {tasks[selected].content}
            </span>
          </div>
          {tasks[selected].subcontent && (
            <div className="flex justify-center my-2">
              {tasks[selected].subcontent}
            </div>
          )}
          <div className="flex justify-center my-4 mx-4">
            {tasks[selected].redirect ? (
              <RedirectBtn url={tasks[selected].redirect} className="w-full">
                <BtnDark
                  onClick={tasks[selected].action}
                  disabled={tasks[selected].disabled}
                >
                  {tasks[selected].button}
                </BtnDark>
              </RedirectBtn>
            ) : (
              <BtnDark
                onClick={tasks[selected].action}
                disabled={tasks[selected].disabled}
              >
                {tasks[selected].button}
              </BtnDark>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default TaskModal;

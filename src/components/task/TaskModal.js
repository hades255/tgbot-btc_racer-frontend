import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../common/Modal";
import { boost, upgrade } from "../../redux/fuelSlice";
import DotIcon from "../../assets/icons/Dot";
import RocketIcon from "../../assets/icons/Rocket";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Saturn1Icon from "../../assets/icons/Saturn1";
import { addToast } from "../../redux/toastSlice";
import {
  setScore,
  upgradeDailyBonus,
  upgradeDailyBonusVisit,
  upgradeTturboCharger,
} from "../../redux/authSlice";
import BtnDark from "../common/button/BtnDark";
import { useNavigate } from "react-router-dom";
import RedirectBtn from "../common/button/RedirectBtn";
import { BACKEND_PATH } from "../../constants/config";
import { fuelTankPoints, turborPoints } from "../../helper/points";

const TaskModal = ({ selected, onClose, show }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId, point, turboCharger } = useAuth();
  const { freeBoost, fueltank, fuelcount, fuelcapacity } = useSelector(
    (state) => state.fuel
  );
  const fueltankpoint = useMemo(() => fuelTankPoints(fueltank), [fueltank]);
  const turborpoint = useMemo(() => turborPoints(turboCharger), [turboCharger]);

  const handleClose = useCallback(() => onClose(false), [onClose]);

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

  const handleClickUnlock = useCallback(
    () => navigate("/surprise"),
    [navigate]
  );

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

  const tasks = useMemo(
    () => ({
      "auto-driving": {
        icon: (
          <div className="flex flex-col">
            <div className="my-2 flex justify-center">
              <div className="w-[70px] h-[70px] flex justify-center items-center bg-[#1A2B47] rounded-xl">
                <Saturn1Icon width={60} height={60} color={"random"} />
              </div>
            </div>
            <div className="flex justify-center my-2">
              <span className="ml-1 px-1 text-xs bg-emphasize-new rounded text-white">
                New
              </span>
            </div>
          </div>
        ),
        title: "Auto Pilot",
        content:
          "Link your Telegram to your Alphanomics account and pass identity verification on Alphanomics to unlock Auto-driving. This lets you automatically play the game while you’re away, so you’re always earning points.",
        subcontent: (
          <div className="text-slate-400 flex items-center">
            <span className="mx-2 text-sm text-white">🚀 Free</span>
            <DotIcon width={4} height={4} color={"#a8a29e"} />
            <span className="ml-2 text-sm">Lvl 0</span>
          </div>
        ),
        button: "Learn More",
        action: handleClickUnlock,
      },
      "reload-fuel": {
        icon: (
          <div className="flex flex-col">
            <div className="my-2 flex justify-center">
              <div className="w-[70px] h-[70px] flex justify-center items-center bg-[#1A2B47] rounded-xl">
                <RocketIcon width={60} height={60} color={"random"} />
              </div>
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
              <div className="w-[70px] h-[70px] flex justify-center items-center bg-[#1A2B47] rounded-xl">
                <RocketIcon width={60} height={60} color={"random"} />
              </div>
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
              <div className="w-[70px] h-[70px] flex justify-center items-center bg-[#1A2B47] rounded-xl">
                <RocketIcon width={60} height={60} color={"random"} />
              </div>
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
      "follow-twitter": {
        title: "Follow Alphanomics official Twitter",
        content: "Follow Alphanomics official twitter for extra points!",
        button: "Go now",
        action: () => {},
        redirect: "https://x.com/okx?s=11",
      },
      "daily-reward": {
        title: "Daily Rewards",
        content: "Check in daily to earn rewards",
        button: "Check in",
        action: handleClickDailyReward,
      },
      "daily-visit": {
        title: "Daily points visiting Alphanomics platform",
        content: "Check in daily to earn rewards",
        button: "Check in",
        action: handleClickDailyVisit,
      },
      "announcement-channel": {
        title: "Join announcement channel",
        content: "Follow Alphanomics official twitter for extra points!",
        button: "Go now",
        redirect: "https://www.okx.com/join",
        action: () => {},
      },
      "newsletter-channel": {
        title: "Join Newsletter substack",
        content: "Follow Alphanomics official twitter for extra points!",
        button: "Go now",
        redirect: "https://www.okx.com/join",
        action: () => {},
      },
    }),
    [
      freeBoost,
      fueltankpoint,
      fueltank,
      turborpoint,
      turboCharger,
      handleClickReloadFuel,
      handleClickUpgradeFuel,
      handleClickUnlock,
      handleTurborCharger,
      handleClickCompleteIdentity,
      handleClickDailyReward,
      handleClickDailyVisit,
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
            <span className="mx-4 text-slate-500 text-[16px] text-wrap text-center">
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
                <BtnDark onClick={tasks[selected].action}>
                  {tasks[selected].button}
                </BtnDark>
              </RedirectBtn>
            ) : (
              <BtnDark onClick={tasks[selected].action}>
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

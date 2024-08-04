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
import { setScore, upgradeTturboCharger } from "../../redux/authSlice";
import BtnDark from "../common/button/BtnDark";
import { useNavigate } from "react-router-dom";
import RedirectBtn from "../common/button/RedirectBtn";

export const fuelTankPoints = (lvl) => {
  switch (lvl) {
    case 0:
      return 500;
    case 1:
      return 1500;
    case 2:
      return 3000;
    case 3:
      return 6000;
    default:
      return 9000;
  }
};

export const turborPoints = (lvl) => {
  switch (lvl) {
    case 0:
      return 1000;
    case 1:
      return 3000;
    case 2:
      return 5000;
    case 3:
      return 10000;
    default:
      return 15000;
  }
};

const TaskModal = ({ selected, onClose, show }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId, point, turboCharger } = useAuth();
  const { freeBoost, fueltank } = useSelector((state) => state.fuel);
  const fueltankpoint = useMemo(() => fuelTankPoints(fueltank), [fueltank]);
  const turborpoint = useMemo(() => turborPoints(turboCharger), [turboCharger]);

  const handleClickReloadFuel = useCallback(() => {
    if (freeBoost < 0) {
      dispatch(
        addToast({
          message:
            "You've reached the maximum level and cannot upgrade further.",
          type: "warn",
        })
      );
      return;
    }
    (async () => {
      try {
        //  todo
        await axios.get(
          `https://d6bf-172-86-113-74.ngrok-free.app/race/boost?userId=${userId}`
          // "http://127.0.0.1:5000/race/boost?userId=" + userId
        );
        dispatch(addToast({ message: "Boost success", type: "success" }));
        dispatch(boost());
      } catch (error) {
        console.log(error);
        dispatch(addToast({ message: error.message, type: "error" }));
      }
    })();
  }, [freeBoost, dispatch, userId]);

  const handleClickUpgradeFuel = useCallback(() => {
    if (fueltankpoint > point) {
      dispatch(
        addToast({
          message: "You have insufficient points for the upgrade.",
          type: "warn",
        })
      );
      return;
    }
    (async () => {
      try {
        //  todo
        await axios.get(
          `https://d6bf-172-86-113-74.ngrok-free.app/race/boost?userId=${userId}`
          // "http://127.0.0.1:5000/race/upgrade-fuel?userId=" + userId
        );
        dispatch(addToast({ message: "success", type: "success" }));
        dispatch(upgrade());
        dispatch(setScore(point - fueltankpoint));
      } catch (error) {
        console.log(error);
        dispatch(addToast({ message: error.message, type: "error" }));
      }
    })();
  }, [dispatch, userId, point, fueltankpoint]);

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
      return;
    }
    (async () => {
      try {
        //  todo
        await axios.get(
          `https://d6bf-172-86-113-74.ngrok-free.app/race/boost?userId=${userId}`
          // "http://127.0.0.1:5000/user/upgrade-turbor?userId=" + userId
        );
        dispatch(addToast({ message: "success", type: "success" }));
        dispatch(upgradeTturboCharger());
        dispatch(setScore(point - turborpoint));
      } catch (error) {
        console.log(error);
        dispatch(addToast({ message: error.message, type: "error" }));
      }
    })();
  }, [dispatch, turborpoint, point, userId]);

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

  const handleClickDailyReward = useCallback(
    () =>
      dispatch(
        addToast({
          message: "You've completed the task and earned points.",
          type: "success",
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
        title: "Auto Cap",
        content:
          "Link your Telegram to your Alphanomics account and pass identity verification on Alphanomics to unlock Auto-driving. This lets you automatically play the game while you’re away, so you’re always earning points.",
        subcontent: (
          <div className="text-slate-400 flex items-center">
            <span className="mx-2 text-sm text-white">🚀 Free</span>
            <DotIcon width={4} height={4} color={"#a8a29e"} />
            <span className="ml-2 text-xs">Lvl 0</span>
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
        title: "Reload Fuel Task",
        content: "Enjoy 3 free fuel tank refills every day!",
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
        title: "Fuel Tank",
        content: "Increase your maximun fuel tank by 2!",
        subcontent: (
          <div className="text-sm text-slate-400 flex">
            <span className="text-white">🚀 -{fueltankpoint}pts</span>
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
        title: "Turbo Charger",
        content: "Each level up increases the base score earned by 10 points",
        subcontent: (
          <div className="text-sm text-slate-400 flex">
            <span className="text-white">🚀 -{turborpoint}pts</span>
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
      "announcement-channel": {
        title: "Join announcement channel",
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
            <span className="mx-4 text-slate-500 text-xs text-wrap text-center">
              {tasks[selected].content}
            </span>
          </div>
          {tasks[selected].subcontent && (
            <div className="flex justify-center my-2">
              {tasks[selected].subcontent}
            </div>
          )}
          <div className="flex justify-center mt-4 mb-6"></div>
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

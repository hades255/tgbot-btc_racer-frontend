import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import axios from "axios";
import { fix2 } from "../helper/func";
import { BACKEND_PATH } from "../constants/config";
import { setScore } from "../redux/authSlice";
import { decrease } from "../redux/fuelSlice";
import { useAuth } from "../contexts/AuthContext";
import { usePlaySound } from "../contexts/SoundContext";
import Records from "../components/race/Records";
import MusicBtn from "../components/race/MusicBtn";
import EthChart from "../components/race/EthChart";
import FuelSlider from "../components/race/FuelSlider";
import EmojiIcon from "../assets/icons/Emoji";
import RightIcon from "../assets/icons/Right";
import MoonBtnIcon from "../assets/icons/MoonBtn";
import DoomBtnIcon from "../assets/icons/DoomBtn";
import LoadingIcon from "../assets/icons/loading";
import TrendingUp from "../assets/icons/TrendingUP";
import TrendingDown from "../assets/icons/TrendingDown";
import countSfx from "../assets/audios/countdown.mp3";
import betSfx from "../assets/audios/bet.mp3";
import winSfx from "../assets/audios/win.mp3";
import loseSfx from "../assets/audios/lose.mp3";
import VideoBackground from "../components/race/VideoBackground";
import { addToast } from "../redux/toastSlice";

const Race = () => {
  const dispatch = useDispatch();
  const { userId, point, turboCharger } = useAuth();
  const { fuelcount, cooldown, fuelcapacity } = useSelector(
    (state) => state.fuel
  );
  const { curPrice } = useSelector((state) => state.eth);
  const { sound } = usePlaySound();

  const [playCountSfx] = useSound(countSfx, { soundEnabled: sound });
  const [playBetSfx] = useSound(betSfx, { soundEnabled: sound });
  const [playWinSfx] = useSound(winSfx, { soundEnabled: sound });
  const [playLoseSfx] = useSound(loseSfx, { soundEnabled: sound });

  const [count, setCount] = useState(0);
  const [bet, setBet] = useState(null);
  const [betAmount, setBetAmount] = useState(0);
  const [betCompareAmount, setBetCompareAmount] = useState(0);
  const [betResult, setBetResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const compareETH = useCallback(
    (price) => {
      (async () => {
        try {
          setBetCompareAmount(price);
          const result =
            (bet === "moon" && betAmount <= price) ||
            (bet === "doom" && betAmount > price);
          if (result) playWinSfx();
          else playLoseSfx();
          setBetResult(result);
          const res = await axios.post(`${BACKEND_PATH}/race`, {
            guess: bet,
            pointAmount: 10 + 10 * turboCharger,
            result,
            userId: userId,
          });
          if (res.data.data) dispatch(setScore(res.data.data));
        } catch (error) {
          console.log(error);
        }
      })();
    },
    [bet, betAmount, userId, turboCharger, dispatch, playWinSfx, playLoseSfx]
  );

  useEffect(() => {
    let timer;
    if (bet && count > 0) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [bet, count]);

  useEffect(() => {
    if (bet && betResult === null && count === 0) {
      compareETH(curPrice);
    }
  }, [bet, count, compareETH, curPrice, betResult]);

  useEffect(() => {
    let timer;
    if (betResult !== null) {
      timer = setInterval(() => {
        setBetResult(null);
        setBet(null);
        setBetAmount(0);
      }, 4000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [betResult]);

  const bettingAction = useCallback(
    (param) => {
      if (bet) {
        dispatch(
          addToast({
            message: "You could not bet while its running.",
            type: "warn",
          })
        );
        return;
      }
      if (fuelcount <= 0) {
        dispatch(
          addToast({
            message: "Please wait refill.",
            type: "warn",
          })
        );
        return;
      }
      playBetSfx();
      setBet(param);
      setBetAmount(curPrice);
      setCount(5);
      dispatch(decrease());
      setTimeout(() => {
        playCountSfx();
      }, 1000);
    },
    [bet, curPrice, fuelcount, playBetSfx, playCountSfx, dispatch]
  );

  const handleClickMoon = useCallback(
    () => bettingAction("moon"),
    [bettingAction]
  );

  const handleClickDoom = useCallback(
    () => bettingAction("doom"),
    [bettingAction]
  );

  const handleShowRaces = useCallback(() => setShowResults(true), []);
  const hideRecordsModal = useCallback((value) => setShowResults(value), []);

  return (
    <div>
      <div className="mt-4 flex flex-row justify-between items-center">
        <div className="ml-6">
          <MusicBtn />
        </div>
        <div
          className="rounded-s-2xl hover:cursor-pointer bg-button-1"
          onClick={handleShowRaces}
        >
          <div className="h-7 w-28 flex items-center">
            <span className="text-white text-sm ml-3 mr-2">My records</span>
            <RightIcon width={12} height={12} color={"white"} />
          </div>
        </div>
      </div>
      <div className="mt-4 mb-24 w-full flex-col">
        <div
          className={`h-14 w-full flex justify-center items-center ${
            bet ? "block" : "hidden"
          }`}
        >
          <span className="text-white text-5xl text-shadow-xl font-digital font-medium">
            00:0{count}
          </span>
        </div>
        <div className={`h-14 ${bet ? "hidden" : "block"}`}>
          <div className="flex justify-center items-center">
            <span className="text-[20px]">💎</span>
            <div className="text-slate-400 text-md mx-1 pr-1">
              Diamonds Collected
            </div>
          </div>
          <div className="flex justify-center text-[48px] text-white font-bold font-dmsans_extrabold">
            {point.toLocaleString()}
          </div>
        </div>
        <div className="mt-4 w-full flex-col">
          <div className="w-full flex justify-center relative">
            <VideoBackground show={bet} />
            <EthChart bet={bet} betAmount={betAmount} />
            <div className="absolute bottom-0 flex justify-center items-center">
              🚀
              <FuelSlider progress={fuelcount / fuelcapacity} />
              <span className="text-white text-sm">{fuelcount}/</span>
              <span className="text-slate-400 text-sm">{fuelcapacity}</span>
            </div>
          </div>
          <div className="flex justify-center mt-1">
            <span className="text-white text-[24px] font-bold font-dmsans_bold">
              ${curPrice.toLocaleString()}
            </span>
          </div>
          <div className="relative h-8 w-full">
            {fuelcount !== fuelcapacity && (
              <div className="flex justify-center">
                <div className="bg-fuel-gradient w-[200px] h-[36px] rounded-3xl flex justify-center">
                  <div className="bg-fuel-sub-gradient w-[196px] h-[34px] rounded-3xl flex justify-center items-center">
                    <span className="text-sm text-slate-400 mr-1">
                      Next refill in
                    </span>
                    <span className="text-sm text-white">
                      0{cooldown >= 60 ? 1 : 0}:{cooldown % 60 < 10 ? 0 : ""}
                      {cooldown % 60}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="my-4">
          <div className="flex justify-center text-sm text-slate-300">
            Guess the ETH price in the next 5 secs
          </div>
          <div className="mt-4 flex justify-center">
            <div className="relative">
              <MoonBtnIcon color={"#094200"} />
              <div className="absolute bottom-1 right-1 transform transition-transform duration-150 active:translate-y-1 hover:cursor-pointer">
                <MoonBtnIcon color={"#52C609"} />
                <div
                  onClick={handleClickMoon}
                  className="absolute top-0 flex w-full h-full justify-center items-center"
                >
                  <span
                    className={`${
                      bet === null ? "text-white" : "text-slate-500"
                    } font-bold font-dmsans_bold text-[24px]`}
                  >
                    PUMP
                  </span>
                  <div className="ml-1 mt-1">
                    <TrendingUp width={28} height={28} color={"white"} />
                  </div>
                </div>
              </div>
            </div>
            <div className="-ml-4 relative">
              <DoomBtnIcon color={"#870000"} />
              <div
                onClick={handleClickDoom}
                className="absolute bottom-1 right-1 transform transition-transform duration-150 active:translate-y-1 hover:cursor-pointer"
              >
                <DoomBtnIcon color={"#FF3F35"} />
                <div className="absolute top-0 flex w-full h-full justify-center items-center">
                  <span
                    className={`${
                      bet === null ? "text-white" : "text-slate-500"
                    } font-bold font-dmsans_bold text-[24px]`}
                  >
                    DUMP
                  </span>
                  <div className="ml-1 mt-1">
                    <TrendingDown width={28} height={28} color={"white"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <span className="text-slate-300 text-sm">
            The more 💎 you have, the more
          </span>
        </div>
        <div className="flex justify-center">
          <span className="text-slate-300 text-sm">
            ANOM reward points you will
          </span>
        </div>
        <div className="flex justify-center">
          <span className="text-slate-300 text-sm">convert in future.</span>
        </div>
      </div>
      {betResult !== null && (
        <div className="z-20 fixed h-full w-full flex justify-center items-center top-0 left-0 bg-[#101010a4]">
          <div className="flex flex-col">
            <div className="flex justify-center text-shadow-2xl">
              {betResult ? (
                <span className="text-[37px]">💎</span>
              ) : (
                <EmojiIcon width={37} height={37} color={"random"} />
              )}
            </div>
            <div className="flex text-white text-[100px] font-bold text-shadow-2xl justify-center">
              <span className="font-dmsans_extrabold">
                {betResult ? "WIN" : "LOSE"}
              </span>
            </div>
            <div className="text-white text-[20px] font-bold font-dmsans_bold text-shadow-xl flex justify-center">
              <span className="font-dmsans_bold font-bold">ETH</span>
              <span
                className={`${
                  betCompareAmount - betAmount > 0
                    ? "text-green-500"
                    : "text-red-700"
                } mx-1`}
              >
                {betCompareAmount - betAmount > 0 && "+"}
                {betAmount
                  ? fix2(((betCompareAmount - betAmount) / betAmount) * 100, 4)
                  : 0}
              </span>
              %
            </div>
            <div className="text-[20px] font-bold text-shadow-xl flex justify-center">
              <span className="font-dmsans_bold text-white">${betAmount}</span>
              <span className="font-dmsans_bold text-slate-400 mx-1">to</span>
              <span className="font-dmsans_bold text-white">
                ${betCompareAmount}
              </span>
            </div>
          </div>
        </div>
      )}
      {showResults && <Records show={showResults} onClose={hideRecordsModal} />}
      {!curPrice && (
        <div className="fixed top-0 left-0 z-30 w-full h-screen bg-[#000000] opacity-80 flex justify-center items-center">
          <div className="animate-spin">
            <LoadingIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default Race;

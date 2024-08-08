import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Records from "../components/race/Records";
import { useAuth } from "../contexts/AuthContext";
import { setScore } from "../redux/authSlice";
import RightIcon from "../assets/icons/Right";
import MoonBtnIcon from "../assets/icons/MoonBtn";
import DoomBtnIcon from "../assets/icons/DoomBtn";
import EthChart from "../components/race/EthChart";
import FuelSlider from "../components/race/FuelSlider";
import TrendingUp from "../assets/icons/TrendingUP";
import TrendingDown from "../assets/icons/TrendingDown";
import EmojiIcon from "../assets/icons/Emoji";
import { decrease } from "../redux/fuelSlice";
import MusicBtn from "../components/race/MusicBtn";
import { BACKEND_PATH } from "../constants/config";
import { fix2 } from "../helper/func";
import LoadingIcon from "../assets/icons/loading";

const Race = () => {
  const dispatch = useDispatch();
  const { userId, point, turboCharger } = useAuth();
  const { fuelcount, cooldown, fuelcapacity } = useSelector(
    (state) => state.fuel
  );
  const { curPrice } = useSelector((state) => state.eth);

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
          setBetResult(result);
          const res = await axios.post(`${BACKEND_PATH}/race`, {
            guess: bet,
            pointAmount: 10 + 10 * turboCharger,
            result,
            userId: userId,
          });

          dispatch(setScore(res.data.data));
        } catch (error) {
          console.log(error);
        }
      })();
    },
    [bet, betAmount, userId, turboCharger, dispatch]
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
      }, 3000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [betResult]);

  const handleClickMoon = useCallback(() => {
    if (bet) return;
    setBet("moon");
    setBetAmount(curPrice);
    setCount(5);
    dispatch(decrease());
  }, [bet, curPrice, dispatch]);

  const handleClickDoom = useCallback(() => {
    if (bet) return;
    setBet("doom");
    setBetAmount(curPrice);
    setCount(5);
    dispatch(decrease());
  }, [bet, curPrice, dispatch]);

  const handleShowRaces = useCallback(() => setShowResults(true), []);
  const hideRecordsModal = useCallback((value) => setShowResults(value), []);

  return (
    <div className="relative">
      <div className="flex flex-row justify-between">
        <div className="absolute">
          <div className="ml-6 mt-6">
            <MusicBtn />
          </div>
        </div>
        <div
          className="absolute top-4 right-0 rounded-s-2xl hover:cursor-pointer bg-button-1"
          onClick={handleShowRaces}
        >
          <div className="h-7 w-28 flex items-center">
            <span className="text-white text-xs ml-3 mr-3">My records</span>
            <RightIcon width={12} height={12} color={"white"} />
          </div>
        </div>
      </div>
      <div className="mt-16 mb-24 w-full flex-col">
        {bet ? (
          <div className="h-14 w-full flex justify-center items-center">
            <span className="text-white text-5xl text-shadow-xl font-digital">
              00:0{count}
            </span>
          </div>
        ) : (
          <div className="h-14">
            <div className="flex justify-center">
              <div className="flex items-center">
                <span className="text-[16px] px-1">💎</span>
                <div className="text-slate-400 text-sm">Diamonds Collected</div>
              </div>
            </div>
            <div className="flex justify-center text-[48px] spaced-text-4 text-white font-bold">
              {point.toLocaleString()}
            </div>
          </div>
        )}
        <div className="mt-8 w-full flex-col">
          <div className="w-full flex justify-center relative">
            <EthChart />
            <div className="absolute bottom-0 flex justify-center items-center">
              🚀
              <FuelSlider progress={fuelcount / fuelcapacity} />
              <span className="text-white text-xs">{fuelcount} /</span>
              <span className="text-slate-400 text-xs">{fuelcapacity}</span>
            </div>
          </div>
          <div className="flex justify-center mt-1 mb-4">
            <span className="text-white text-[16px] font-[700] spaced-text-2">
              ${curPrice.toLocaleString()}
            </span>
          </div>
          <div className="relative h-8 w-full">
            {fuelcount !== fuelcapacity && (
              <div className="flex justify-center">
                <div className="bg-fuel-gradient w-[200px] h-[36px] rounded-3xl flex justify-center">
                  <div className="bg-fuel-sub-gradient w-[196px] h-[34px] rounded-3xl flex justify-center items-center">
                    <span className="text-xs text-slate-400 mr-1">
                      Next refill in
                    </span>
                    <span className="text-xs text-white">
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
          <div className="flex justify-center text-xs text-slate-300">
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
                    } font-medium text-lg`}
                  >
                    PUMP IT
                  </span>
                  <div className="ml-1 mt-1">
                    <TrendingUp width={20} height={20} color={"white"} />
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
                    } font-medium text-lg`}
                  >
                    DUMP IT
                  </span>
                  <div className="ml-1 mt-1">
                    <TrendingDown width={20} height={20} color={"white"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-center mt-9">
          <RedirectBtn url="https://www.okx.com/help/okx-racer-terms-and-conditions">
            <span className="text-slate-300 text-xs">Terms and conditions</span>
          </RedirectBtn>
        </div> */}
        <div className="flex justify-center mt-3">
          <span className="text-slate-300 text-xs">
            The more 💎 you have the more ANOM
          </span>
        </div>
        <div className="flex justify-center">
          <span className="text-slate-300 text-xs">
            reward points you will have.
          </span>
        </div>
        <div className="flex justify-center mt-3">
          <span className="text-slate-300 text-[10px]">
            Claim your bonus here
          </span>
        </div>
      </div>
      {showResults && <Records show={showResults} onClose={hideRecordsModal} />}
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
            <div className="flex text-white text-8xl font-bold text-shadow-2xl justify-center">
              <span>{bet === "moon" ? "MOON" : "REKT"}</span>
            </div>
            <div className="text-white text-lg font-bold text-shadow-xl flex justify-center">
              ETH Price {betCompareAmount - betAmount > 0 && "+"}
              {betAmount
                ? fix2(((betCompareAmount - betAmount) / betAmount) * 100, 4)
                : 0}
              %
            </div>
            <div className="text-md font-bold text-shadow-xl flex justify-center">
              <span className="text-slate-400 mr-1">From</span>
              <span className="text-white">${betAmount}</span>
              <span className="text-slate-400 mx-1">to</span>
              <span className="text-white">${betCompareAmount}</span>
            </div>
          </div>
        </div>
      )}
      {!curPrice && (
        <div className="fixed top-0 left-0z-30 w-full h-screen bg-[#000000] opacity-80 flex justify-center items-center">
          <div className="animate-spin">
            <LoadingIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default Race;

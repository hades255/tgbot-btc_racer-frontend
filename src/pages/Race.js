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
import MusicIcon from "../assets/icons/Music";
import TrendingUp from "../assets/icons/TrendingUP";
import TrendingDown from "../assets/icons/TrendingDown";
import EmojiIcon from "../assets/icons/Emoji";
import { decrease } from "../redux/fuelSlice";
import FireIcon from "../assets/icons/Fire";

const Race = () => {
  const { userId, point } = useAuth();
  const dispatch = useDispatch();
  const { fuelcount, cooldown } = useSelector((state) => state.fuel);

  const [btc, setBtc] = useState(0);
  const [btc_, setBtc_] = useState(0);
  const [count, setCount] = useState(0);

  const [bet, setBet] = useState(null);
  const [betAmount, setBetAmount] = useState(0);
  const [betCompareAmount, setBetCompareAmount] = useState(0);
  const [betResult, setBetResult] = useState(null);

  const [showResults, setShowResults] = useState(false);

  const getBTC = useCallback(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
        );
        const btcPrice = response.data.bpi.USD.rate;
        setBtc(btcPrice);
        const btcPrice_ = response.data.bpi.USD.rate_float;
        setBtc_(btcPrice_);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const compareBTC = useCallback(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
        );
        const btcPrice = response.data.bpi.USD.rate_float;
        setBetCompareAmount(btcPrice);
        const result =
          (bet === "moon" && betAmount <= btcPrice) ||
          (bet === "doom" && betAmount > btcPrice);
        setBetResult(result);
        //  todo
        const res = await axios.post(
          // "http://127.0.0.1:5000/race",
          "https://d6bf-172-86-113-74.ngrok-free.app/race",
          {
            guess: bet,
            pointAmount: 10,
            result,
            userId: userId,
          }
        );

        dispatch(setScore(res.data.data));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [bet, betAmount, userId, dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      getBTC();
    }, 1000);
    return () => clearInterval(timer);
  }, [getBTC]);

  useEffect(() => {
    let timer;
    if (bet && count > 0) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }
    if (bet && count === 0) {
      compareBTC();
    }
    return () => clearInterval(timer);
  }, [bet, count, compareBTC]);

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
    setBetAmount(btc_);
    setCount(5);
    dispatch(decrease());
  }, [bet, btc_, dispatch]);

  const handleClickDoom = useCallback(() => {
    if (bet) return;
    setBet("doom");
    setBetAmount(btc_);
    setCount(5);
    dispatch(decrease());
  }, [bet, btc_, dispatch]);

  const handleShowRaces = useCallback(() => setShowResults(true), []);
  const hideRecordsModal = useCallback((value) => setShowResults(value), []);

  return (
    <div className="relative">
      <div className="flex flex-row justify-between">
        <div className="absolute p-6">
          <MusicIcon width={16} height={16} color={"white"} />
        </div>
        <div
          className="absolute top-4 right-0 p-1 px-2 rounded-s-[40px] hover:cursor-pointer"
          onClick={handleShowRaces}
        >
          <div className="flex items-center rounded-s-2xl bg-button-1 pl-4 pr-6 py-1">
            <span className="text-white text-xs mr-1">My records</span>
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
              <div className="flex">
                <span className="text-sm px-1">🔥</span>
                <div className="text-slate-400 text-sm">Available points</div>
              </div>
            </div>
            <div className="flex justify-center text-4xl text-white font-bold">
              {point}
            </div>
          </div>
        )}
        <div className="w-full flex-col">
          <div className="h-52 w-full flex justify-center overflow-hidden relative">
            <div className="absolute -bottom-8">
              <EthChart />
            </div>
          </div>
          <div className="flex justify-center items-center">
            🚀
            <FuelSlider fuel={fuelcount} />
            <span className="text-white text-xs">{fuelcount} /</span>
            <span className="text-slate-400 text-xs">10</span>
          </div>
          <div className="flex justify-center my-4">
            <span className="text-white text-md font-bold">${btc}</span>
          </div>
          <div className="relative h-8 w-full">
            {fuelcount !== 10 && (
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
          <div className="flex justify-center text-sm text-slate-300">
            Guess the BTC price in the next 5 secs
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
                  <div className="ml-1 mt-2">
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
                  <div className="ml-1 mt-2">
                    <TrendingDown width={20} height={20} color={"white"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-9">
          <span className="text-slate-300 text-xs">Terms and conditions</span>
        </div>
        <div className="flex justify-center mt-3">
          <span className="text-slate-300 text-xs">
            Complete Tasks for bonuses
          </span>
        </div>
      </div>
      {showResults && <Records show={showResults} onClose={hideRecordsModal} />}
      {betResult !== null && (
        <div className="z-20 fixed h-full w-full flex justify-center items-center top-0 left-0 bg-[#101010a4]">
          <div className="flex flex-col">
            <div className="flex justify-center">
              {betResult ? (
                <FireIcon width={37} height={37} />
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
                ? ((betCompareAmount - betAmount) / betAmount) * 100
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
    </div>
  );
};

export default Race;

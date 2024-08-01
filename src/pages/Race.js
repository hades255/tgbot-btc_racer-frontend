import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Records from "../components/race/Records";
import { useAuth } from "../contexts/AuthContext";
// import CupIcon from "../assets/icons/Cup";
import { setScore } from "../redux/authSlice";
import FuelIcon from "../assets/icons/Fuel";
import RightIcon from "../assets/icons/Right";
import MusicIcon from "../assets/icons/Music";
import TrendingUp from "../assets/icons/TrendingUP";
import TrendingDown from "../assets/icons/TrendingDown";
import EmojiIcon from "../assets/icons/Emoji";

const Race = () => {
  const dispatch = useDispatch();
  const { userId, point } = useAuth();
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
        // const res = await axios.post("http://127.0.0.1:5000/race", {
        const res = await axios.post(
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
    setBet("moon");
    setBetAmount(btc_);
    setCount(5);
  }, [btc_]);

  const handleClickDoom = useCallback(() => {
    setBet("doom");
    setBetAmount(btc_);
    setCount(5);
  }, [btc_]);

  const handleShowRaces = useCallback(() => setShowResults(true), []);
  const hideRecordsModal = useCallback((value) => setShowResults(value), []);

  return (
    <div className="relative">
      <div className="flex flex-row justify-between">
        <div className="fixed p-6">
          <MusicIcon width={16} height={16} color={"white"} />
        </div>
        <div
          className="fixed top-4 right-0 p-1 px-2 rounded-s-[40px] hover:cursor-pointer"
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
          <div className="h-20 w-full flex justify-center items-center">
            <span className="text-white text-5xl text-shadow-xl font-digital">
              00:0{count}
            </span>
          </div>
        ) : (
          <div className="h-20">
            <div className="flex justify-center">
              <div className="flex">
                {/* <div className="mr-1 flex items-center">
                  <CupIcon width={15} height={15} color={"yellow"} />
                </div> */}
                <span className="text-sm px-1">🔥</span>
                <div className="text-slate-400 text-sm">Available points</div>
              </div>
            </div>
            <div className="flex justify-center text-4xl text-white font-bold">
              {point}
            </div>
          </div>
        )}
        <div className="my-12">
          <div className="flex justify-center">
            <div className="w-[330px] h-[160px] bg-[#030303] rounded-[80px] border-4 border-stone-400 relative z-10 shadow-black shadow-lg">
              <div className="w-[280px] h-[120px] bg-race-gradient rounded-[80px] absolute top-[16px] left-5"></div>
              <div className="w-[276px] h-[116px] bg-[#030303] rounded-[80px] absolute top-[18px] left-[22px]"></div>
              <div className="w-full flex justify-center absolute top-3">
                <span className="text-slate-400 font-medium text-lg">
                  BTC Price
                </span>
              </div>
              <div className="absolute w-full h-full flex justify-center items-center">
                <span className="text-white text-4xl font-bold">${btc}</span>
              </div>
              <div className="absolute w-full flex justify-center items-center bottom-3">
                <FuelIcon width={14} height={14} color={"random"} />
                <div className="mx-1 w-20 h-1 rounded bg-stone-600 relative">
                  <div className="w-16 h-1 rounded bg-white absolute top-0 left-0"></div>
                </div>
                <span className="text-white text-sm">8 /</span>
                <span className="mx-1 text-slate-400 text-sm">10</span>
                <RightIcon width={14} height={14} color={"#a8a29e"} />
              </div>
              <div className="z-0 absolute top-[calc(100%+4px)] w-full flex justify-center">
                <div className="bg-fuel-gradient w-40 h-9 rounded-3xl flex justify-center">
                  <div className="bg-fuel-sub-gradient w-36 h-8 rounded-3xl flex justify-center items-center">
                    <span className="text-xs text-slate-400 mr-1">
                      Next refill in
                    </span>
                    <span className="text-xs text-white">00:13</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4">
          <div className="flex justify-center text-md text-slate-300">
            Guess the BTC price in the next 5 secs
          </div>
          <div className="my-4 w-full flex justify-center">
            <div className="w-1/3 mx-2">
              <div className="w-full relative">
                <div
                  className={`w-full h-12 bg-green-800 border-4 border-white absolute rounded-2xl top-3`}
                ></div>
                <div className="w-full px-1">
                  <button
                    className={`w-full h-12 bg-green-400 rounded-xl hover:bg-green-500 transform active:translate-y-1 active:shadow-none transition-transform duration-150`}
                    onClick={handleClickMoon}
                    disabled={bet !== null}
                  >
                    <div
                      className={`flex justify-center text-xl font-bold ${
                        bet === null ? "text-white" : "text-slate-500"
                      }`}
                    >
                      PUMP IT
                      <div className="ml-1 mt-2">
                        <TrendingUp width={20} height={20} color={"white"} />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-1/3 mx-2">
              <div className="w-full relative">
                <div
                  className={`w-full h-12 bg-red-800 border-4 border-white absolute rounded-2xl top-3`}
                ></div>
                <div className="w-full px-1">
                  <button
                    className={`w-full h-12 bg-red-400 rounded-xl hover:bg-red-500 transform active:translate-y-1 active:shadow-none transition-transform duration-150`}
                    onClick={handleClickDoom}
                    disabled={bet !== null}
                  >
                    <div
                      className={`flex justify-center text-xl font-bold ${
                        bet === null ? "text-white" : "text-slate-500"
                      }`}
                    >
                      DUMP IT
                      <div className="ml-1 mt-2">
                        <TrendingDown width={20} height={20} color={"white"} />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center my-4 py-4">
          <span className="text-slate-300 text-xs underline">
            Terms and conditions
          </span>
        </div>
        <div className="flex justify-center my-4">
          <span className="text-slate-300 text-xs">
            Complete OKX KYC verification for surprises
          </span>
        </div>
      </div>
      {showResults && <Records show={showResults} onClose={hideRecordsModal} />}
      {betResult !== null && (
        <div className="z-20 absolute h-full w-full flex justify-center items-center top-0 left-0 bg-[#101010a4]">
          <div className="flex flex-col">
            {betResult && (
              <div className="flex justify-center">
                <span className="text-4xl text-center">
                  {bet === "moon" ? (
                    <EmojiIcon width={37} height={37} color={"random"} />
                  ) : (
                    <span>🔥</span>
                  )}
                </span>
              </div>
            )}
            <div className="flex flex-col text-white text-8xl font-bold text-shadow-2xl justify-center">
              <span>{betResult ? "REKT" : "MOON"}</span>
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

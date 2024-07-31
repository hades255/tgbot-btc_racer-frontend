import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Records from "../components/race/Records";
import { useAuth } from "../contexts/AuthContext";

const Race = () => {
  const { userId } = useAuth();
  const [btc, setBtc] = useState(0);
  const [btc_, setBtc_] = useState(0);
  const [count, setCount] = useState(0);

  const [bet, setBet] = useState(null);
  const [betAmount, setBetAmount] = useState(0);
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
        const result =
          (bet === "moon" && betAmount <= btcPrice) ||
          (bet === "doom" && betAmount > btcPrice);

        await axios.post("https://d6bf-172-86-113-74.ngrok-free.app/race", {
          guess: bet,
          pointAmount: 10,
          result,
          userId: userId,
        });

        setBetResult(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [bet, betAmount, userId]);

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

  /*
  const [error, setError] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setBtc(message.p);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      setError("WebSocket error, please try again later.");
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  if (error) return <div>Error: {error}</div>;
  */

  return (
    <>
      <div
        className="fixed top-4 right-0 bg-zinc-700 p-1 px-2 rounded-s-[40px] hover:cursor-pointer"
        onClick={handleShowRaces}
      >
        <span className="text-white text-sm">My records {">"}</span>
      </div>
      <div className="w-full flex-col">
        <div className="w-full flex justify-center">
          <span className="text-white text-lg">Race Page</span>
        </div>
        <div className="w-full flex justify-center">
          <span className="text-white text-lg">Current BTC Price ${btc}</span>
        </div>
        <div className="w-full flex justify-center">
          <div className="flex">
            <button
              className="w-[100px] bg-green-400 text-white rounded hover:bg-green-500"
              onClick={handleClickMoon}
              disabled={bet !== null}
            >
              Moon
            </button>
            <button
              className="w-[100px] bg-red-400 text-white rounded hover:bg-red-500"
              onClick={handleClickDoom}
              disabled={bet !== null}
            >
              Doom
            </button>
          </div>
        </div>
        {count !== 0 && (
          <div className="w-full flex justify-center">
            <span className="text-white text-lg">{count}</span>
          </div>
        )}
        {betResult !== null && (
          <div className="w-full flex justify-center">
            <span className="text-white text-lg">
              {betResult ? "Win" : "Lose"}
            </span>
          </div>
        )}
      </div>
      {showResults && <Records show={showResults} onClose={hideRecordsModal} />}
    </>
  );
};

export default Race;

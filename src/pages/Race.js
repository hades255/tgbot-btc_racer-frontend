import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

const Race = () => {
  /*
  const [btc, setBtc] = useState(0);

  const getBTC = useCallback(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
        );
        const btcPrice = response.data.bpi.USD.rate;
        setBtc(btcPrice);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    getBTC();
  }, [getBTC]);
  */

  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setPrice(message.p);
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

  return (
    <div className="w-full flex-col">
      <div className="w-full flex justify-center">
        <span className="text-white text-lg">Race Page</span>
      </div>
      <div className="w-full flex justify-center">
        <span className="text-white text-lg">Current BTC Price ${price}</span>
      </div>
      <div className="w-full flex justify-center">
        <div className="flex">
          <button className="w-[100px] bg-green-400 text-white rounded">
            Moon
          </button>
          <button className="w-[100px] bg-red-400 text-white rounded">
            Doom
          </button>
        </div>
      </div>
    </div>
  );
};

export default Race;

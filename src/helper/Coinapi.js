import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BINANCE_WS_URL } from "../constants/config";
import { addEth } from "../redux/ethSlice";
import { getAverage } from "./func";

const Coinapi = () => {
  const dispatch = useDispatch();

  /*
  useEffect(() => {
    const socket = new WebSocket(COINAPI_WS_URL);

    socket.addEventListener("open", function (event) {
      console.log("Connected to CoinAPI WebSocket");

      const subscribeMessage = {
        type: "hello",
        apikey: COINAPI_KEY,
        heartbeat: false,
        subscribe_data_type: ["trade"],
        subscribe_filter_symbol_id: ["COINBASE_SPOT_ETH_USD"],
      };

      socket.send(JSON.stringify(subscribeMessage));
    });

    socket.addEventListener("message", function (event) {
      const tradeData = JSON.parse(event.data);
      if (
        tradeData.type === "trade" &&
        tradeData.symbol_id === "COINBASE_SPOT_ETH_USD"
      ) {
        const price = tradeData.price;
        dispatch(addEth(price))
      }
    });

    socket.addEventListener("close", function (event) {
      console.log("Disconnected from CoinAPI WebSocket");
    });

    socket.addEventListener("error", function (error) {
      console.error("WebSocket error:", error);
    });

    return () => {
      socket.close();
    };
  }, [dispatch]);
  */
  // /*
  useEffect(() => {
    let eths = [];
    const getCount = () => eths;
    const setCount = (param) => (eths = [...eths, param]);
    const initCount = (param) => (eths = param);
    const timer = setInterval(() => {
      const avg = getAverage(getCount());
      if (avg === 0) return;
      dispatch(addEth(avg));
      initCount([avg]);
    }, 100);
    const socketConnection = () => {
      const ws = new WebSocket(BINANCE_WS_URL);
      ws.addEventListener("open", () => {
        console.log("Connected to Binance WebSocket API");
      });
      ws.addEventListener("message", ({ data }) => {
        try {
          const message = JSON.parse(data);
          if (message.p) {
            setCount(Number(message.p));
          }
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      });
      ws.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);
      });
      ws.addEventListener("close", () => {
        console.log("WebSocket connection closed, reconnecting...");
        socketConnection();
      });
    };
    socketConnection();
    return () => {
      clearInterval(timer);
      // ws.close();
    };
  }, [dispatch]);
  // */

  return <></>;
};

export default Coinapi;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { COINAPI_KEY, COINAPI_WS_URL } from "../constants/config";
import { addEth } from "../redux/ethSlice";

const Coinapi = () => {
  const dispatch = useDispatch();

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

  return <></>;
};

export default Coinapi;

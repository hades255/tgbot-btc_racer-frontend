import React, { useEffect } from "react";
import { countOn } from "../redux/fuelSlice";
import { useDispatch } from "react-redux";
import { countOnEth } from "../redux/ethSlice";

const FuelCounter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timerFunc = () => {
      dispatch(countOn());
      dispatch(countOnEth());
    };

    const timer = setInterval(() => {
      timerFunc();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  return <></>;
};

export default FuelCounter;

import React, { useEffect } from "react";
import { countOn } from "../redux/fuelSlice";
import { useDispatch } from "react-redux";

const FuelCounter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timerFunc = () => {
      dispatch(countOn());
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

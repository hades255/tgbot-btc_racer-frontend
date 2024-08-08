import React, { useEffect } from "react";
import { countOn } from "../redux/fuelSlice";
import { useDispatch } from "react-redux";
import { countOnEth } from "../redux/ethSlice";

const Counter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fueltimerFunc = () => {
      dispatch(countOn());
    };
    const ethtimerFunc = () => {
      dispatch(countOnEth());
    };

    const fueltimer = setInterval(() => {
      fueltimerFunc();
    }, 1000);
    const ethtimer = setInterval(() => {
      ethtimerFunc();
    }, 100);

    return () => {
      clearInterval(fueltimer);
      clearInterval(ethtimer);
    };
  }, [dispatch]);

  return <></>;
};

export default Counter;

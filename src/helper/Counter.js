import React, { useEffect } from "react";
import { countOn } from "../redux/fuelSlice";
import { useDispatch } from "react-redux";

const Counter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fueltimerFunc = () => {
      dispatch(countOn());
    };

    const fueltimer = setInterval(() => {
      fueltimerFunc();
    }, 1000);
    return () => {
      clearInterval(fueltimer);
    };
  }, [dispatch]);

  return <></>;
};

export default Counter;

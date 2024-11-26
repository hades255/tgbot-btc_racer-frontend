import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { countOn } from "@redux/fuelSlice";

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

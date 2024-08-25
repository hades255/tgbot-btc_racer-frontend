import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { upgradeExtra } from "../../redux/extraSlice";

const Congratulations = () => {
  const dispatch = useDispatch();
  const { showCongratulations, message } = useSelector((state) => state.extra);

  useEffect(() => {
    if (showCongratulations) {
      setTimeout(() => {
        dispatch(upgradeExtra({ key: "showCongratulations", value: false }));
        dispatch(upgradeExtra({ key: "message", value: "" }));
      }, 3000);
    }
  }, [showCongratulations, dispatch]);

  return (
    showCongratulations && (
      <div className="fixed top-0 left-0 z-10 w-full h-screen bg-[#000000] opacity-80 flex flex-col">
        <div className="mt-16 flex justify-center">
          <span className="text-white text-2xl font-semibold">
            Congratulations
          </span>
        </div>
        <div className="mt-16 flex justify-center">
          <span className="text-white max-w-[320px] text-center text-lg">
            {message ||
              `We've verified your account with Alphanomics. Stay turned for
            exciting big bonuses coming your way!`}
          </span>
        </div>
      </div>
    )
  );
};

export default Congratulations;

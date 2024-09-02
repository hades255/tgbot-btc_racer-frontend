import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { upgradeExtra } from "../../redux/extraSlice";
import Modal from "../common/Modal";
import BtnDark from "../common/button/BtnDark";

const Congratulations = () => {
  const dispatch = useDispatch();
  const { showCongratulations, message, showModal } = useSelector(
    (state) => state.extra
  );

  useEffect(() => {
    if (showCongratulations) {
      setTimeout(() => {
        dispatch(upgradeExtra([{ key: "showCongratulations", value: false }]));
      }, 5000);
    }
  }, [showCongratulations, dispatch]);

  const handleCloseModal = useCallback(() => {
    dispatch(upgradeExtra([{ key: "showModal", value: false }]));
  }, [dispatch]);

  return (
    <>
      {showCongratulations && (
        <div className="fixed top-0 left-0 z-30 w-full h-screen bg-[#000000] opacity-80 flex flex-col">
          <div className="mt-20 flex justify-center">
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
      )}
      {showModal && (
        <>
          <Modal
            show={showModal}
            onClose={handleCloseModal}
            title={""}
            className={"items-end"}
          >
            <div className="flex flex-col mb-10 px-4">
              <div className="flex justify-center text-center text-wrap break-words mb-4 text-xl text-white px-4">
                {message}
              </div>
              <div className="flex justify-center">
                <BtnDark onClick={handleCloseModal}>Continue to Battle</BtnDark>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default Congratulations;

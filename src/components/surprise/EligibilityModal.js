import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BACKEND_PATH } from "../../constants/config";
import { useAuth } from "../../contexts/AuthContext";
import { addToast } from "../../redux/toastSlice";
import { upgradeUser } from "../../redux/authSlice";
import { upgradeExtra } from "../../redux/extraSlice";
import Modal from "../common/Modal";
import RightArrowIcon from "../../assets/icons/RightArrow";
import LoadingIcon from "../../assets/icons/loading";
import EthIcon from "../../assets/icons/Eth";

const EligibilityModal = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const {
    userId,
    followTwitter,
    watchvideo,
    joinNewsletter,
    joinAnnouncementChannel,
    eligibility,
    ethaddress,
    pluslevel,
  } = useAuth();

  const unlockAuthPilot = useMemo(
    () =>
      followTwitter &&
      watchvideo &&
      joinNewsletter &&
      joinAnnouncementChannel &&
      eligibility &&
      pluslevel,
    [
      followTwitter,
      watchvideo,
      joinNewsletter,
      joinAnnouncementChannel,
      eligibility,
      pluslevel,
    ]
  );

  const [value, setValue] = useState(ethaddress);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (load && eligibility) {
      if (unlockAuthPilot)
        dispatch(
          upgradeExtra([
            { key: "message", value: "" },
            { key: "showCongratulations", value: true },
          ])
        );
      onClose();
    }
  }, [unlockAuthPilot, eligibility, onClose, dispatch, load]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (loading) return;
      if (value.length !== 42) {
        dispatch(
          addToast({
            message: "You have to type valid eth address",
            type: "warn",
          })
        );
        return;
      }
      (async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `${BACKEND_PATH}/user/checkcsv?userId=${userId}&wallet=${value}`
          );
          const result = response.data.data || false;
          if (result) {
            dispatch(
              upgradeUser([
                { key: "eligibility", value: true },
                { key: "ethaddress", value },
              ])
            );
            if (Number(response.data.point) >= 10) {
              dispatch(upgradeUser([{ key: "pluslevel", value: true }]));
              setLoad(true);
            } else {
              dispatch(
                addToast({
                  message: "Congratulation!",
                  type: "success",
                })
              );
            }
          } else {
            dispatch(
              addToast({
                message: "Your eth address is not registered.",
                type: "info",
              })
            );
          }
        } catch (error) {
          console.log(error);
          dispatch(
            addToast({
              message: "Server response error.",
              type: "error",
            })
          );
        } finally {
          setLoading(false);
        }
      })();
    },
    [value, dispatch, loading, userId]
  );

  const handleInputChange = useCallback(
    ({ target: { value } }) => setValue(value),
    []
  );

  return (
    <>
      <Modal
        show={show}
        onClose={onClose}
        title={"Check Eligibility"}
        className={"items-end"}
      >
        {show && (
          <div className="flex flex-col mb-8 relative">
            <form action="#" method="POST" onSubmit={handleSubmit}>
              <div className="mx-4 mb-4 flex items-center justify-center">
                <div className="w-[261px] h-12 rounded-[40px] bg-[#F3F3F3] relative">
                  <div className="absolute h-full w-16 flex items-center justify-center">
                    <EthIcon width={24} height={24} color={"#A8ADB7"} />
                  </div>
                  <input
                    className="w-full h-full rounded-[40px] bg-[#F3F3F3] py-1 pl-[56px] pr-3 text-sm italic"
                    placeholder="Enter ETH Address Here"
                    value={value}
                    onChange={handleInputChange}
                    maxLength={42}
                    minLength={42}
                    required
                    disabled={loading}
                  />
                </div>
                <button type="submit" className="ml-4">
                  <RightArrowIcon width={24} height={24} color={"white"} />
                </button>
              </div>
            </form>
            {loading && (
              <div className="absolute top-0 left-0 z-30 w-full h-full flex justify-center items-center">
                <div className="animate-spin">
                  <LoadingIcon width={40} height={40} />
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default EligibilityModal;

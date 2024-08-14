import React, { useCallback, useState } from "react";
import Modal from "../common/Modal";
import CheckIcon from "../../assets/icons/Check";
import axios from "axios";
import { addToast } from "../../redux/toastSlice";
import { useDispatch } from "react-redux";
import LoadingIcon from "../../assets/icons/loading";
import { useAuth } from "../../contexts/AuthContext";
import { BACKEND_PATH } from "../../constants/config";
import { upgradeUser } from "../../redux/authSlice";

const EligibilityModal = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const { userId } = useAuth();

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

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
              addToast({
                message: "Congratulation!",
                type: "success",
              })
            );
            dispatch(
              upgradeUser([
                { key: "eligibility", value: true },
                { key: "ethaddress", value },
              ])
            );
            onClose();
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
    [value, dispatch, onClose, loading, userId]
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
              <div className="mx-4 my-4 flex justify-center">
                <div className="relative mx-4 w-full h-[40px] bg-button-1-bg rounded-[25px]">
                  <input
                    className="absolute top-[2px] left-[2px] w-[calc(100%-4px)] h-[36px] rounded-[25px] bg-button-2 text-white px-4 text-center"
                    placeholder="Type ETH Address Here"
                    value={value}
                    onChange={handleInputChange}
                    maxLength={42}
                    minLength={42}
                    required
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-button-2 text-black text-lg font-medium h-[40px] min-w-[40px] w-[40px] rounded-[20px] flex justify-center items-center"
                >
                  <CheckIcon width={24} height={24} color={"white"} />
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

import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToast } from "../../redux/toastSlice";
import { upgradeUser } from "../../redux/authSlice";
import { useAuth } from "../../contexts/AuthContext";
import DotIcon from "../../assets/icons/Dot";
import { BACKEND_PATH } from "../../constants/config";

const PlusAccountBtn = () => {
  const dispatch = useDispatch();
  const { userId, ethaddress, pluslevel } = useAuth();

  const handleClick = useCallback(() => {
    if (pluslevel) return;
    (async () => {
      try {
        const response = await axios.get(
          `${BACKEND_PATH}/user/checkcsv?userId=${userId}&wallet=${ethaddress}`
        );
        const result = response.data.data || false;
        if (result && Number(response.data.point) >= 10) {
          dispatch(
            addToast({
              message: "Congratulation!",
              type: "success",
            })
          );
          dispatch(upgradeUser([{ key: "pluslevel", value: true }]));
        } else
          dispatch(
            addToast({
              message: "Your eth address is not registered.",
              type: "info",
            })
          );
      } catch (error) {
        console.log(error);
        dispatch(
          addToast({
            message: "Server response error.",
            type: "error",
          })
        );
      }
    })();
  }, [dispatch, userId, ethaddress, pluslevel]);

  return (
    <div className="flex my-2" onClick={handleClick}>
      <div className="mr-1 pt-1">
        <DotIcon width={14} height={14} color={"#04C3FF"} />
      </div>
      <div className="flex flex-col">
        <div className="text-md font-medium flex">
          <span className="text-[#79DEFE]">
            Unlock Alphanomics PLUS Account Level
          </span>
        </div>
        <span className="text-[#9E9E9E] text-sm">
          Go to your Alphanomics 'My Profile' page and earn 10 ANOM points to
          unlock PLUS level
        </span>
      </div>
    </div>
  );
};

export default PlusAccountBtn;

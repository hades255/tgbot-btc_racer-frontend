import React, { useCallback } from "react";
import ArrowIcon from "../../assets/icons/Arrow";
import { useDispatch } from "react-redux";
import { addToast } from "../../redux/toastSlice";
import BtnLight from "../common/button/BtnLight";

const EligibilityBtn = () => {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(
      addToast({
        message:
          "Unable to complete verification. Please complete all required steps and try again.",
        type: "error",
      })
    );
  }, [dispatch]);

  return (
    <BtnLight onClick={handleClick}>
      <span className="ml-2">
        Check eligibility
      </span>
      <ArrowIcon />
    </BtnLight>
  );
};

export default EligibilityBtn;

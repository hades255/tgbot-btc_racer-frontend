import React, { useCallback, useState } from "react";
import ArrowIcon from "../../assets/icons/Arrow";
import BtnLight from "../common/button/BtnLight";
import EligibilityModal from "./EligibilityModal";
import { useAuth } from "../../contexts/AuthContext";

const EligibilityBtn = () => {
  const [show, setShow] = useState(false);
  const { eligibility, ethaddress } = useAuth();

  const handleClick = useCallback(() => setShow(!show), [show]);

  return eligibility ? (
    <>
      <div className="relative w-[300px] h-[40px] bg-button-1-bg rounded-[20px]">
        <div className="absolute top-[2px] left-[2px] w-[296px] h-[36px] rounded-[20px] bg-button-1 text-white px-4 flex justify-center items-center">
          {ethaddress.substring(0, 6)}...
          {ethaddress.substring(38)}
        </div>
      </div>
    </>
  ) : (
    <>
      <BtnLight onClick={handleClick}>
        <span className="ml-2">Check eligibility</span>
        <ArrowIcon />
      </BtnLight>
      <EligibilityModal show={show} onClose={handleClick} />
    </>
  );
};

export default EligibilityBtn;

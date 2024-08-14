import React, { useCallback, useState } from "react";
import ArrowIcon from "../../assets/icons/Arrow";
import BtnLight from "../common/button/BtnLight";
import EligibilityModal from "./EligibilityModal";

const EligibilityBtn = () => {
  const [show, setShow] = useState(false);

  const handleClick = useCallback(() => setShow(!show), [show]);

  return (
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

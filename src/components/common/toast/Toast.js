import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeToast } from "../../../redux/toastSlice";
import CheckIcon from "../../../assets/icons/toast/Check";
import ErrorIcon from "../../../assets/icons/toast/Error";
import WarnIcon from "../../../assets/icons/toast/Warn";
import InfoIcon from "../../../assets/icons/toast/Info";

const typeStyles = {
  success: "border-[#28426C]",
  error: "border-red-500",
  warn: "border-yellow-500",
  info: "border-blue-500",
};

const typeIcons = {
  success: <CheckIcon width={20} height={20} color={"green"} />,
  error: <ErrorIcon width={20} height={20} color={"red"} />,
  warn: <WarnIcon width={20} height={20} color={"yellow"} />,
  info: <InfoIcon width={20} height={20} color={"lightblue"} />,
};

const Toast = ({ id, message, type, duration = 3000 }) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);

  const closeToast = useCallback(
    () => dispatch(removeToast(id)),
    [dispatch, id]
  );

  useEffect(() => {
    const hide = setTimeout(() => {
      setIsVisible(false);
      setTimeout(closeToast, 500); // Delay unmounting to allow animation to complete
    }, duration);

    return () => clearTimeout(hide);
  }, [closeToast, duration]);

  return (
    <div
      className={`w-80 my-2 px-12 py-2 rounded bg-[#1A2B47] text-white border shadow-lg transition-transform ${
        isVisible ? "animate-slideIn" : "animate-slideOut"
      } ${typeStyles[type]}`}
    >
      <div className="flex">
        <div className="mr-1 mt-[2px]">{typeIcons[type]}</div>
        <span className="flex items-center text-xs mr-1">{message}</span>
        {/* <button onClick={() => setIsVisible(false)}>&times;</button> */}
      </div>
    </div>
  );
};

export default Toast;

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeToast } from "../../../redux/toastSlice";

const Toast = ({ id, message, type, duration = 3000 }) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);

  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

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
      className={`w-64 my-2 p-4 rounded shadow-lg transition-transform ${
        isVisible ? "animate-slideIn" : "animate-slideOut"
      } ${typeStyles[type]}`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={() => setIsVisible(false)}>&times;</button>
      </div>
    </div>
  );
};

export default Toast;

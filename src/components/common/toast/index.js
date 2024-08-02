import React from "react";
import Toast from "./Toast";
import { useSelector } from "react-redux";

const ToastContainer = () => {
  const { toasts } = useSelector((state) => state.toast);

  return (
    <div className="fixed top-8 left-16 z-50">
      <div className="flex flex-col">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
          />
        ))}
      </div>
    </div>
  );
};

export default ToastContainer;

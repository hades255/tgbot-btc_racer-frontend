import React, { useCallback } from "react";

const RedirectBtn = ({ children, url, className = "" }) => {
  const handleButtonClick = useCallback(() => {
    if (!url) return;
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.openLink(url);
    } else {
      window.location.href = url;
    }
  }, [url]);

  return (
    <div
      onClick={handleButtonClick}
      className={`hover:cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};

export default RedirectBtn;

import React, { useCallback } from "react";

const RedirectBtn = ({ children, url, className = "" }) => {
  const handleButtonClick = useCallback(() => {
    const targetUrl = url;
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.openLink(targetUrl);
    } else {
      window.location.href = targetUrl;
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

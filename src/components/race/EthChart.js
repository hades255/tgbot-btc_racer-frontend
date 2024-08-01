import React, { useEffect } from "react";

const CoinGeckoWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://widgets.coingecko.com/gecko-coin-price-chart-widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <gecko-coin-price-chart-widget
        locale="en"
        transparent-background="true"
        coinId="bitcoin"
        initial-currency="usd"
        width="350"
        height="200"
      ></gecko-coin-price-chart-widget>
    </div>
  );
};

export default CoinGeckoWidget;

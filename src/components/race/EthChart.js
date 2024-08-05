import React, { useMemo } from "react";
import AreaChart from "../common/areachart/AreaChart";
import { useSelector } from "react-redux";

const CoinGeckoWidget = () => {
  const { prices, curPrice } = useSelector((state) => state.eth);

  const chartdata = useMemo(() => {
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const diff = maxPrice - minPrice || 1;
    const yaxis = [
      { y: (140 * 5) / 4, text: (5 / 4) * diff + minPrice },
      { y: 140 * 1, text: diff + minPrice },
      { y: (140 * 3) / 4, text: (diff * 3) / 4 + minPrice },
      { y: (140 * 1) / 2, text: diff / 2 + minPrice },
      { y: (140 * 1) / 4, text: diff / 4 + minPrice },
      { y: 0, text: 0 * diff + minPrice },
    ];
    const data =
      prices.length >= 2
        ? prices.map((price, index) => ({
            x: index * 2,
            y: 7 + ((price - minPrice) / diff) * 140,
          }))
        : [{ x: 0, y: 0 }];
    return { yaxis, data, last: curPrice };
  }, [prices, curPrice]);

  return <div>{prices.length >= 2 && <AreaChart {...chartdata} />}</div>;
};

export default CoinGeckoWidget;

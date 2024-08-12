import React, { useMemo } from "react";
import AreaChart from "../common/areachart/AreaChart";
import { useSelector } from "react-redux";

const CoinGeckoWidget = ({ bet, betAmount }) => {
  const { prices, curPrice } = useSelector((state) => state.eth);

  const chartdata = useMemo(() => {
    let maxPrice = Math.max(...prices);
    let minPrice = Math.min(...prices);
    if (maxPrice - minPrice < 1) {
      maxPrice += 0.5;
      minPrice -= 0.5;
    }
    const diff = maxPrice - minPrice || 1;
    const yaxis = [
      { y: (140 * 5) / 4, text: diff / 1 + maxPrice },
      { y: 140 * 1, text: maxPrice },
      { y: (140 * 3) / 4, text: (diff * 3) / 4 + minPrice },
      { y: (140 * 1) / 2, text: diff / 2 + minPrice },
      { y: (140 * 1) / 4, text: diff / 4 + minPrice },
      { y: 0, text: 0 * diff + minPrice },
    ];
    const data =
      prices.length >= 2
        ? prices.map((price, index) => ({
            x: index * 1,
            y: 8 + ((price - minPrice) / diff) * 140,
          }))
        : [{ x: 0, y: 0 }];
    const betline = betAmount ? 8 + ((betAmount - minPrice) / diff) * 140 : null;
    return { yaxis, data, last: curPrice, betline, bet };
  }, [prices, curPrice, betAmount, bet]);

  return (
    <div className="h-[200px]">
      {prices.length >= 2 && <AreaChart {...chartdata} />}
    </div>
  );
};

export default CoinGeckoWidget;

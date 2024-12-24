import React, { useEffect, useState } from "react";

const AnimatedCounter = ({ endValue, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = endValue / (duration / 10);

    const counter = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        start = endValue;
        clearInterval(counter);
      }
      setCount(Math.floor(start));
    }, 10);

    return () => clearInterval(counter);
  }, [endValue, duration]);

  return <>{count.toLocaleString()}</>;
};

export default AnimatedCounter;

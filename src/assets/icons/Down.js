import React from "react";

const DownIcon = ({ width, height, color }) => {
  return (
    <svg
      fill={color}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      id="down-right"
      xmlns="http://www.w3.org/2000/svg"
      className="icon flat-line"
    >
      <line
        id="primary"
        x1="18.36"
        y1="18.36"
        x2="5"
        y2="5"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      ></line>
      <polyline
        id="primary-2"
        points="19 9 19 19 9.1 19"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      ></polyline>
    </svg>
  );
};

export default DownIcon;

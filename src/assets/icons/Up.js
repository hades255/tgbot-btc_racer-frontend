import React from "react";

const UpIcon = ({ width, height, color }) => {
  return (
    <svg
      fill={color}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      id="up-right"
      xmlns="http://www.w3.org/2000/svg"
      className="icon flat-line"
    >
      <line
        id="primary"
        x1="18.36"
        y1="5.64"
        x2="5"
        y2="19"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      ></line>
      <polyline
        id="primary-2"
        points="9 5 19 5 19 14.9"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      ></polyline>
    </svg>
  );
};

export default UpIcon;

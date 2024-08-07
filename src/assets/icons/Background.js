import React from "react";

const BackgroundIcon = () => {
  return (
    <svg
      width="180"
      height="204"
      viewBox="0 0 272 204"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.15">
        <g filter="url(#filter2_i_0_346)">
          <circle
            cx="100.707"
            cy="114.218"
            r="86.1029"
            fill="url(#paint5_radial_0_346)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter2_i_0_346"
          x="14.6039"
          y="25.1152"
          width="176.206"
          height="175.206"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="4" dy="-3" />
          <feGaussianBlur stdDeviation="7.05" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_0_346"
          />
        </filter>
        <radialGradient
          id="paint5_radial_0_346"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(126.625 104.993) rotate(105.21) scale(98.7889)"
        >
          <stop stopColor="#2577EC" />
          <stop offset="1" stopColor="#002356" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default BackgroundIcon;

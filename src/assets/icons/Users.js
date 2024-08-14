import React from "react";

const UsersIcon = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 11C9.70914 11 11.5 9.20914 11.5 7C11.5 4.79086 9.70914 3 7.5 3C5.29086 3 3.5 4.79086 3.5 7C3.5 9.20914 5.29086 11 7.5 11Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 3C15.3604 3.2203 16.123 3.7207 16.6676 4.42231C17.2122 5.12392 17.5078 5.98683 17.5078 6.875C17.5078 7.76317 17.2122 8.62608 16.6676 9.32769C16.123 10.0293 15.3604 10.5297 14.5 10.75"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 21V19C3.5 17.9391 3.92143 16.9217 4.67157 16.1716C5.42172 15.4214 6.43913 15 7.5 15H11.5C12.5609 15 13.5783 15.4214 14.3284 16.1716C15.0786 16.9217 15.5 17.9391 15.5 19V21"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.5 20.85V18.85C21.4949 17.9672 21.1979 17.1108 20.6553 16.4144C20.1126 15.718 19.3548 15.2207 18.5 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UsersIcon;

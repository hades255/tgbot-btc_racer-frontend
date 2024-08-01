import React from "react";

const LeaderboardIcon = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.75 5.25V18.75H22.25V5.25H20.75ZM19.25 4.875C19.25 4.25368 19.7537 3.75 20.375 3.75H22.625C23.2463 3.75 23.75 4.25368 23.75 4.875V19.125C23.75 19.7463 23.2463 20.25 22.625 20.25H20.375C19.7537 20.25 19.25 19.7463 19.25 19.125V4.875Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.75 9V18.75H16.25V9H14.75ZM13.25 8.625C13.25 8.00368 13.7537 7.5 14.375 7.5H16.625C17.2463 7.5 17.75 8.00368 17.75 8.625V19.125C17.75 19.7463 17.2463 20.25 16.625 20.25H14.375C13.7537 20.25 13.25 19.7463 13.25 19.125V8.625Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.75 12V18.75H10.25V12H8.75ZM7.25 11.625C7.25 11.0037 7.75368 10.5 8.375 10.5H10.625C11.2463 10.5 11.75 11.0037 11.75 11.625V19.125C11.75 19.7463 11.2463 20.25 10.625 20.25H8.375C7.75368 20.25 7.25 19.7463 7.25 19.125V11.625Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.75 15V18.75H4.25V15H2.75ZM1.25 14.625C1.25 14.0037 1.75368 13.5 2.375 13.5H4.625C5.24632 13.5 5.75 14.0037 5.75 14.625V19.125C5.75 19.7463 5.24632 20.25 4.625 20.25H2.375C1.75368 20.25 1.25 19.7463 1.25 19.125V14.625Z"
        fill={color}
      />
    </svg>
  );
};

export default LeaderboardIcon;

import React, { useMemo } from "react";
import * as d3 from "d3-shape";
import { fix2 } from "../../../helper/func";

const AreaChart = ({ data, yaxis, last, betline, bet }) => {
  const lineGenerator = d3
    .line()
    .x((d) => d.x)
    .y((d) => 183 - d.y)
    .curve(d3.curveCatmullRom.alpha(0.5));

  const lastPoint = useMemo(() => data[data.length - 1], [data]);
  const diff = lastPoint.y - data[data.length - 2].y;

  return (
    <svg
      width="330"
      height="200"
      viewBox="0 0 330 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // d={fillData}
        d={`${lineGenerator(data)} L ${data.length * 1} 183 L 0 183`}
        fill="url(#bg-linear-gradient-bottom)"
        fillOpacity={0.5}
        style={{ transition: "d 0s" }}
      />
      <path
        //  d={pathData}
        d={lineGenerator(data)}
        fill="none"
        stroke="#10B3E8"
        strokeWidth={2}
        style={{ transition: "d 0s" }}
      />

      {betline && (
        <path
          fill="none"
          stroke={bet === "moon" ? "#52c602" : "#c60202"}
          strokeWidth={2}
          strokeDasharray="3,4"
          d={`M 0 ${183 - betline} L 265 ${183 - betline}`}
        />
      )}

      {yaxis.map((item, index) => (
        <text
          key={index}
          x="283"
          y={183 - item.y}
          fill="white"
          fontSize="10"
          strokeWidth="0.5"
          textAnchor="start"
        >
          {fix2(item.text, 3).toLocaleString()}
        </text>
      ))}

      <rect
        width={47}
        height={17}
        x={282}
        y={176 - lastPoint.y}
        fill="#383D67DD"
        rx={2}
        ry={2}
        stroke="white"
        strokeWidth={1}
      />
      <text
        x="283"
        y={188 - lastPoint.y}
        fill="white"
        fontSize="10"
        strokeWidth="0.5"
        textAnchor="start"
      >
        {last.toLocaleString()}
      </text>

      <g
        transform={`translate(${lastPoint.x - 10}, ${
          168 - lastPoint.y
        }) rotate(${15 - (1 * ((Math.atan(diff) / Math.PI) * 180)) / 2} 10 15)`}
        style={{ transition: `all 0.1s` }}
      >
        <path
          d="M8.69372 30.0774L7.4519 26.923C8.67183 26.4427 9.54402 25.217 9.90209 23.4716C10.2934 21.5692 10.0374 19.319 9.17772 17.1353C8.31807 14.9517 6.97139 13.1308 5.38823 12.0057C3.93639 10.9728 2.46416 10.6673 1.24188 11.1485L5.80365e-05 7.99406C1.0625 7.5758 2.21461 7.48875 3.42355 7.73225C4.55095 7.9617 5.67493 8.47212 6.76744 9.24741C8.92348 10.7795 10.7336 13.2053 11.8644 16.0776C12.9952 18.95 13.3244 21.9587 12.7915 24.5494C12.5207 25.8614 12.0454 26.9987 11.3769 27.9352C10.6594 28.9398 9.75617 29.6591 8.69372 30.0774Z"
          fill="url(#paint0_linear_1_2388)"
        />
        <path
          d="M8.69361 30.0774L7.45179 26.923C9.87285 25.9699 12.1276 24.8081 14.1464 23.4676C16.072 22.1938 17.6983 20.8151 18.9831 19.3754C20.1923 18.0197 21.0536 16.6355 21.4766 15.3721C21.8634 14.21 21.8823 13.1682 21.5297 12.2726C21.1781 11.3794 20.4532 10.6277 19.3779 10.0411C18.2073 9.40519 16.6334 8.97956 14.8246 8.81206C12.9032 8.63456 10.7743 8.73692 8.4962 9.11523C6.10305 9.51167 3.66375 10.1978 1.24269 11.1509L-5.60854e-05 7.9941C5.244 5.92964 10.6122 5.02172 15.1104 5.44175C17.4031 5.65224 19.3699 6.2001 20.9591 7.06489C21.8192 7.53259 22.5644 8.09441 23.1712 8.73242C23.8214 9.41851 24.3195 10.1943 24.6536 11.0428C24.9876 11.8914 25.152 12.7986 25.144 13.7438C25.135 14.6242 24.9728 15.5432 24.6624 16.4718C24.0891 18.1879 23.0237 19.9294 21.4897 21.6464C18.4841 25.0178 13.9377 28.013 8.69361 30.0774Z"
          fill="url(#paint1_linear_1_2388)"
        />
      </g>
      <defs>
        <linearGradient
          id="bg-linear-gradient-bottom"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" style={{ stopColor: "#00516B", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#00516B", stopOpacity: 0 }}
          />
        </linearGradient>
        <linearGradient
          id="paint0_linear_1_2388"
          x1="7.6424"
          y1="4.98546"
          x2="15.9481"
          y2="27.3846"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.0001" stopColor="#04C1FF" />
          <stop offset="1" stopColor="#0062FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1_2388"
          x1="20.6448"
          y1="-0.133266"
          x2="29.2328"
          y2="22.1635"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.0001" stopColor="#04C1FF" />
          <stop offset="1" stopColor="#0062FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default AreaChart;

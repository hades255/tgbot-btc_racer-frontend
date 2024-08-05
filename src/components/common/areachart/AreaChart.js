import React from "react";

const AreaChart = ({ data, yaxis, last }) => {
  // Adjust the data points to create the area path
  const pathData = data
    .map((point, index) =>
      index === 0
        ? `M ${point.x} ${183 - point.y}`
        : `L ${point.x} ${183 - point.y}`
    )
    .join(" ");
  const fillData =
    data
      .map((point, index) =>
        index === 0
          ? `M ${point.x} ${183 - point.y}`
          : `L ${point.x} ${183 - point.y}`
      )
      .join(" ") + `L ${data.length * 2} 183 L 0 183`;

  const lastPoint = data[data.length - 1];

  return (
    <svg
      width="300"
      height="200"
      viewBox="0 0 300 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#00516B", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#00516B", stopOpacity: 0 }}
          />
        </linearGradient>
      </defs>

      {/* Data Points Path for Area Chart */}
      <path d={fillData} fill="url(#gradient)" fillOpacity={0.5} />
      <path d={pathData} fill="none" stroke="#10B3E8" strokeWidth={2} />

      {/* Highlight Current Y Value */}
      {yaxis.map((item, index) => (
        <text
          key={index}
          x="265"
          y={183 - item.y}
          fill="white"
          stroke="black"
          fontSize="10"
          strokeWidth="0.5"
          textAnchor="start"
        >
          {item.text}
        </text>
      ))}

      {/* Highlight Last Y Value */}
      <rect width={38} height={13} x={262} y={173 - lastPoint.y} fill="#AAAAAAA0" stroke="white" strokeWidth={1} />
      <text
        x="265"
        y={183 - lastPoint.y}
        fill="black"
        stroke="white"
        fontSize="10"
        strokeWidth="0.5"
        textAnchor="start"
      >
        {last}
      </text>

      {/* Arrow at Last Value */}
      <polygon
        points={`${lastPoint.x - 5},${183 - lastPoint.y - 5} ${
          lastPoint.x + 5
        },${183 - lastPoint.y - 5} ${lastPoint.x},${183 - lastPoint.y + 5}`}
        fill="#10B3E8"
      />
    </svg>
  );
};

export default AreaChart;

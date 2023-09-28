"use client";

import React from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const CustomizedTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="  bg-background px-4 py-3 border rounded-lg flex gap-4">
        {payload.map((item) => {
          const dataKey = item.dataKey;
          return (
            <div key={dataKey}>
              <p className="text-muted-foreground">{`${item.dataKey} `}</p>
              <p className="label">{`${item.payload[dataKey]} `}</p>
            </div>
          );
        })}
      </div>
    );
  }

  return null;
};

export default function RechartComponent({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Tooltip content={<CustomizedTooltip />} />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#111827"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#C5C5C6"
          strokeWidth={2}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

"use client";

import dayjs from "dayjs";
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { toLocalStringEn } from "@/utils/math";

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
  const xAxisOptions = {
    dataKey: ({ name }) => dayjs(name).format("MMM DD"),
    padding: { left: 50, right: 50 },
    axisLine: false,
    tickLine: false,
  };

  const yAxisOptions = {
    axisLine: false,
    tickLine: false,
    tickCount: 3,
    tickFormatter: (label) => toLocalStringEn(label),
  };

  const lineOptions = {
    type: "monotone",
    dataKey: "amount",
    stroke: "#111827",
    strokeWidth: 2,
    dot: { r: 4 },
    activeDot: { r: 6 },
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Tooltip content={<CustomizedTooltip />} />
        <CartesianGrid strokeDasharray="6 6" vertical={false} />
        <YAxis {...yAxisOptions} />
        <XAxis {...xAxisOptions} />
        <Line {...lineOptions} />
      </LineChart>
    </ResponsiveContainer>
  );
}

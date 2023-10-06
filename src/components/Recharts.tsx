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

interface RechartProps {
  data: {
    name: string;
    amount: number;
    accu: number;
    average: number;
  }[];
}

// interface TooltipProp {
//   active: boolean;
//   payload: TooltipProps;
//   label: string | undefined;
// }

const CustomizedTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background px-4 py-3 border rounded-lg flex gap-4">
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

export default function RechartComponent({ data }: RechartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Tooltip content={<CustomizedTooltip />} />
        <CartesianGrid strokeDasharray="6 6" vertical={false} />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickCount={3}
          tickFormatter={(label) => toLocalStringEn(label)}
        />
        <XAxis
          axisLine={false}
          tickLine={false}
          padding={{ left: 50, right: 50 }}
          dataKey={({ name }) => dayjs(name).format("DD")}
        />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#111827"
          strokeWidth={2}
          activeDot={{ r: 6 }}
          dot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="average"
          stroke="#C5C5C6"
          strokeWidth={2}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

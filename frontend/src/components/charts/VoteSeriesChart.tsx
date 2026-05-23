"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function VoteSeriesChart({
  data,
}: {
  data: { time: string; votes: number }[];
}) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="voteFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2ea8ff" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#2ea8ff" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" />
          <YAxis stroke="rgba(255,255,255,0.4)" />
          <Tooltip
            contentStyle={{
              background: "#0a1124",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
            }}
          />
          <Area type="monotone" dataKey="votes" stroke="#4df3ff" fill="url(#voteFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

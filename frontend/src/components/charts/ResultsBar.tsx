"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function ResultsBar({
  data,
}: {
  data: { name: string; votes: number }[];
}) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" />
          <YAxis stroke="rgba(255,255,255,0.4)" />
          <Tooltip
            contentStyle={{
              background: "#0a1124",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
            }}
          />
          <Bar dataKey="votes" fill="#2ea8ff" radius={[12, 12, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

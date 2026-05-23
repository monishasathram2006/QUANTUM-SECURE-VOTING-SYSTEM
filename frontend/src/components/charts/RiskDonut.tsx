"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";

const COLORS = ["#4df3ff", "#7b5cff", "#ff4fd8"];

export function RiskDonut({ data }: { data: { label: string; value: number }[] }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            contentStyle={{
              background: "#0a1124",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
            }}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell key={entry.label} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

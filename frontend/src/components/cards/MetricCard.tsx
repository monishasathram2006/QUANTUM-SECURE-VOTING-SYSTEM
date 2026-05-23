import { ReactNode } from "react";

export function MetricCard({
  title,
  value,
  icon,
  accent,
}: {
  title: string;
  value: ReactNode;
  icon: ReactNode;
  accent?: string;
}) {
  return (
    <div className="glass-card rounded-3xl border border-white/10 p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/60">{title}</p>
        <div className={accent}>{icon}</div>
      </div>
      <div className="mt-4 text-3xl font-semibold text-white">{value}</div>
    </div>
  );
}

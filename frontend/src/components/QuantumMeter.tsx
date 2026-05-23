import { widthClassFromPercent } from "@/lib/widthClass";

export function QuantumMeter({ value }: { value: number }) {
  const clamped = Math.min(Math.max(value, 0), 1);
  const widthClass = widthClassFromPercent(clamped * 100);
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-white/40">Quantum Risk</p>
      <div className="mt-4 flex items-end gap-2">
        <span className="text-4xl font-semibold text-white">{(clamped * 100).toFixed(0)}%</span>
        <span className="text-xs text-white/50">risk</span>
      </div>
      <div className="mt-4 h-3 w-full rounded-full bg-white/10">
        <div
          className={`h-3 rounded-full bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple ${widthClass}`}
        />
      </div>
    </div>
  );
}

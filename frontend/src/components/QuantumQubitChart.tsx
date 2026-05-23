import { widthClassFromPercent } from "@/lib/widthClass";

export function QuantumQubitChart({ data }: { data: { label: string; value: number }[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <p className="text-sm font-semibold text-white">Qubit Probability</p>
      <div className="mt-4 space-y-3">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-4">
            <span className="w-10 text-xs text-white/60">{item.label}</span>
            <div className="h-2 flex-1 rounded-full bg-white/10">
              <div
                className={`h-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple ${widthClassFromPercent(
                  item.value * 100,
                )}`}
              />
            </div>
            <span className="text-xs text-white/60">{(item.value * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

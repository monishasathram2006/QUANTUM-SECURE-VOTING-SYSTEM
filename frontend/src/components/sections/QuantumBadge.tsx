import { Cpu } from "lucide-react";

export function QuantumBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-neon-cyan">
      <Cpu className="h-4 w-4" />
      {label}
    </div>
  );
}

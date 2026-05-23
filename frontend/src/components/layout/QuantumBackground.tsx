import { cn } from "@/lib/utils";

export function QuantumBackground({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none fixed inset-0 -z-10", className)}>
      <div className="absolute inset-0 bg-quantum" />
      <div className="absolute inset-0 grid-overlay opacity-70" />
      <div className="absolute left-16 top-24 h-64 w-64 rounded-full bg-neon-blue/20 blur-3xl animate-pulse-glow" />
      <div className="absolute right-24 top-10 h-80 w-80 rounded-full bg-neon-purple/20 blur-3xl animate-pulse-glow" />
      <div className="absolute left-1/2 top-2/3 h-72 w-72 -translate-x-1/2 rounded-full bg-neon-cyan/20 blur-3xl animate-float" />
    </div>
  );
}

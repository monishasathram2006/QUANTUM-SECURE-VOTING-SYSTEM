export function QuantumCircuit() {
  return (
    <div className="relative h-40 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <div className="absolute left-0 top-1/2 h-[1px] w-full bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent" />
      <div className="absolute left-12 top-12 h-3 w-3 rounded-full bg-neon-cyan shadow-neon" />
      <div className="absolute left-1/2 top-20 h-3 w-3 rounded-full bg-neon-purple shadow-violet" />
      <div className="absolute right-16 top-10 h-3 w-3 rounded-full bg-neon-blue shadow-glow" />
      <div className="absolute left-8 top-24 h-12 w-12 rounded-full border border-neon-cyan/40" />
      <div className="absolute right-12 top-16 h-16 w-16 rounded-full border border-neon-purple/40" />
    </div>
  );
}

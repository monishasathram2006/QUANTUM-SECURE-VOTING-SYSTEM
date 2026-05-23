const steps = [
  {
    title: "Identity confirmed",
    detail: "OTP + face scan validated by the Quantum ID mesh.",
  },
  {
    title: "Vote encrypted",
    detail: "CRYSTALS-Kyber lattice encryption complete.",
  },
  {
    title: "Signed + broadcast",
    detail: "Dilithium signature attached and broadcast to chain.",
  },
  {
    title: "Verified publicly",
    detail: "Any citizen can validate the transaction hash.",
  },
];

export function QuantumTimeline() {
  return (
    <section className="grid gap-4">
      {steps.map((step, index) => (
        <div
          key={step.title}
          className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neon-cyan/40 text-xs text-neon-cyan">
            0{index + 1}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{step.title}</p>
            <p className="text-xs text-white/60">{step.detail}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

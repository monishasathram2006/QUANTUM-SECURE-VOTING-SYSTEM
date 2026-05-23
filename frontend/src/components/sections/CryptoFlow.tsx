import { Badge } from "@/components/ui/badge";

const steps = [
  "Vote cast",
  "Kyber encrypt",
  "Lattice ciphertext",
  "Dilithium signature",
  "Blockchain storage",
];

export function CryptoFlow() {
  return (
    <section className="rounded-[32px] border border-white/10 bg-white/5 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Post-Quantum Flow</h2>
          <p className="mt-2 text-sm text-white/60">
            Cryptographic pipeline visualized for every single ballot.
          </p>
        </div>
        <Badge variant="info">CRYSTALS Suite</Badge>
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-4">
            <div className="glass-card rounded-2xl px-4 py-2 text-sm text-white/80">
              {step}
            </div>
            {index < steps.length - 1 && (
              <div className="h-[1px] w-8 bg-gradient-to-r from-neon-cyan/60 to-transparent" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

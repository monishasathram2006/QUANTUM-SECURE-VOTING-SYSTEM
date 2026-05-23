import { Shield, Vote, Radar, Cpu } from "lucide-react";

const features = [
  {
    title: "Zero-trust voter identity",
    description: "OTP + biometric simulation with device fingerprint binding.",
    icon: Shield,
  },
  {
    title: "One-person one-vote",
    description: "Enforced by ledger rules and vote state locking.",
    icon: Vote,
  },
  {
    title: "Quantum fraud analytics",
    description: "Risk heatmaps, anomaly alerts, and bot probability scoring.",
    icon: Radar,
  },
  {
    title: "Quantum-ready stack",
    description: "CRYSTALS-Kyber and Dilithium simulation pipeline.",
    icon: Cpu,
  },
];

export function FeatureGrid() {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="glass-card rounded-3xl border border-white/10 p-6"
        >
          <feature.icon className="h-6 w-6 text-neon-cyan" />
          <h3 className="mt-4 text-xl font-semibold text-white">{feature.title}</h3>
          <p className="mt-2 text-sm text-white/60">{feature.description}</p>
        </div>
      ))}
    </section>
  );
}

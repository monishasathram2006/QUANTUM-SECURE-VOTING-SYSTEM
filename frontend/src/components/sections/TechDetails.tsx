import { Badge } from "@/components/ui/badge";

const details = [
  {
    title: "CRYSTALS-Kyber",
    text: "Simulated lattice-based encryption with quantum entropy injection.",
  },
  {
    title: "Dilithium Signatures",
    text: "Post-quantum signatures generated for every ledger payload.",
  },
  {
    title: "Quantum Fraud Engine",
    text: "Qubit probability analysis powering anomaly scores.",
  },
];

export function TechDetails() {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      {details.map((item) => (
        <div key={item.title} className="glass-card rounded-3xl p-6">
          <Badge variant="info">{item.title}</Badge>
          <p className="mt-4 text-sm text-white/60">{item.text}</p>
        </div>
      ))}
    </section>
  );
}

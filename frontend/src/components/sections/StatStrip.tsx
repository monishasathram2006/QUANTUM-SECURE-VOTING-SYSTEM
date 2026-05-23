import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Verified Voters", value: "2,410" },
  { label: "Quantum Risk", value: "0.18" },
  { label: "Ledger Sync", value: "99.99%" },
];

export function StatStrip() {
  return (
    <section className="grid gap-4 rounded-[28px] border border-white/10 bg-white/5 p-6 md:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="space-y-2">
          <Badge variant="info">{stat.label}</Badge>
          <p className="text-2xl font-semibold text-white">{stat.value}</p>
        </div>
      ))}
    </section>
  );
}

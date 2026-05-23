import { Badge } from "@/components/ui/badge";

const badges = [
  "Quantum Secure",
  "Zero Trust",
  "Immutable Ledger",
  "Post-Quantum Ready",
];

export function TrustBadges() {
  return (
    <section className="flex flex-wrap items-center gap-3">
      {badges.map((badge) => (
        <Badge key={badge} variant="success">
          {badge}
        </Badge>
      ))}
    </section>
  );
}

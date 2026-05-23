import { Badge } from "@/components/ui/badge";

export function QuantumSecurityPanel({
  quantumToken,
  deviceFingerprint,
}: {
  quantumToken?: string | null;
  deviceFingerprint?: string | null;
}) {
  return (
    <div className="glass-card rounded-3xl p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-white/40">Security Mesh</p>
      <div className="mt-4 space-y-3 text-sm text-white/60">
        <div className="flex items-center justify-between">
          <span>Quantum session token</span>
          <Badge variant="info">{quantumToken ? "Active" : "Pending"}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span>Device fingerprint</span>
          <Badge variant="default">{deviceFingerprint ? "Bound" : "Unbound"}</Badge>
        </div>
      </div>
    </div>
  );
}

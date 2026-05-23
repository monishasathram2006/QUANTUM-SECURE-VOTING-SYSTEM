import { Badge } from "@/components/ui/badge";
import { shortHash } from "@/lib/format";
import { VerificationResult } from "@/services/verification";

export function VerificationResultCard({ result }: { result: VerificationResult }) {
  if (!result.exists) {
    return (
      <div className="glass-card rounded-3xl p-6">
        <Badge variant="warning">Not Found</Badge>
        <p className="mt-4 text-sm text-white/60">
          Transaction not found in the QuantumVoteX ledger.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-6">
      <Badge variant="success">Verified</Badge>
      <div className="mt-4 grid gap-3 text-sm text-white/70">
        <div>Transaction: {shortHash(result.transactionHash)}</div>
        <div>Block: {result.blockId}</div>
        <div>Timestamp: {result.timestamp}</div>
        <div>Voter Hash: {shortHash(result.voterHash)}</div>
      </div>
    </div>
  );
}

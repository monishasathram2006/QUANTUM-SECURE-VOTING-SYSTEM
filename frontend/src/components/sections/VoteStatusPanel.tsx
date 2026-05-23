import { Badge } from "@/components/ui/badge";

export function VoteStatusPanel({
  verified,
  hasVoted,
}: {
  verified: boolean;
  hasVoted: boolean;
}) {
  return (
    <div className="glass-card rounded-3xl p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-white/40">Voter Status</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Badge variant={verified ? "success" : "warning"}>
          {verified ? "Verified" : "Unverified"}
        </Badge>
        <Badge variant={hasVoted ? "info" : "default"}>
          {hasVoted ? "Vote Locked" : "Vote Pending"}
        </Badge>
      </div>
    </div>
  );
}

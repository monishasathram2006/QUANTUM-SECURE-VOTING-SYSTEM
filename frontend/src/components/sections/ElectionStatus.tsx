import { Badge } from "@/components/ui/badge";

export function ElectionStatus({ status }: { status: "open" | "closed" }) {
  return (
    <div className="glass-card rounded-3xl p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-white/40">Election Status</p>
      <div className="mt-4 flex items-center gap-3">
        <Badge variant={status === "open" ? "success" : "warning"}>{status}</Badge>
        <p className="text-sm text-white/60">
          {status === "open"
            ? "Voting window active. Votes are accepted in real time."
            : "Election closed. Results are finalized."}
        </p>
      </div>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";

export function CryptoStatusCard({
  title,
  status,
  detail,
}: {
  title: string;
  status: string;
  detail: string;
}) {
  return (
    <div className="glass-card rounded-3xl border border-white/10 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">{title}</p>
        <Badge variant="info">{status}</Badge>
      </div>
      <p className="mt-3 text-sm text-white/60">{detail}</p>
    </div>
  );
}

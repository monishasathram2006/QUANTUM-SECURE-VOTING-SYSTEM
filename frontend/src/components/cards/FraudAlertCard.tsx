export function FraudAlertCard({
  alert,
}: {
  alert: { type: string; severity: string; timestamp: string; details: string };
}) {
  const tone =
    alert.severity === "high"
      ? "text-neon-purple"
      : alert.severity === "medium"
        ? "text-neon-cyan"
        : "text-white/60";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">{alert.type}</p>
        <span className={`text-xs uppercase ${tone}`}>{alert.severity}</span>
      </div>
      <p className="mt-2 text-xs text-white/50">{alert.details}</p>
      <p className="mt-3 text-[11px] text-white/40">{alert.timestamp}</p>
    </div>
  );
}

const logs = [
  {
    title: "Ledger check completed",
    detail: "Block BLK-7FA31B verified against hash chain.",
  },
  {
    title: "Quantum fraud engine",
    detail: "Anomaly score recalibrated to 0.18 risk.",
  },
  {
    title: "Election core",
    detail: "Voting window open - 12 hours remaining.",
  },
];

export function AuditLog() {
  return (
    <section className="glass-card rounded-3xl p-6">
      <h3 className="text-lg font-semibold text-white">Audit Trail</h3>
      <div className="mt-4 space-y-4">
        {logs.map((log) => (
          <div key={log.title} className="rounded-2xl border border-white/10 p-4">
            <p className="text-sm font-semibold text-white">{log.title}</p>
            <p className="text-xs text-white/60">{log.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

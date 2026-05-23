import { QuantumMeter } from "@/components/QuantumMeter";
import { QuantumQubitChart } from "@/components/QuantumQubitChart";

export function QuantumStats({
  risk,
  qubits,
}: {
  risk: number;
  qubits: { label: string; value: number }[];
}) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <QuantumMeter value={risk} />
      <QuantumQubitChart data={qubits} />
    </section>
  );
}

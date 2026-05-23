import { QuantumBackground } from "@/components/layout/QuantumBackground";
import { Hero } from "@/components/sections/Hero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CryptoFlow } from "@/components/sections/CryptoFlow";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { AuditLog } from "@/components/sections/AuditLog";
import { QuantumCircuit } from "@/components/sections/QuantumCircuit";
import { QuantumTimeline } from "@/components/sections/QuantumTimeline";
import { QuantumFooter } from "@/components/sections/QuantumFooter";
import { StatStrip } from "@/components/sections/StatStrip";
import { TechDetails } from "@/components/sections/TechDetails";

export default function Home() {
  return (
    <div className="min-h-screen bg-night-950 px-6 py-12 text-white">
      <QuantumBackground />
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <Hero />
        <StatStrip />
        <FeatureGrid />
        <CryptoFlow />
        <TechDetails />
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <AuditLog />
          <QuantumTimeline />
        </div>
        <QuantumCircuit />
        <TrustBadges />
        <QuantumFooter />
      </div>
    </div>
  );
}

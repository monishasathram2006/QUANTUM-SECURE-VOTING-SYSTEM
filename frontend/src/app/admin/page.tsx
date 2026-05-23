"use client";

import { useEffect, useState } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/cards/MetricCard";
import { QuantumStats } from "@/components/sections/QuantumStats";
import { VoteSeriesChart } from "@/components/charts/VoteSeriesChart";
import { RiskDonut } from "@/components/charts/RiskDonut";
import { FraudAlertCard } from "@/components/cards/FraudAlertCard";
import {
  AdminAlert,
  AdminMetrics,
  AdminVote,
  AdminVoter,
  getAdminAlerts,
  getAdminMetrics,
  getAdminVotes,
  getAdminVoters,
} from "@/services/admin";
import { getElectionState, toggleElectionState } from "@/services/election";
import { useAuth } from "@/hooks/useAuth";
import { AlertTriangle, Shield, Vote, Cpu } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function AdminPage() {
  const { token } = useAuth();
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [alerts, setAlerts] = useState<AdminAlert[]>([]);
  const [electionOpen, setElectionOpen] = useState(true);
  const [votes, setVotes] = useState<AdminVote[]>([]);
  const [voters, setVoters] = useState<AdminVoter[]>([]);

  useEffect(() => {
    getAdminMetrics(token || undefined).then(setMetrics);
    getAdminAlerts(token || undefined).then(setAlerts);
    getAdminVotes(token || undefined).then(setVotes);
    getAdminVoters(token || undefined).then(setVoters);
    getElectionState()
      .then((state) => setElectionOpen(state.isOpen))
      .catch(() => setElectionOpen(true));
  }, [token]);

  const onToggleElection = async (checked: boolean) => {
    if (!token) {
      toast.error("Admin token required to toggle election.");
      return;
    }
    const next = checked;
    setElectionOpen(next);
    try {
      await toggleElectionState(next, token);
      toast.success(next ? "Election opened" : "Election closed");
    } catch (error) {
      setElectionOpen(!next);
      toast.error((error as Error).message || "Toggle failed");
    }
  };

  const totalVotes = useCountUp(metrics?.totalVotes || 0);
  const verified = useCountUp(metrics?.verifiedVoters || 0);
  const suspicious = useCountUp(metrics?.suspiciousVotes || 0);
  const ledger = useCountUp(metrics?.blockchainTransactions || 0);

  if (!metrics) {
    return <LoadingScreen />;
  }

  return (
    <PageTransition>
      <AppShell>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-semibold text-white">Quantum Fraud Command</h1>
            <p className="mt-2 text-sm text-white/60">
              Live monitoring of anomalies, vote bursts, and ledger integrity.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Total votes"
              value={totalVotes}
              icon={<Vote className="h-5 w-5 text-neon-cyan" />}
            />
            <MetricCard
              title="Verified voters"
              value={verified}
              icon={<Shield className="h-5 w-5 text-neon-blue" />}
            />
            <MetricCard
              title="Suspicious votes"
              value={suspicious}
              icon={<AlertTriangle className="h-5 w-5 text-neon-purple" />}
            />
            <MetricCard
              title="Blockchain TX"
              value={ledger}
              icon={<Cpu className="h-5 w-5 text-neon-cyan" />}
            />
          </div>
          <QuantumStats risk={metrics.quantumRisk} qubits={metrics.qubitState} />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="glass-card rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-white">Vote burst telemetry</h3>
              <VoteSeriesChart data={metrics.voteSeries} />
            </div>
            <div className="glass-card rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-white">Risk distribution</h3>
              <RiskDonut data={metrics.riskSeries} />
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="glass-card rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-white">Quantum Fraud Engine Active</h3>
              <p className="mt-2 text-sm text-white/60">
                Qubit probability scoring recalibrates risk every 30 seconds.
              </p>
              <div className="mt-6 h-32 rounded-3xl border border-white/10 bg-night-900/80" />
            </div>
            <div className="space-y-6">
              <div className="glass-card rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-white">Election Control</h3>
                <p className="mt-2 text-sm text-white/60">
                  Toggle voting availability for all voters.
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-white/70">
                    {electionOpen ? "Voting Open" : "Voting Closed"}
                  </span>
                  <Switch checked={electionOpen} onCheckedChange={onToggleElection} />
                </div>
              </div>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <FraudAlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="glass-card rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-white">Ledger Snapshot</h3>
              <p className="mt-2 text-sm text-white/60">Anonymized vote transactions.</p>
              <div className="mt-4 space-y-3 text-sm text-white/70">
                {votes.map((vote) => (
                  <div key={vote.id} className="flex items-center justify-between">
                    <span>{vote.transactionHash?.slice(0, 10)}...</span>
                    <span className="text-xs text-white/50">Score {vote.anomalyScore}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-white">Voter Registry</h3>
              <p className="mt-2 text-sm text-white/60">Verified voters and vote status.</p>
              <div className="mt-4 space-y-3 text-sm text-white/70">
                {voters.map((voter) => (
                  <div key={voter.id} className="flex items-center justify-between">
                    <span>{voter.name}</span>
                    <span className="text-xs text-white/50">
                      {voter.hasVoted ? "Voted" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </PageTransition>
  );
}

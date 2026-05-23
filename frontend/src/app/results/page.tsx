"use client";

import { useEffect, useMemo, useState } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { AppShell } from "@/components/layout/AppShell";
import { ResultsBar } from "@/components/charts/ResultsBar";
import { Badge } from "@/components/ui/badge";
import { getResults } from "@/services/results";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function ResultsPage() {
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    getResults().then(setResults);
  }, []);

  const chartData = useMemo(() => {
    if (!results) {
      return [];
    }
    return results.candidates.map((candidate: any) => ({
      name: candidate.name,
      votes: candidate.votes,
    }));
  }, [results]);

  if (!results) {
    return <LoadingScreen />;
  }

  return (
    <PageTransition>
      <AppShell>
        <div className="space-y-8">
          <div className="glass-card rounded-3xl p-6">
            <Badge variant="info">Election closed</Badge>
            <h1 className="mt-4 text-3xl font-semibold text-white">Results Dashboard</h1>
            <p className="mt-2 text-sm text-white/60">
              Blockchain-verified totals with quantum fraud audit summary.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="glass-card rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-white">Vote distribution</h3>
              <ResultsBar data={chartData} />
            </div>
            <div className="glass-card rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-white">Audit summary</h3>
              <div className="mt-4 space-y-3 text-sm text-white/60">
                <div>Total votes: {results.totalVotes}</div>
                <div>Fraud alerts: {results.fraudSummary.alerts}</div>
                <div>Quantum risk: {results.fraudSummary.riskScore}</div>
                <div>{results.fraudSummary.notes}</div>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </PageTransition>
  );
}

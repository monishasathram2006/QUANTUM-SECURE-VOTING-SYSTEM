"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { AppShell } from "@/components/layout/AppShell";
import { CandidateCard } from "@/components/cards/CandidateCard";
import { ElectionStatus } from "@/components/sections/ElectionStatus";
import { VoteStatusPanel } from "@/components/sections/VoteStatusPanel";
import { QuantumSecurityPanel } from "@/components/sections/QuantumSecurityPanel";
import { getCandidates } from "@/services/candidates";
import { getElectionState } from "@/services/election";
import { useAuth } from "@/hooks/useAuth";
import { VoteConfirmDialog } from "@/components/cards/VoteConfirmDialog";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const router = useRouter();
  const { user, token, quantumToken, deviceFingerprint } = useAuth();
  const [candidates, setCandidates] = useState<Awaited<ReturnType<typeof getCandidates>>>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [electionOpen, setElectionOpen] = useState(true);

  useEffect(() => {
    let mounted = true;
    getCandidates().then((data) => {
      if (mounted) {
        setCandidates(data);
        setLoading(false);
      }
    });
    getElectionState()
      .then((state) => setElectionOpen(state.isOpen))
      .catch(() => setElectionOpen(true));
    return () => {
      mounted = false;
    };
  }, []);

  const selectedCandidate = useMemo(
    () => candidates.find((candidate) => candidate.id === selected),
    [candidates, selected],
  );

  const disableVote = !user?.verified || user?.hasVoted || !token || !electionOpen;

  const onConfirm = () => {
    if (!selectedCandidate) {
      return;
    }
    router.push(`/vote-processing?candidateId=${selectedCandidate.id}`);
  };

  return (
    <PageTransition>
      <AppShell>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <ElectionStatus status={electionOpen ? "open" : "closed"} />
            <div className="grid gap-4 md:grid-cols-2">
              <VoteStatusPanel verified={!!user?.verified} hasVoted={!!user?.hasVoted} />
              <QuantumSecurityPanel
                quantumToken={quantumToken}
                deviceFingerprint={deviceFingerprint}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Candidates</h2>
              <p className="mt-2 text-sm text-white/60">
                Select your candidate. Encryption begins immediately after confirmation.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-48" />
                  ))
                : candidates.map((candidate) => (
                    <CandidateCard
                      key={candidate.id}
                      candidate={candidate}
                      onVote={(id) => setSelected(id)}
                      disabled={disableVote}
                    />
                  ))}
            </div>
            {disableVote ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
                {!electionOpen
                  ? "Election is closed. Results are available in the results dashboard."
                  : user?.hasVoted
                    ? "You have already cast your vote."
                    : "Complete verification and login to cast a vote."}
              </div>
            ) : null}
          </div>
          <div className="space-y-6">
            <div className="glass-card rounded-3xl p-6">
              <p className="text-sm text-white/60">Election Overview</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">National Quantum Ballot</h3>
              <p className="mt-2 text-sm text-white/60">
                Live vote stream protected by Kyber lattice encryption and Dilithium
                signatures.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-white/70">
                  <span>Voting window</span>
                  <span>12h remaining</span>
                </div>
                <div className="flex items-center justify-between text-sm text-white/70">
                  <span>Ledger sync</span>
                  <span className="text-neon-cyan">99.99%</span>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-3xl p-6">
              <p className="text-sm text-white/60">Post-Quantum Shield</p>
              <div className="mt-4 space-y-4">
                {[
                  "Kyber encryption active",
                  "Dilithium signature ready",
                  "Quantum fraud engine monitoring",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <VoteConfirmDialog
          open={!!selectedCandidate}
          onOpenChange={(open) => setSelected(open ? selected : null)}
          candidateName={selectedCandidate?.name || ""}
          onConfirm={onConfirm}
        />
      </AppShell>
    </PageTransition>
  );
}

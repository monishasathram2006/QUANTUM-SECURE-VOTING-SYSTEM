"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PageTransition } from "@/components/layout/PageTransition";
import { AppShell } from "@/components/layout/AppShell";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStepFlow } from "@/hooks/useStepFlow";
import { castVote } from "@/services/votes";
import { getCandidates } from "@/services/candidates";
import { useAuth } from "@/hooks/useAuth";
import { shortHash } from "@/lib/format";
import { toast } from "sonner";
import { CryptoDetailsDialog } from "@/components/cards/CryptoDetailsDialog";

const steps = [
  { label: "Encrypting vote", duration: 1200 },
  { label: "Applying CRYSTALS-Kyber", duration: 1400 },
  { label: "Generating lattice ciphertext", duration: 1200 },
  { label: "Signing with Dilithium", duration: 1200 },
  { label: "Broadcasting to blockchain", duration: 1600 },
];

export default function VoteProcessingPage() {
  const params = useSearchParams();
  const candidateId = params.get("candidateId") || "";
  const { token, refresh } = useAuth();
  const { activeIndex, completed } = useStepFlow(steps);
  const [transaction, setTransaction] = useState<{
    transactionHash: string;
    blockId: string;
  } | null>(null);
  const [candidateName, setCandidateName] = useState("");

  useEffect(() => {
    getCandidates().then((data) => {
      const match = data.find((item) => item.id === candidateId);
      if (match) {
        setCandidateName(match.name);
      }
    });
  }, [candidateId]);

  useEffect(() => {
    if (completed && token && candidateId && !transaction) {
      castVote(candidateId, token)
        .then((response) => {
          setTransaction({
            transactionHash: response.transactionHash,
            blockId: response.blockId,
          });
          refresh();
        })
        .catch((error) => {
          toast.error(error.message || "Vote failed");
        });
    }
  }, [completed, token, candidateId, transaction]);

  const progressValue = useMemo(() => {
    return Math.round(((activeIndex + 1) / steps.length) * 100);
  }, [activeIndex]);

  return (
    <PageTransition>
      <AppShell>
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="glass-card rounded-3xl p-8">
            <Badge variant="info">Vote Processing</Badge>
            <h1 className="mt-4 text-3xl font-semibold text-white">Quantum Encryption in Motion</h1>
            <p className="mt-2 text-sm text-white/60">
              {candidateName
                ? `Casting secure ballot for ${candidateName}.`
                : "Preparing secure ballot."}
            </p>
            <div className="mt-6 space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step.label}
                  className={`flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm ${
                    index <= activeIndex ? "bg-white/10" : "bg-white/5"
                  }`}
                >
                  <span>{step.label}</span>
                  <span className="text-xs text-neon-cyan">
                    {index < activeIndex ? "Complete" : index === activeIndex ? "Running" : "Queued"}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-4">
              <Progress value={progressValue} />
              <div className="flex flex-wrap gap-3">
                <CryptoDetailsDialog />
                <Button variant="ghost" asChild>
                  <Link href="/verify">Public verification</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-3xl p-6">
            <h2 className="text-lg font-semibold text-white">Ledger Transaction</h2>
            <p className="mt-2 text-sm text-white/60">
              {transaction
                ? "Transaction confirmed on the QuantumVoteX ledger."
                : "Awaiting blockchain broadcast."}
            </p>
            {transaction ? (
              <div className="mt-4 space-y-2 text-sm text-white/70">
                <div>Transaction: {shortHash(transaction.transactionHash)}</div>
                <div>Block ID: {transaction.blockId}</div>
                <Button asChild className="mt-4">
                  <Link href={`/verify?hash=${transaction.transactionHash}`}>Verify Publicly</Link>
                </Button>
              </div>
            ) : (
              <div className="mt-4 h-20 rounded-2xl border border-white/10 bg-white/5" />
            )}
          </div>
        </div>
      </AppShell>
    </PageTransition>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { AppShell } from "@/components/layout/AppShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VerificationResultCard } from "@/components/VerificationResult";
import { verifyTransaction, VerificationResult } from "@/services/verification";
import { toast } from "sonner";

export default function VerifyPage() {
  const params = useSearchParams();
  const initialHash = params.get("hash") || "";
  const [hash, setHash] = useState(initialHash);
  const [result, setResult] = useState<VerificationResult | null>(null);

  useEffect(() => {
    if (initialHash) {
      handleVerify(initialHash);
    }
  }, [initialHash]);

  const handleVerify = async (value: string) => {
    try {
      const response = await verifyTransaction(value);
      setResult(response);
    } catch (error) {
      toast.error((error as Error).message || "Verification failed");
    }
  };

  return (
    <PageTransition>
      <AppShell>
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="glass-card rounded-3xl p-6">
            <h1 className="text-2xl font-semibold text-white">Public Vote Verification</h1>
            <p className="mt-2 text-sm text-white/60">
              Enter a transaction hash to verify your vote on the immutable ledger.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Input
                placeholder="Transaction hash"
                value={hash}
                onChange={(event) => setHash(event.target.value)}
              />
              <Button onClick={() => handleVerify(hash)}>Verify</Button>
            </div>
          </div>
          {result ? <VerificationResultCard result={result} /> : null}
        </div>
      </AppShell>
    </PageTransition>
  );
}

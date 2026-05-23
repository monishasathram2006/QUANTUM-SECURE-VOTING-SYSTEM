"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-night-950 px-6">
      <div className="glass-card max-w-md rounded-3xl p-6 text-center">
        <h2 className="text-xl font-semibold text-white">Quantum disruption detected</h2>
        <p className="mt-3 text-sm text-white/60">
          A rendering error interrupted the session. Retry to restore the flow.
        </p>
        <Button className="mt-6" onClick={reset}>
          Retry
        </Button>
      </div>
    </div>
  );
}

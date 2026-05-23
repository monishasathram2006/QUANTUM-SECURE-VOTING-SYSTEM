import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-night-950 px-6">
      <div className="glass-card max-w-md rounded-3xl p-6 text-center">
        <h2 className="text-xl font-semibold text-white">Route not in ledger</h2>
        <p className="mt-3 text-sm text-white/60">
          This path is not registered on the QuantumVoteX network.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </div>
  );
}

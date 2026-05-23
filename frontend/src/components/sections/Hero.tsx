import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 px-8 py-16 md:px-12">
      <div className="scanline" />
      <Badge variant="info">Quantum Secure</Badge>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
        QuantumVoteX
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-white/70">
        Secure Democracy for the Quantum Age. A post-quantum, blockchain-powered
        voting network with quantum fraud detection at its core.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button asChild size="lg">
          <Link href="/auth">
            Launch Demo <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/verify">
            Verify Transaction <ShieldCheck className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Post-Quantum Crypto",
            desc: "Kyber encryption and Dilithium signatures simulated in real time.",
          },
          {
            title: "Immutable Ledger",
            desc: "Hash-chained transactions built for audit-ready transparency.",
          },
          {
            title: "Quantum Fraud Engine",
            desc: "Qubit-inspired anomaly scoring flags threats instantly.",
          },
        ].map((item) => (
          <div key={item.title} className="glass-card rounded-2xl p-5">
            <p className="text-sm text-neon-cyan">{item.title}</p>
            <p className="mt-2 text-sm text-white/60">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

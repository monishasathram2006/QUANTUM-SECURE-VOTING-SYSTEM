"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const details = [
  {
    title: "CRYSTALS-Kyber",
    detail: "Lattice-based key encapsulation simulated with quantum entropy.",
  },
  {
    title: "Dilithium Signature",
    detail: "Post-quantum signature generated for ledger payload integrity.",
  },
  {
    title: "Hash Chaining",
    detail: "Each transaction links to the previous hash to ensure immutability.",
  },
];

export function CryptoDetailsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Technical details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Post-Quantum Crypto Details</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4 text-sm text-white/60">
          {details.map((item) => (
            <div key={item.title}>
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-xs text-white/60">{item.detail}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

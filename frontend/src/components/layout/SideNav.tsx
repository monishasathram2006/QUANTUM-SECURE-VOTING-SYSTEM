"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  Home,
  Radar,
  Settings,
  ShieldCheck,
  Vote,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Voter Hub", icon: Home },
  { href: "/vote-processing", label: "Vote Processing", icon: Vote },
  { href: "/verify", label: "Public Verify", icon: ShieldCheck },
  { href: "/admin", label: "Admin Radar", icon: Radar },
  { href: "/results", label: "Results", icon: BadgeCheck },
  { href: "/settings", label: "Settings", icon: Settings },
];

const alerts = [
  { label: "Fraud Engine", icon: AlertTriangle, status: "Active" },
  { label: "Ledger Pulse", icon: Activity, status: "Stable" },
];

export function SideNav() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-64 flex-col gap-6 border-r border-white/5 bg-night-950/60 px-6 py-6 xl:flex">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">System</p>
        <p className="mt-2 text-lg font-semibold">Election Core</p>
        <p className="text-xs text-white/50">Quantum secure mode</p>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white/70 transition",
                active && "bg-white/10 text-white",
              )}
            >
              <item.icon className="h-4 w-4 text-neon-cyan" />
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Live</p>
        <div className="mt-3 flex flex-col gap-3">
          {alerts.map((alert) => (
            <div key={alert.label} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <alert.icon className="h-4 w-4 text-neon-purple" />
                <span>{alert.label}</span>
              </div>
              <span className="text-xs text-neon-cyan">{alert.status}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

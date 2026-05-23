"use client";

import Link from "next/link";
import { Shield, Vote, Radar, Settings, BadgeCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: Vote },
  { href: "/verify", label: "Verify", icon: Shield },
  { href: "/admin", label: "Admin", icon: Radar },
  { href: "/results", label: "Results", icon: BadgeCheck },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function TopNav() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between gap-6 border-b border-white/5 bg-night-950/70 px-6 py-4 backdrop-blur-xl">
      <Link href="/" className="flex items-center gap-3 text-white">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-neon-blue via-neon-cyan to-neon-purple p-[1px]">
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-night-950 text-lg font-semibold">
            QX
          </div>
        </div>
        <div>
          <p className="text-lg font-semibold">QuantumVoteX</p>
          <p className="text-xs text-white/50">Post-Quantum Voting Mesh</p>
        </div>
      </Link>
      <div className="hidden items-center gap-6 text-sm text-white/70 xl:flex">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="flex items-center gap-2">
            <link.icon className="h-4 w-4 text-neon-cyan" />
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Badge variant={user?.verified ? "success" : "warning"}>
          {user?.verified ? "Verified" : "Unverified"}
        </Badge>
        <Button variant="ghost" size="sm" onClick={logout}>
          Sign out
        </Button>
      </div>
    </nav>
  );
}

"use client";

import { PageTransition } from "@/components/layout/PageTransition";
import { AppShell } from "@/components/layout/AppShell";
import { useAuth } from "@/hooks/useAuth";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const { user, deviceFingerprint, quantumToken } = useAuth();

  return (
    <PageTransition>
      <AppShell>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="glass-card rounded-3xl p-6">
            <h1 className="text-2xl font-semibold text-white">Profile & Security</h1>
            <p className="mt-2 text-sm text-white/60">
              Manage your QuantumVoteX identity and device trust.
            </p>
            <div className="mt-6 space-y-4 text-sm text-white/60">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">User</p>
                <p className="mt-2 text-base text-white">{user?.name || "Anonymous"}</p>
                <p className="text-xs text-white/50">{user?.email}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Status</p>
                <div className="mt-2 flex items-center gap-3">
                  <Badge variant={user?.verified ? "success" : "warning"}>
                    {user?.verified ? "Verified" : "Unverified"}
                  </Badge>
                  <Badge variant={user?.hasVoted ? "info" : "default"}>
                    {user?.hasVoted ? "Voted" : "Not voted"}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Device</p>
                <p className="mt-2 text-xs text-white/60">{deviceFingerprint}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Quantum token</p>
                <p className="mt-2 text-xs text-white/60">{quantumToken}</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-3xl p-6">
            <h2 className="text-lg font-semibold text-white">Preferences</h2>
            <div className="mt-6 space-y-4 text-sm text-white/60">
              <div className="flex items-center justify-between">
                <span>Fraud alert notifications</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span>Quantum secure mode</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span>Ledger sync monitoring</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </PageTransition>
  );
}

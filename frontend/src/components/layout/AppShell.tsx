import { ReactNode } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { SideNav } from "@/components/layout/SideNav";
import { QuantumBackground } from "@/components/layout/QuantumBackground";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-night-950">
      <QuantumBackground />
      <TopNav />
      <div className="flex">
        <SideNav />
        <main className="flex-1 px-6 py-8 xl:px-12">{children}</main>
      </div>
    </div>
  );
}

"use client";

import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
      <Toaster theme="dark" richColors position="top-right" />
    </AuthProvider>
  );
}

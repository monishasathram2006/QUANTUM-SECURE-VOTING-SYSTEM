"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { QuantumBadge } from "@/components/sections/QuantumBadge";
import { PageTransition } from "@/components/layout/PageTransition";

export default function AuthPage() {
  const {
    register,
    login,
    verifyOtpCode,
    verifyFaceScan,
    pendingOtp,
    user,
    token,
  } = useAuth();
  const [tab, setTab] = useState("login");
  const [registerState, setRegisterState] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loginState, setLoginState] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [faceStage, setFaceStage] = useState<"idle" | "scanning" | "done">("idle");

  const needsVerification = useMemo(() => {
    return Boolean(user && !user.verified);
  }, [user]);

  const onRegister = async () => {
    await register(registerState);
  };

  const onLogin = async () => {
    await login(loginState);
  };

  const onOtpVerify = async () => {
    await verifyOtpCode(otp || pendingOtp || "123456");
  };

  const onFaceScan = async () => {
    setFaceStage("scanning");
    setTimeout(async () => {
      await verifyFaceScan();
      setFaceStage("done");
    }, 1600);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-night-950 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <Link href="/" className="text-sm text-white/60">
            Back to landing
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div className="glass-card rounded-[32px] p-8">
              <QuantumBadge label="Identity Shield" />
              <h1 className="mt-6 text-3xl font-semibold text-white">
                QuantumVoteX Access
              </h1>
              <p className="mt-3 text-sm text-white/60">
                Secure onboarding with OTP verification and face scan simulation.
              </p>
              <div className="mt-8">
                <Tabs value={tab} onValueChange={setTab}>
                  <TabsList>
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login">
                    <div className="space-y-4">
                      <Input
                        placeholder="Email"
                        value={loginState.email}
                        onChange={(event) =>
                          setLoginState({ ...loginState, email: event.target.value })
                        }
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={loginState.password}
                        onChange={(event) =>
                          setLoginState({ ...loginState, password: event.target.value })
                        }
                      />
                      <Button className="w-full" onClick={onLogin}>
                        Secure Login
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="register">
                    <div className="space-y-4">
                      <Input
                        placeholder="Name"
                        value={registerState.name}
                        onChange={(event) =>
                          setRegisterState({ ...registerState, name: event.target.value })
                        }
                      />
                      <Input
                        placeholder="Email"
                        value={registerState.email}
                        onChange={(event) =>
                          setRegisterState({ ...registerState, email: event.target.value })
                        }
                      />
                      <Input
                        placeholder="Phone"
                        value={registerState.phone}
                        onChange={(event) =>
                          setRegisterState({ ...registerState, phone: event.target.value })
                        }
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={registerState.password}
                        onChange={(event) =>
                          setRegisterState({
                            ...registerState,
                            password: event.target.value,
                          })
                        }
                      />
                      <Button className="w-full" onClick={onRegister}>
                        Generate OTP
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <div className="space-y-6">
              <div className="glass-card rounded-[32px] p-6">
                <Badge variant="info">Step 1</Badge>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  OTP Verification
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  Enter the demo OTP to unlock identity verification.
                </p>
                <div className="mt-4 flex gap-3">
                  <Input
                    placeholder={pendingOtp ? `Demo OTP: ${pendingOtp}` : "OTP code"}
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                  />
                  <Button onClick={onOtpVerify}>Verify</Button>
                </div>
              </div>
              <div className="glass-card rounded-[32px] p-6">
                <Badge variant="info">Step 2</Badge>
                <h3 className="mt-4 text-lg font-semibold text-white">Face Scan</h3>
                <p className="mt-2 text-sm text-white/60">
                  Simulated facial verification to complete onboarding.
                </p>
                <motion.div
                  className="relative mt-4 h-40 rounded-3xl border border-white/10 bg-night-900/70"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: faceStage === "scanning" ? 1 : 0.8 }}
                >
                  <div className="scanline" />
                </motion.div>
                <Button
                  className="mt-4 w-full"
                  variant="outline"
                  onClick={onFaceScan}
                >
                  {faceStage === "scanning" ? "Scanning..." : "Simulate Scan"}
                </Button>
              </div>
              <div className="glass-card rounded-[32px] p-6">
                <Badge variant={needsVerification ? "warning" : "success"}>
                  {needsVerification ? "Pending" : "Verified"}
                </Badge>
                <p className="mt-3 text-sm text-white/60">
                  {needsVerification
                    ? "Complete OTP + face verification to activate voting."
                    : "Identity secured. You can proceed to the dashboard."}
                </p>
                <Button asChild className="mt-4 w-full" disabled={!token && needsVerification}>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

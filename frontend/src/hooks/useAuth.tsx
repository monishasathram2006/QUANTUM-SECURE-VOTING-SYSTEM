"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AuthUser,
  fetchProfile,
  loginUser,
  registerUser,
  verifyFace,
  verifyOtp,
} from "@/services/auth";
import { getOrCreateDeviceFingerprint } from "@/lib/deviceFingerprint";

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  quantumToken: string | null;
  pendingOtp: string | null;
  pendingUserId: string | null;
  deviceFingerprint: string | null;
  isLoading: boolean;
};

type AuthContextValue = AuthState & {
  register: (payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<void>;
  login: (payload: { email: string; password: string }) => Promise<void>;
  verifyOtpCode: (otp: string) => Promise<void>;
  verifyFaceScan: () => Promise<void>;
  refresh: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "qvx_auth";

function readStoredAuth(): Partial<AuthState> {
  if (typeof window === "undefined") {
    return {};
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw) as Partial<AuthState>;
  } catch {
    return {};
  }
}

function writeStoredAuth(state: Partial<AuthState>) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    quantumToken: null,
    pendingOtp: null,
    pendingUserId: null,
    deviceFingerprint: null,
    isLoading: true,
  });

  useEffect(() => {
    const stored = readStoredAuth();
    setState((prev) => ({
      ...prev,
      ...stored,
      isLoading: false,
    }));
  }, []);

  const register = useCallback(async (payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    const deviceFingerprint = getOrCreateDeviceFingerprint();
    const response = await registerUser({ ...payload, deviceFingerprint });
    setState((prev) => ({
      ...prev,
      user: response.user,
      pendingOtp: response.otpCode,
      pendingUserId: response.user.id,
      token: response.token || prev.token,
      quantumToken: response.quantumToken || prev.quantumToken,
      deviceFingerprint,
    }));
    writeStoredAuth({
      user: response.user,
      pendingOtp: response.otpCode,
      pendingUserId: response.user.id,
      token: response.token || null,
      quantumToken: response.quantumToken || null,
      deviceFingerprint,
    });
    toast.success("OTP generated. Continue verification.");
  }, []);

  const login = useCallback(async (payload: { email: string; password: string }) => {
    const deviceFingerprint = getOrCreateDeviceFingerprint();
    const response = await loginUser({ ...payload, deviceFingerprint });
    setState((prev) => ({
      ...prev,
      user: response.user,
      token: response.token,
      quantumToken: response.quantumToken,
      pendingOtp: null,
      pendingUserId: null,
      deviceFingerprint,
    }));
    writeStoredAuth({
      user: response.user,
      token: response.token,
      quantumToken: response.quantumToken,
      pendingOtp: null,
      pendingUserId: null,
      deviceFingerprint,
    });
    toast.success("Quantum session secured.");
  }, []);

  const verifyOtpCode = useCallback(
    async (otp: string) => {
      if (!state.pendingUserId) {
        toast.error("No pending verification found.");
        return;
      }
      const response = await verifyOtp({ userId: state.pendingUserId, otp });
      setState((prev) => ({
        ...prev,
        user: response.user,
        pendingOtp: null,
      }));
      writeStoredAuth({
        ...state,
        user: response.user,
        pendingOtp: null,
      });
      toast.success("OTP verified. Face scan required.");
    },
    [state],
  );

  const verifyFaceScan = useCallback(async () => {
    if (!state.pendingUserId && !state.user?.id) {
      toast.error("No user to verify.");
      return;
    }
    const userId = state.user?.id || state.pendingUserId || "";
    const response = await verifyFace({ userId });
    setState((prev) => ({
      ...prev,
      user: response.user,
    }));
    writeStoredAuth({
      ...state,
      user: response.user,
    });
    toast.success("Identity locked. You are verified.");
  }, [state]);

  const refresh = useCallback(async () => {
    if (!state.token) {
      return;
    }
    const response = await fetchProfile(state.token);
    setState((prev) => ({
      ...prev,
      user: response.user,
    }));
  }, [state.token]);

  const logout = useCallback(() => {
    setState({
      user: null,
      token: null,
      quantumToken: null,
      pendingOtp: null,
      pendingUserId: null,
      deviceFingerprint: null,
      isLoading: false,
    });
    writeStoredAuth({});
    toast.info("Session cleared.");
  }, []);

  const value: AuthContextValue = {
    ...state,
    register,
    login,
    verifyOtpCode,
    verifyFaceScan,
    refresh,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

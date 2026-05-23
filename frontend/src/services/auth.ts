import { apiFetch } from "@/services/api";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  verified: boolean;
  hasVoted: boolean;
  role: "voter" | "admin";
  deviceFingerprint?: string;
};

export type RegisterResponse = {
  user: AuthUser;
  otpCode: string;
  otpExpiresAt: string;
  token?: string;
  quantumToken?: string;
};

export type LoginResponse = {
  token: string;
  quantumToken: string;
  user: AuthUser;
};

export type VerifyResponse = {
  user: AuthUser;
};

export async function registerUser(payload: {
  name: string;
  email: string;
  phone: string;
  password: string;
  deviceFingerprint: string;
}): Promise<RegisterResponse> {
  return apiFetch<RegisterResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload: {
  email: string;
  password: string;
  deviceFingerprint: string;
}): Promise<LoginResponse> {
  return apiFetch<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function verifyOtp(payload: {
  userId: string;
  otp: string;
}): Promise<VerifyResponse> {
  return apiFetch<VerifyResponse>("/api/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function verifyFace(payload: { userId: string }): Promise<VerifyResponse> {
  return apiFetch<VerifyResponse>("/api/auth/verify-face", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchProfile(token: string): Promise<{ user: AuthUser }> {
  return apiFetch<{ user: AuthUser }>("/api/auth/me", {
    method: "GET",
    token,
  });
}

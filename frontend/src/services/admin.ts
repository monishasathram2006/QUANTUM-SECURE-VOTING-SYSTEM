import { apiFetch } from "@/services/api";
import { mockMetrics, mockAlerts, mockVotes, mockVoters } from "@/data/metrics";

export type AdminMetrics = typeof mockMetrics;

export type AdminAlert = {
  id: string;
  type: string;
  severity: string;
  timestamp: string;
  details: string;
};

export type AdminVote = {
  id: string;
  transactionHash: string;
  voterHash: string;
  timestamp: string;
  anomalyScore: number;
};

export type AdminVoter = {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  hasVoted: boolean;
  role: string;
};

export async function getAdminMetrics(token?: string) {
  try {
    return await apiFetch<AdminMetrics>("/api/admin/metrics", {
      method: "GET",
      token,
    });
  } catch {
    return mockMetrics;
  }
}

export async function getAdminAlerts(token?: string) {
  try {
    return await apiFetch<AdminAlert[]>("/api/admin/alerts", { method: "GET", token });
  } catch {
    return mockAlerts as AdminAlert[];
  }
}

export async function getAdminVotes(token?: string) {
  try {
    return await apiFetch<AdminVote[]>("/api/admin/votes", { method: "GET", token });
  } catch {
    return mockVotes as AdminVote[];
  }
}

export async function getAdminVoters(token?: string) {
  try {
    return await apiFetch<AdminVoter[]>("/api/admin/voters", { method: "GET", token });
  } catch {
    return mockVoters as AdminVoter[];
  }
}

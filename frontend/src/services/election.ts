import { apiFetch } from "@/services/api";

export type ElectionState = {
  isOpen: boolean;
  startedAt?: string;
  endedAt?: string;
};

export async function getElectionState(): Promise<ElectionState> {
  return apiFetch<ElectionState>("/api/election", { method: "GET" });
}

export async function toggleElectionState(
  isOpen: boolean,
  token: string,
): Promise<ElectionState> {
  return apiFetch<ElectionState>("/api/admin/election", {
    method: "POST",
    token,
    body: JSON.stringify({ isOpen }),
  });
}

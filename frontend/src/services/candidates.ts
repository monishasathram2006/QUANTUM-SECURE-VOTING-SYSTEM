import { apiFetch } from "@/services/api";
import { mockCandidates } from "@/data/candidates";

export type Candidate = {
  id: string;
  name: string;
  party: string;
  image?: string;
  description: string;
  voteCount?: number;
};

export async function getCandidates(): Promise<Candidate[]> {
  try {
    return await apiFetch<Candidate[]>("/api/candidates", { method: "GET" });
  } catch {
    return mockCandidates;
  }
}

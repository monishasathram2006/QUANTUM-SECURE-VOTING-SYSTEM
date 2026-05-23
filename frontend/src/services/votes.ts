import { apiFetch } from "@/services/api";

export type VoteResponse = {
  transactionHash: string;
  timestamp: string;
  encryptedVote: string;
  signature: string;
  voterHash: string;
  blockId: string;
};

export async function castVote(candidateId: string, token: string) {
  return apiFetch<VoteResponse>("/api/votes", {
    method: "POST",
    token,
    body: JSON.stringify({ candidateId }),
  });
}

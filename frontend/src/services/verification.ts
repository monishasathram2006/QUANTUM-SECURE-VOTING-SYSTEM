import { apiFetch } from "@/services/api";

export type VerificationResult = {
  exists: boolean;
  transactionHash?: string;
  timestamp?: string;
  blockId?: string;
  voterHash?: string;
};

export async function verifyTransaction(hash: string): Promise<VerificationResult> {
  return apiFetch<VerificationResult>(`/api/verify/${hash}`, {
    method: "GET",
  });
}

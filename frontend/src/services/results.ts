import { apiFetch } from "@/services/api";
import { mockResults } from "@/data/metrics";

export async function getResults() {
  try {
    return await apiFetch("/api/results", { method: "GET" });
  } catch {
    return mockResults;
  }
}

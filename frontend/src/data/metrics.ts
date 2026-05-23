export const mockMetrics = {
  totalVotes: 1284,
  verifiedVoters: 2410,
  suspiciousVotes: 14,
  blockchainTransactions: 1284,
  quantumRisk: 0.18,
  voteSeries: [
    { time: "08:00", votes: 120 },
    { time: "09:00", votes: 210 },
    { time: "10:00", votes: 260 },
    { time: "11:00", votes: 310 },
    { time: "12:00", votes: 384 },
  ],
  riskSeries: [
    { label: "Low", value: 72 },
    { label: "Medium", value: 20 },
    { label: "High", value: 8 },
  ],
  qubitState: [
    { label: "|0>", value: 0.74 },
    { label: "|1>", value: 0.26 },
  ],
};

export const mockAlerts = [
  {
    id: "fa-001",
    type: "Rapid vote burst",
    severity: "high",
    timestamp: "2026-05-23T10:11:00Z",
    details: "Cluster of 18 votes in 42 seconds from shared subnet.",
  },
  {
    id: "fa-002",
    type: "Duplicate device fingerprint",
    severity: "medium",
    timestamp: "2026-05-23T09:47:00Z",
    details: "Fingerprint qvx-9f3c2d9 repeated 5 times in 6 minutes.",
  },
  {
    id: "fa-003",
    type: "Anomalous IP region",
    severity: "low",
    timestamp: "2026-05-23T09:22:00Z",
    details: "Vote originated from region with no registered voters.",
  },
];

export const mockVotes = [
  {
    id: "vote-001",
    transactionHash: "0x7fa31b9e5f23b0b9db90a0a02f12e0a4",
    voterHash: "vtr-2a1b5d...f92c",
    timestamp: "2026-05-23T10:12:00Z",
    anomalyScore: 8,
  },
  {
    id: "vote-002",
    transactionHash: "0x92c42e7dd1a3c012a4d7c2cc10d3992e",
    voterHash: "vtr-98fe11...a204",
    timestamp: "2026-05-23T10:13:00Z",
    anomalyScore: 62,
  },
];

export const mockVoters = [
  {
    id: "usr-001",
    name: "Nova Voter",
    email: "voter@quantumvotex.io",
    verified: true,
    hasVoted: true,
    role: "voter",
  },
  {
    id: "usr-002",
    name: "Lumen Citizen",
    email: "lumen@quantumvotex.io",
    verified: true,
    hasVoted: false,
    role: "voter",
  },
];

export const mockResults = {
  totalVotes: 1284,
  candidates: [
    { id: "cand-zenith", name: "Astra Zenith", votes: 442 },
    { id: "cand-orion", name: "Orion Vale", votes: 356 },
    { id: "cand-luma", name: "Luma Kerr", votes: 298 },
    { id: "cand-nyx", name: "Nyx Ravel", votes: 188 },
  ],
  fraudSummary: {
    alerts: 3,
    riskScore: 0.18,
    notes: "Quantum engine flagged 1.1% of votes for review.",
  },
};

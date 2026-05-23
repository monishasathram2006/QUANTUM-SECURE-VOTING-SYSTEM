const bcrypt = require("bcryptjs");

function buildDemoData() {
  const now = new Date();
  const adminPasswordHash = bcrypt.hashSync("admin123", 10);
  const voterPasswordHash = bcrypt.hashSync("voter123", 10);

  return {
    users: [
      {
        id: "usr_admin",
        name: "Quantum Admin",
        email: "admin@quantumvotex.io",
        phone: "+1-555-0100",
        passwordHash: adminPasswordHash,
        verified: true,
        faceVerified: true,
        hasVoted: false,
        role: "admin",
      },
      {
        id: "usr_voter",
        name: "Nova Voter",
        email: "voter@quantumvotex.io",
        phone: "+1-555-0101",
        passwordHash: voterPasswordHash,
        verified: true,
        faceVerified: true,
        hasVoted: false,
        role: "voter",
      },
    ],
    candidates: [
      {
        id: "cand-zenith",
        name: "Astra Zenith",
        party: "Quantum Unity",
        description: "Architect of the lattice-security act and pioneer of quantum-safe governance.",
      },
      {
        id: "cand-orion",
        name: "Orion Vale",
        party: "Civic Hypernet",
        description: "Advocates transparent voting ledgers and real-time citizen auditability.",
      },
      {
        id: "cand-luma",
        name: "Luma Kerr",
        party: "Neural Progress",
        description: "Champions AI-guided policy with quantum-resilient oversight.",
      },
      {
        id: "cand-nyx",
        name: "Nyx Ravel",
        party: "Nova Coalition",
        description: "Focuses on privacy-first democracy powered by post-quantum crypto.",
      },
    ],
    alerts: [
      {
        id: "alert-001",
        type: "Rapid vote burst",
        severity: "high",
        details: "Cluster of 18 votes in 42 seconds from shared subnet.",
      },
      {
        id: "alert-002",
        type: "Duplicate device fingerprint",
        severity: "medium",
        details: "Fingerprint qvx-9f3c2d9 repeated 5 times in 6 minutes.",
      },
    ],
    election: {
      isOpen: true,
      startedAt: now,
      endedAt: null,
    },
  };
}

module.exports = { buildDemoData };

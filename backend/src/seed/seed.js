require("dotenv").config();
const bcrypt = require("bcryptjs");
const { connectDb } = require("../config/db");
const { getDbMode } = require("../config/dbMode");
const Candidate = require("../models/Candidate");
const User = require("../models/User");
const FraudAlert = require("../models/FraudAlert");
const ElectionState = require("../models/ElectionState");

async function seed() {
  const mode = getDbMode();
  if (mode === "memory") {
    console.log("Memory DB mode enabled. Seed skipped (data is loaded on startup).");
    process.exit(0);
  }

  await connectDb();

  await Candidate.deleteMany({});
  await User.deleteMany({});
  await FraudAlert.deleteMany({});
  await ElectionState.deleteMany({});

  const candidates = await Candidate.insertMany([
    {
      name: "Astra Zenith",
      party: "Quantum Unity",
      description: "Architect of the lattice-security act and pioneer of quantum-safe governance.",
    },
    {
      name: "Orion Vale",
      party: "Civic Hypernet",
      description: "Advocates transparent voting ledgers and real-time citizen auditability.",
    },
    {
      name: "Luma Kerr",
      party: "Neural Progress",
      description: "Champions AI-guided policy with quantum-resilient oversight.",
    },
    {
      name: "Nyx Ravel",
      party: "Nova Coalition",
      description: "Focuses on privacy-first democracy powered by post-quantum crypto.",
    },
  ]);

  const adminPassword = await bcrypt.hash("admin123", 10);
  const voterPassword = await bcrypt.hash("voter123", 10);

  await User.insertMany([
    {
      name: "Quantum Admin",
      email: "admin@quantumvotex.io",
      phone: "+1-555-0100",
      passwordHash: adminPassword,
      verified: true,
      faceVerified: true,
      role: "admin",
    },
    {
      name: "Nova Voter",
      email: "voter@quantumvotex.io",
      phone: "+1-555-0101",
      passwordHash: voterPassword,
      verified: true,
      faceVerified: true,
      role: "voter",
    },
  ]);

  await FraudAlert.insertMany([
    {
      type: "Rapid vote burst",
      severity: "high",
      details: "Cluster of 18 votes in 42 seconds from shared subnet.",
    },
    {
      type: "Duplicate device fingerprint",
      severity: "medium",
      details: "Fingerprint qvx-9f3c2d9 repeated 5 times in 6 minutes.",
    },
  ]);

  await ElectionState.create({ isOpen: true, startedAt: new Date() });

  console.log(`Seeded ${candidates.length} candidates and demo users.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed", error);
  process.exit(1);
});

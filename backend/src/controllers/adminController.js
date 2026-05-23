const { store } = require("../storage");
const { buildQuantumSignal } = require("../utils/fraudSim");

function buildVoteSeries(totalVotes) {
  const base = Math.max(totalVotes, 60);
  return [
    { time: "08:00", votes: Math.round(base * 0.12) },
    { time: "09:00", votes: Math.round(base * 0.18) },
    { time: "10:00", votes: Math.round(base * 0.2) },
    { time: "11:00", votes: Math.round(base * 0.22) },
    { time: "12:00", votes: Math.round(base * 0.28) },
  ];
}

exports.getMetrics = async (req, res, next) => {
  try {
    const totalVotes = await store.votes.countAll();
    const verifiedVoters = await store.users.countVerified();
    const suspiciousVotes = await store.votes.countSuspicious();
    const blockchainTransactions = totalVotes;
    const quantumRisk = totalVotes ? Number((suspiciousVotes / totalVotes).toFixed(2)) : 0.0;

    const high = Math.min(Math.max(Math.round(quantumRisk * 100), 5), 35);
    const medium = Math.min(35, Math.round(20 + Math.log10(totalVotes + 1) * 8));
    const low = Math.max(100 - high - medium, 25);
    const riskSeries = [
      { label: "Low", value: low },
      { label: "Medium", value: medium },
      { label: "High", value: high },
    ];

    return res.json({
      totalVotes,
      verifiedVoters,
      suspiciousVotes,
      blockchainTransactions,
      quantumRisk,
      voteSeries: buildVoteSeries(totalVotes),
      riskSeries,
      qubitState: buildQuantumSignal(quantumRisk * 100),
    });
  } catch (error) {
    return next(error);
  }
};

exports.getVotes = async (req, res, next) => {
  try {
    const votes = await store.votes.list(50);
    const payload = votes.map((vote) => ({
      id: vote.id,
      transactionHash: vote.transactionHash,
      voterHash: `${vote.voterHash.slice(0, 6)}...${vote.voterHash.slice(-4)}`,
      timestamp: vote.timestamp,
      anomalyScore: vote.anomalyScore,
    }));
    return res.json(payload);
  } catch (error) {
    return next(error);
  }
};

exports.getVoters = async (req, res, next) => {
  try {
    const voters = await store.users.list(100);
    const payload = voters.map((user) => store.toSafeUser(user));
    return res.json(payload);
  } catch (error) {
    return next(error);
  }
};

exports.getAlerts = async (req, res, next) => {
  try {
    const alerts = await store.alerts.list(10);
    const payload = alerts.map((alert) => ({
      id: alert.id,
      type: alert.type,
      severity: alert.severity,
      timestamp: alert.timestamp,
      details: alert.details,
    }));
    return res.json(payload);
  } catch (error) {
    return next(error);
  }
};

exports.toggleElection = async (req, res, next) => {
  try {
    const { isOpen } = req.body;
    const state = await store.election.setState(isOpen);
    return res.json({ isOpen: state.isOpen, startedAt: state.startedAt, endedAt: state.endedAt });
  } catch (error) {
    return next(error);
  }
};

exports.getElectionState = async (req, res, next) => {
  try {
    const state = await store.election.getState();
    return res.json({ isOpen: state.isOpen, startedAt: state.startedAt, endedAt: state.endedAt });
  } catch (error) {
    return next(error);
  }
};

exports.getResults = async (req, res, next) => {
  try {
    const candidates = await store.candidates.list();
    const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.voteCount, 0);
    const alerts = await store.alerts.countAll();
    const suspiciousVotes = await store.votes.countSuspicious();
    const riskScore = totalVotes ? Number((suspiciousVotes / totalVotes).toFixed(2)) : 0.0;

    return res.json({
      totalVotes,
      candidates: candidates.map((candidate) => ({
        id: candidate.id,
        name: candidate.name,
        votes: candidate.voteCount,
      })),
      fraudSummary: {
        alerts,
        riskScore,
        notes: "Quantum engine flagged high-risk patterns for manual review.",
      },
    });
  } catch (error) {
    return next(error);
  }
};

const { store } = require("../storage");
const { sha256 } = require("../utils/hash");
const { buildLedgerEntry } = require("../utils/blockchain");
const { calculateAnomalyScore } = require("../utils/fraudSim");

async function ensureElectionState() {
  return store.election.getState();
}

exports.castVote = async (req, res, next) => {
  try {
    const { candidateId } = req.body;
    const user = req.user;
    if (!user.verified) {
      return res.status(403).json({ message: "User not verified" });
    }
    if (user.hasVoted) {
      return res.status(409).json({ message: "User already voted" });
    }

    const election = await ensureElectionState();
    if (!election.isOpen) {
      return res.status(403).json({ message: "Election is closed" });
    }

    const candidate = await store.candidates.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const voterHash = sha256(`${user.id}|${user.deviceFingerprint || "unknown"}`);
    const lastVote = await store.votes.findLatest();
    const chainIndex = lastVote ? lastVote.chainIndex + 1 : 0;
    const previousHash = lastVote ? lastVote.transactionHash : "GENESIS";

    const ledgerEntry = buildLedgerEntry({
      voterHash,
      candidateId: candidate.id,
      previousHash,
      chainIndex,
    });

    const recentVotes = await store.votes.countByIPSince(
      req.ip,
      new Date(Date.now() - 10 * 60 * 1000),
    );

    const anomalyScore = calculateAnomalyScore({
      ipAddress: req.ip,
      deviceFingerprint: user.deviceFingerprint,
      recentVotes,
    });

    const vote = await store.votes.create({
      candidateId: candidate.id,
      voterHash,
      anomalyScore,
      ipAddress: req.ip,
      ...ledgerEntry,
    });

    await store.candidates.incrementVote(candidate.id, 1);
    await store.users.updateById(user.id, { hasVoted: true });

    if (anomalyScore >= 70) {
      await store.alerts.create({
        type: "Anomalous vote pattern",
        severity: anomalyScore >= 85 ? "high" : "medium",
        details: "Quantum engine detected irregular voting signals.",
      });
    }

    return res.json({
      transactionHash: vote.transactionHash,
      timestamp: vote.timestamp,
      encryptedVote: vote.encryptedVote,
      signature: vote.signature,
      voterHash: vote.voterHash,
      blockId: vote.blockId,
    });
  } catch (error) {
    return next(error);
  }
};

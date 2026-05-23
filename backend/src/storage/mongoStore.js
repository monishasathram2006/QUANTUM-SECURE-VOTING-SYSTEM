const Candidate = require("../models/Candidate");
const ElectionState = require("../models/ElectionState");
const FraudAlert = require("../models/FraudAlert");
const User = require("../models/User");
const Vote = require("../models/Vote");

function mapUser(user) {
  if (!user) {
    return null;
  }
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    passwordHash: user.passwordHash,
    verified: user.verified,
    faceVerified: user.faceVerified,
    hasVoted: user.hasVoted,
    deviceFingerprint: user.deviceFingerprint,
    role: user.role,
    otpCode: user.otpCode,
    otpExpiresAt: user.otpExpiresAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function mapCandidate(candidate) {
  if (!candidate) {
    return null;
  }
  return {
    id: candidate._id.toString(),
    name: candidate.name,
    party: candidate.party,
    image: candidate.image,
    description: candidate.description,
    voteCount: candidate.voteCount,
    createdAt: candidate.createdAt,
    updatedAt: candidate.updatedAt,
  };
}

function mapVote(vote) {
  if (!vote) {
    return null;
  }
  return {
    id: vote._id.toString(),
    candidateId: vote.candidateId.toString(),
    encryptedVote: vote.encryptedVote,
    voterHash: vote.voterHash,
    transactionHash: vote.transactionHash,
    timestamp: vote.timestamp,
    signature: vote.signature,
    anomalyScore: vote.anomalyScore,
    blockId: vote.blockId,
    previousHash: vote.previousHash,
    chainIndex: vote.chainIndex,
    ipAddress: vote.ipAddress,
    createdAt: vote.createdAt,
    updatedAt: vote.updatedAt,
  };
}

function mapAlert(alert) {
  if (!alert) {
    return null;
  }
  return {
    id: alert._id.toString(),
    type: alert.type,
    severity: alert.severity,
    timestamp: alert.timestamp,
    details: alert.details,
    createdAt: alert.createdAt,
    updatedAt: alert.updatedAt,
  };
}

function mapElection(state) {
  if (!state) {
    return null;
  }
  return {
    id: state._id.toString(),
    isOpen: state.isOpen,
    startedAt: state.startedAt,
    endedAt: state.endedAt,
    createdAt: state.createdAt,
    updatedAt: state.updatedAt,
  };
}

function toSafeUser(user) {
  if (!user) {
    return null;
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    verified: user.verified,
    hasVoted: user.hasVoted,
    deviceFingerprint: user.deviceFingerprint,
    role: user.role,
  };
}

function createMongoStore() {
  return {
    users: {
      async create(data) {
        const user = await User.create(data);
        return mapUser(user);
      },
      async findByEmail(email) {
        const user = await User.findOne({ email: email.toLowerCase() });
        return mapUser(user);
      },
      async findById(id) {
        const user = await User.findById(id);
        return mapUser(user);
      },
      async updateById(id, updates) {
        const user = await User.findByIdAndUpdate(id, updates, { new: true });
        return mapUser(user);
      },
      async list(limit = 100) {
        const users = await User.find().sort({ createdAt: -1 }).limit(limit);
        return users.map(mapUser);
      },
      async countVerified() {
        return User.countDocuments({ verified: true });
      },
    },
    candidates: {
      async list() {
        const candidates = await Candidate.find().sort({ name: 1 });
        return candidates.map(mapCandidate);
      },
      async findById(id) {
        const candidate = await Candidate.findById(id);
        return mapCandidate(candidate);
      },
      async incrementVote(id, delta = 1) {
        const candidate = await Candidate.findByIdAndUpdate(
          id,
          { $inc: { voteCount: delta } },
          { new: true },
        );
        return mapCandidate(candidate);
      },
    },
    votes: {
      async create(data) {
        const vote = await Vote.create({
          candidateId: data.candidateId,
          encryptedVote: data.encryptedVote,
          voterHash: data.voterHash,
          transactionHash: data.transactionHash,
          timestamp: data.timestamp,
          signature: data.signature,
          anomalyScore: data.anomalyScore,
          blockId: data.blockId,
          previousHash: data.previousHash,
          chainIndex: data.chainIndex,
          ipAddress: data.ipAddress,
        });
        return mapVote(vote);
      },
      async findLatest() {
        const vote = await Vote.findOne().sort({ chainIndex: -1 });
        return mapVote(vote);
      },
      async countByIPSince(ipAddress, sinceDate) {
        return Vote.countDocuments({
          ipAddress,
          createdAt: { $gte: sinceDate },
        });
      },
      async countAll() {
        return Vote.countDocuments();
      },
      async countSuspicious() {
        return Vote.countDocuments({ anomalyScore: { $gte: 70 } });
      },
      async list(limit = 50) {
        const votes = await Vote.find().sort({ createdAt: -1 }).limit(limit);
        return votes.map(mapVote);
      },
      async findByHash(hash) {
        const vote = await Vote.findOne({ transactionHash: hash });
        return mapVote(vote);
      },
    },
    alerts: {
      async create(data) {
        const alert = await FraudAlert.create(data);
        return mapAlert(alert);
      },
      async list(limit = 10) {
        const alerts = await FraudAlert.find().sort({ createdAt: -1 }).limit(limit);
        return alerts.map(mapAlert);
      },
      async countAll() {
        return FraudAlert.countDocuments();
      },
    },
    election: {
      async getState() {
        let state = await ElectionState.findOne();
        if (!state) {
          state = await ElectionState.create({ isOpen: true, startedAt: new Date() });
        }
        return mapElection(state);
      },
      async setState(isOpen) {
        let state = await ElectionState.findOne();
        if (!state) {
          state = await ElectionState.create({ isOpen: Boolean(isOpen), startedAt: new Date() });
        } else {
          state.isOpen = Boolean(isOpen);
          if (state.isOpen && !state.startedAt) {
            state.startedAt = new Date();
          }
          if (!state.isOpen) {
            state.endedAt = new Date();
          }
          await state.save();
        }
        return mapElection(state);
      },
    },
    toSafeUser,
  };
}

module.exports = { createMongoStore, toSafeUser };

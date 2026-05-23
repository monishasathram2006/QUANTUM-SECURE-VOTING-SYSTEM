const { nanoid } = require("nanoid");
const { buildDemoData } = require("./demoData");

function withTimestamps(entity, createdAt) {
  const now = createdAt || new Date();
  return { ...entity, createdAt: now, updatedAt: now };
}

function seedDemo(state) {
  const demo = buildDemoData();
  if (state.users.length === 0) {
    state.users = demo.users.map((user) => withTimestamps(user));
  }
  if (state.candidates.length === 0) {
    state.candidates = demo.candidates.map((candidate) =>
      withTimestamps({ ...candidate, voteCount: candidate.voteCount || 0 }),
    );
  }
  if (state.alerts.length === 0) {
    state.alerts = demo.alerts.map((alert) => withTimestamps(alert));
  }
  if (!state.election) {
    state.election = withTimestamps(demo.election);
  }
}

function createMemoryStore() {
  const state = {
    users: [],
    candidates: [],
    votes: [],
    alerts: [],
    election: null,
  };

  seedDemo(state);

  const store = {
    users: {
      async create(data) {
        const user = withTimestamps({
          id: data.id || `usr_${nanoid(8)}`,
          name: data.name,
          email: data.email.toLowerCase(),
          phone: data.phone,
          passwordHash: data.passwordHash,
          verified: Boolean(data.verified),
          faceVerified: Boolean(data.faceVerified),
          hasVoted: Boolean(data.hasVoted),
          deviceFingerprint: data.deviceFingerprint || null,
          role: data.role || "voter",
          otpCode: data.otpCode || null,
          otpExpiresAt: data.otpExpiresAt || null,
        });
        state.users.push(user);
        return user;
      },
      async findByEmail(email) {
        return state.users.find((user) => user.email === email.toLowerCase()) || null;
      },
      async findById(id) {
        return state.users.find((user) => user.id === id) || null;
      },
      async updateById(id, updates) {
        const user = state.users.find((entry) => entry.id === id);
        if (!user) {
          return null;
        }
        Object.assign(user, updates, { updatedAt: new Date() });
        return user;
      },
      async list(limit = 100) {
        return [...state.users]
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .slice(0, limit);
      },
      async countVerified() {
        return state.users.filter((user) => user.verified).length;
      },
    },
    candidates: {
      async list() {
        return [...state.candidates].sort((a, b) => a.name.localeCompare(b.name));
      },
      async findById(id) {
        return state.candidates.find((candidate) => candidate.id === id) || null;
      },
      async incrementVote(id, delta = 1) {
        const candidate = state.candidates.find((entry) => entry.id === id);
        if (!candidate) {
          return null;
        }
        candidate.voteCount += delta;
        candidate.updatedAt = new Date();
        return candidate;
      },
    },
    votes: {
      async create(data) {
        const createdAt = data.timestamp ? new Date(data.timestamp) : new Date();
        const vote = withTimestamps(
          {
            id: data.id || `vote_${nanoid(10)}`,
            candidateId: data.candidateId,
            encryptedVote: data.encryptedVote,
            voterHash: data.voterHash,
            transactionHash: data.transactionHash,
            timestamp: data.timestamp || createdAt,
            signature: data.signature,
            anomalyScore: data.anomalyScore || 0,
            blockId: data.blockId,
            previousHash: data.previousHash || "GENESIS",
            chainIndex: data.chainIndex || 0,
            ipAddress: data.ipAddress || null,
          },
          createdAt,
        );
        state.votes.push(vote);
        return vote;
      },
      async findLatest() {
        if (state.votes.length === 0) {
          return null;
        }
        return state.votes.reduce((latest, current) =>
          current.chainIndex > latest.chainIndex ? current : latest,
        );
      },
      async countByIPSince(ipAddress, sinceDate) {
        return state.votes.filter(
          (vote) => vote.ipAddress === ipAddress && vote.createdAt >= sinceDate,
        ).length;
      },
      async countAll() {
        return state.votes.length;
      },
      async countSuspicious() {
        return state.votes.filter((vote) => vote.anomalyScore >= 70).length;
      },
      async list(limit = 50) {
        return [...state.votes]
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .slice(0, limit);
      },
      async findByHash(hash) {
        return state.votes.find((vote) => vote.transactionHash === hash) || null;
      },
    },
    alerts: {
      async create(data) {
        const alert = withTimestamps({
          id: data.id || `alert_${nanoid(8)}`,
          type: data.type,
          severity: data.severity,
          details: data.details,
          timestamp: data.timestamp || new Date(),
        });
        state.alerts.push(alert);
        return alert;
      },
      async list(limit = 10) {
        return [...state.alerts]
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .slice(0, limit);
      },
      async countAll() {
        return state.alerts.length;
      },
    },
    election: {
      async getState() {
        if (!state.election) {
          state.election = withTimestamps({ isOpen: true, startedAt: new Date(), endedAt: null });
        }
        return state.election;
      },
      async setState(isOpen) {
        if (!state.election) {
          state.election = withTimestamps({ isOpen: Boolean(isOpen), startedAt: new Date(), endedAt: null });
          return state.election;
        }
        state.election.isOpen = Boolean(isOpen);
        if (state.election.isOpen && !state.election.startedAt) {
          state.election.startedAt = new Date();
        }
        if (!state.election.isOpen) {
          state.election.endedAt = new Date();
        }
        state.election.updatedAt = new Date();
        return state.election;
      },
    },
    toSafeUser(user) {
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
    },
  };

  return store;
}

module.exports = { createMemoryStore };

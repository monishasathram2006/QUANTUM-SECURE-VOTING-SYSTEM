function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function calculateAnomalyScore({ ipAddress, deviceFingerprint, recentVotes }) {
  let score = Math.floor(Math.random() * 20) + 8;

  if (recentVotes > 3) {
    score += 28;
  }

  if (deviceFingerprint && deviceFingerprint.length > 10) {
    score += 8;
  }

  if (ipAddress && ipAddress.endsWith(".0")) {
    score += 12;
  }

  return clamp(score, 0, 100);
}

function buildQuantumSignal(score) {
  const q0 = clamp(1 - score / 120, 0.05, 0.95);
  const q1 = clamp(1 - q0, 0.05, 0.95);
  return [
    { label: "|0>", value: Number(q0.toFixed(2)) },
    { label: "|1>", value: Number(q1.toFixed(2)) },
  ];
}

module.exports = { calculateAnomalyScore, buildQuantumSignal };

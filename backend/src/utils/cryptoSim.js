const crypto = require("crypto");
const { sha256 } = require("./hash");

function generateQuantumToken() {
  return `qvx_${crypto.randomBytes(16).toString("hex")}`;
}

function simulateKyber(payload) {
  return `kyber_${sha256(payload).slice(0, 64)}`;
}

function simulateDilithium(payload) {
  return `dilithium_${sha256(payload).slice(0, 64)}`;
}

module.exports = {
  generateQuantumToken,
  simulateKyber,
  simulateDilithium,
};

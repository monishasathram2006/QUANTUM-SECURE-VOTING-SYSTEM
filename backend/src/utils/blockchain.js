const { sha256 } = require("./hash");
const { simulateKyber, simulateDilithium } = require("./cryptoSim");

function buildLedgerEntry({ voterHash, candidateId, previousHash, chainIndex }) {
  const timestamp = new Date();
  const entropy = `${voterHash}|${candidateId}|${timestamp.toISOString()}|${previousHash}|${chainIndex}`;
  const encryptedVote = simulateKyber(entropy);
  const signature = simulateDilithium(`${encryptedVote}|${previousHash}`);
  const transactionHash = sha256(`${encryptedVote}|${signature}|${previousHash}|${chainIndex}`);
  const blockId = `BLK-${transactionHash.slice(0, 12).toUpperCase()}`;

  return {
    encryptedVote,
    signature,
    transactionHash,
    timestamp,
    blockId,
    previousHash,
    chainIndex,
  };
}

module.exports = { buildLedgerEntry };

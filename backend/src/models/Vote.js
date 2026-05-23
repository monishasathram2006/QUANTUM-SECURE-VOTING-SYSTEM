const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema(
  {
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
    encryptedVote: { type: String, required: true },
    voterHash: { type: String, required: true },
    transactionHash: { type: String, required: true, unique: true },
    timestamp: { type: Date, required: true },
    signature: { type: String, required: true },
    anomalyScore: { type: Number, default: 0 },
    blockId: { type: String, required: true },
    previousHash: { type: String, default: "GENESIS" },
    chainIndex: { type: Number, default: 0 },
    ipAddress: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Vote", VoteSchema);

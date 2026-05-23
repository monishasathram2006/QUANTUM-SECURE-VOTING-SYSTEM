const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    party: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    voteCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Candidate", CandidateSchema);

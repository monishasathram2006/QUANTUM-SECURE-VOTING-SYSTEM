const mongoose = require("mongoose");

const FraudAlertSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    severity: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    details: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("FraudAlert", FraudAlertSchema);

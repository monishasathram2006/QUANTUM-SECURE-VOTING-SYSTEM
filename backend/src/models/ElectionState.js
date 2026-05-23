const mongoose = require("mongoose");

const ElectionStateSchema = new mongoose.Schema(
  {
    isOpen: { type: Boolean, default: true },
    startedAt: { type: Date },
    endedAt: { type: Date },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ElectionState", ElectionStateSchema);

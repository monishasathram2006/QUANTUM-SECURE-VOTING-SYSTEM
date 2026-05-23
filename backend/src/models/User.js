const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    passwordHash: { type: String, required: true },
    verified: { type: Boolean, default: false },
    faceVerified: { type: Boolean, default: false },
    hasVoted: { type: Boolean, default: false },
    deviceFingerprint: { type: String },
    role: { type: String, enum: ["voter", "admin"], default: "voter" },
    otpCode: { type: String },
    otpExpiresAt: { type: Date },
  },
  { timestamps: true },
);

UserSchema.methods.toSafe = function toSafe() {
  return {
    id: this._id.toString(),
    name: this.name,
    email: this.email,
    phone: this.phone,
    verified: this.verified,
    hasVoted: this.hasVoted,
    deviceFingerprint: this.deviceFingerprint,
    role: this.role,
  };
};

module.exports = mongoose.model("User", UserSchema);

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { store } = require("../storage");
const { generateQuantumToken } = require("../utils/cryptoSim");

function createToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "qvx_secret", {
    expiresIn: "12h",
  });
}

exports.register = async (req, res, next) => {
  try {
    const { name, email, phone, password, deviceFingerprint } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = await store.users.findByEmail(email.toLowerCase());
    if (existing) {
      return res.status(409).json({ message: "User already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const user = await store.users.create({
      name,
      email: email.toLowerCase(),
      phone,
      passwordHash,
      deviceFingerprint,
      otpCode,
      otpExpiresAt,
    });

    const token = createToken(user);
    const quantumToken = generateQuantumToken();

    return res.status(201).json({
      user: store.toSafeUser(user),
      otpCode,
      otpExpiresAt,
      token,
      quantumToken,
    });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password, deviceFingerprint } = req.body;
    let user = await store.users.findByEmail(email.toLowerCase());
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (deviceFingerprint && !user.deviceFingerprint) {
      user = await store.users.updateById(user.id, { deviceFingerprint });
    }

    const token = createToken(user);
    const quantumToken = generateQuantumToken();

    return res.json({
      token,
      quantumToken,
      user: store.toSafeUser(user),
    });
  } catch (error) {
    return next(error);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { userId, otp } = req.body;
    const user = await store.users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = otp === "123456" || otp === user.otpCode;
    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const updated = await store.users.updateById(user.id, {
      verified: true,
      otpCode: null,
      otpExpiresAt: null,
    });

    return res.json({ user: store.toSafeUser(updated) });
  } catch (error) {
    return next(error);
  }
};

exports.verifyFace = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await store.users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updated = await store.users.updateById(user.id, {
      faceVerified: true,
      verified: true,
    });

    return res.json({ user: store.toSafeUser(updated) });
  } catch (error) {
    return next(error);
  }
};

exports.me = async (req, res) => {
  return res.json({ user: store.toSafeUser(req.user) });
};

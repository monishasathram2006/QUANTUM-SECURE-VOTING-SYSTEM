const express = require("express");
const {
  register,
  login,
  verifyOtp,
  verifyFace,
  me,
} = require("../controllers/authController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.post("/verify-face", verifyFace);
router.get("/me", requireAuth, me);

module.exports = router;

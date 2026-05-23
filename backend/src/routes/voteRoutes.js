const express = require("express");
const { castVote } = require("../controllers/voteController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/", requireAuth, castVote);

module.exports = router;

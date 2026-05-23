const express = require("express");
const {
  getMetrics,
  getVotes,
  getVoters,
  getAlerts,
  toggleElection,
  getElectionState,
  getResults,
} = require("../controllers/adminController");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/metrics", requireAuth, requireAdmin, getMetrics);
router.get("/votes", requireAuth, requireAdmin, getVotes);
router.get("/voters", requireAuth, requireAdmin, getVoters);
router.get("/alerts", requireAuth, requireAdmin, getAlerts);
router.post("/election", requireAuth, requireAdmin, toggleElection);
router.get("/election", requireAuth, requireAdmin, getElectionState);
router.get("/results", requireAuth, requireAdmin, getResults);

module.exports = router;

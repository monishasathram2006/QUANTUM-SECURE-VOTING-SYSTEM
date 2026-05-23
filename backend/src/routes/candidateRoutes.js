const express = require("express");
const { listCandidates } = require("../controllers/candidateController");

const router = express.Router();

router.get("/", listCandidates);

module.exports = router;

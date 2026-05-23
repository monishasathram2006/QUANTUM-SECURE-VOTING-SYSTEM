const express = require("express");
const { getElectionState } = require("../controllers/adminController");

const router = express.Router();

router.get("/", getElectionState);

module.exports = router;

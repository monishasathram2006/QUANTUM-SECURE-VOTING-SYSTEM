const express = require("express");
const { verifyTransaction } = require("../controllers/verifyController");

const router = express.Router();

router.get("/:hash", verifyTransaction);

module.exports = router;

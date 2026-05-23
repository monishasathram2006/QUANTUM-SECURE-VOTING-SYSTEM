const express = require("express");
const { getResults } = require("../controllers/adminController");

const router = express.Router();

router.get("/", getResults);

module.exports = router;

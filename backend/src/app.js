const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const voteRoutes = require("./routes/voteRoutes");
const adminRoutes = require("./routes/adminRoutes");
const verifyRoutes = require("./routes/verifyRoutes");
const resultsRoutes = require("./routes/resultsRoutes");
const electionRoutes = require("./routes/electionRoutes");
const { notFound, errorHandler } = require("./middleware/error");

const app = express();

app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", name: "QuantumVoteX API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/verify", verifyRoutes);
app.use("/api/results", resultsRoutes);
app.use("/api/election", electionRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

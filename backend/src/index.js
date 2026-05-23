require("dotenv").config();
const app = require("./app");
const { connectDb } = require("./config/db");
const { mode } = require("./storage");

const port = process.env.PORT || 5000;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`QuantumVoteX API running on port ${port}`);
      console.log(`Database mode: ${mode}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server", error);
    process.exit(1);
  });

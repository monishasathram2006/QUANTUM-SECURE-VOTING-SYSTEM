const mongoose = require("mongoose");
const { getDbMode } = require("./dbMode");

async function connectDb() {
  const mode = getDbMode();
  if (mode === "memory") {
    console.log("Memory database mode enabled");
    return;
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not set");
  }
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}

module.exports = { connectDb };

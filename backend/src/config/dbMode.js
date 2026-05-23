function getDbMode() {
  const mode = process.env.DB_MODE;
  if (mode === "memory" || mode === "mongo") {
    return mode;
  }
  return process.env.MONGO_URI ? "mongo" : "memory";
}

module.exports = { getDbMode };

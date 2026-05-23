const { getDbMode } = require("../config/dbMode");
const { createMemoryStore } = require("./memoryStore");
const { createMongoStore } = require("./mongoStore");

const mode = getDbMode();
const isMemory = mode === "memory";
const store = isMemory ? createMemoryStore() : createMongoStore();

module.exports = { store, isMemory, mode };

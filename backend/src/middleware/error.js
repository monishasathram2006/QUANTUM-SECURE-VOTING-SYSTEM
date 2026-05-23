function notFound(req, res) {
  return res.status(404).json({ message: "Route not found" });
}

function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  return res.status(status).json({ message: err.message || "Server error" });
}

module.exports = { notFound, errorHandler };

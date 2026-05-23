const { store } = require("../storage");

exports.listCandidates = async (req, res, next) => {
  try {
    const candidates = await store.candidates.list();
    return res.json(candidates);
  } catch (error) {
    return next(error);
  }
};

const { store } = require("../storage");

exports.verifyTransaction = async (req, res, next) => {
  try {
    const { hash } = req.params;
    const vote = await store.votes.findByHash(hash);
    if (!vote) {
      return res.json({ exists: false });
    }

    return res.json({
      exists: true,
      transactionHash: vote.transactionHash,
      timestamp: vote.timestamp,
      blockId: vote.blockId,
      voterHash: vote.voterHash,
    });
  } catch (error) {
    return next(error);
  }
};

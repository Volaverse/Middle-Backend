//This api gives list of all the NFTs
const api = require("../../requests");

module.exports = function (app) {
  app.get("/tokenInfo", (_req, res) => {
    api
      .fetchAllNFTTokens()
      .then((result) => {
        res.json({ success: true, data: result });
      })
      .catch((err) => {
        res.status(400).json({ success: false, error: err.message });
      });
  });
};

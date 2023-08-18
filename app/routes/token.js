const api = require("../../requests");

module.exports = function (app) {
  app.get("/tokenInfo", (_req, res) => {
    api.fetchAllNFTTokens().then((result) => {
      res.json({ success: true, data: result });
    });
  });
};

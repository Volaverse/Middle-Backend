//This api is to get information about the blockchain
const api = require("../../requests");

module.exports = function (app) {
  app.post("/info", (_req, res) => {
    api
      .fetchNodeInfo()
      .then((result) => {
        res.json({ success: true, data: result });
      })
      .catch((err) => {
        res.status(400).json({ success: false, error: err.message });
      });
  });
};

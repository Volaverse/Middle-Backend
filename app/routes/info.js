const api = require("../../requests");
module.exports = function (app) {
  app.post("/info", (_req, res) => {
    api.fetchNodeInfo().then((result) => {
      res.json({ success: true, data: result });
    });
  });
};

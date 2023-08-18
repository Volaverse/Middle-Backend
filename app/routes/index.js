const info = require("./info");
const buy = require("./buy");
const sell = require("./sell");
const login = require("./login");
const create = require("./createAcc");
const tokenInfo = require("./token");
const getUsername = require("./getUsername");
const addFaucet = require("./faucet");
module.exports = function (app) {
  login(app);
  buy(app);
  info(app);
  sell(app);
  create(app);
  getUsername(app);
  tokenInfo(app);
  addFaucet(app);
};

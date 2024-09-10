const addInfo = require("./addInfo");
const getUsername = require("./getUsername");
const blog = require("./blog");
const getUserNfts = require("./getUserNfts");
const getAllListings = require("./nftData");
const getUserWearables = require("./getUserWearables");
const getLandInfo = require("./getLandInfo");
const checkTokenOwnership = require("./checkInfo");
module.exports = function (app) {
  getUsername(app);
  addInfo(app);
  blog(app);
  getUserNfts(app);
  getUserWearables(app);
  getAllListings(app);
  getLandInfo(app);
  checkTokenOwnership(app);
};

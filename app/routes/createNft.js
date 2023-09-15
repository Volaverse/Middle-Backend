// This is api for creating the nft.Nft can only be created for category 3 which is for username
//It takes name,tokenId,passphrase of the user,purchase value and fee as input
const api = require("../../requests");

module.exports = function (app) {
  app.post("/createNft", async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const minPurchaseMargin = req.body.minPurchaseMargin;
    const initValue = req.body.initValue;
    const imageUrl = req.body.imageUrl;
    const category = req.body.category;
    const passphrase = req.body.passphrase;
    const fee = req.body.fee;
    const nft_tokens = await api.fetchAllNFTTokens();
    const dup = nft_tokens.filter((nft) => nft.name == name);

    if (dup.length > 0) {
      res.status(400).json({ Message: "Username already taken" });
    }
    if (fee <= 0) {
      res.status(400).json({ Message: "Fee value is too low." });
    }
    if (initValue <= 0) {
      res.status(400).json({ Message: "NFT init value is too low." });
    } else if (minPurchaseMargin < 0 || minPurchaseMargin > 100) {
      res.status(400).json({
        Message:
          "The NFT minimum purchase value needs to be between 0 and 100.",
      });
    }

    if (!name) {
      return res.status(400).json({ msg: "Please send the name parameter" });
    }
    if (!description) {
      return res
        .status(400)
        .json({ msg: "Please send the description parameter" });
    }
    if (!imageUrl) {
      return res
        .status(400)
        .json({ msg: "Please send the imageUrl parameter" });
    }
    if (!category) {
      return res
        .status(400)
        .json({ msg: "Please send the category parameter" });
    }
    if (!passphrase) {
      return res
        .status(400)
        .json({ msg: "Please send the passphrase parameter" });
    }
    if (!fee) {
      return res.status(400).json({ msg: "Please send the fee parameter" });
    }
    if (!(category == 3 || category == "3")) {
      return res
        .status(400)
        .json({ Message: "Cannot create nft for the given category" });
    }
    let transaction;
    try {
      transaction = await api.createNft({
        name,
        description,
        initValue,
        minPurchaseMargin,
        passphrase,
        category,
        imageUrl,
        fee,
      });
    } catch (err) {
      return res.status(400).json({ Message: "Kindly Try after sometime" });
    }

    if (!transaction) {
      return res.status(400).json({
        Message: "Cannot send the transaction.Kindly try after sometime",
      });
    }
    if (
      transaction.transactionId != undefined &&
      transaction.transactionId != ""
    ) {
      res.json({ status: "success", Message: "Your Nft has been created" });
    } else {
      res.status(400).json({ Message: "Kindly try after sometime" });
    }
  });
};

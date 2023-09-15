// This is api for buying the nft.
//It takes name,tokenId,passphrase of the user,purchase value and fee as input
const api = require("../../requests");

module.exports = function (app) {
  app.post("/buy", async (req, res) => {
    const name = req.body.name;
    const nftId = req.body.id;
    const purchaseValue = req.body.purchaseValue;
    const passphrase = req.body.passphrase;
    const fee = req.body.fee;

    if (!name) {
      return res.status(400).json({ msg: "Please send the name parameter" });
    }
    if (!nftId) {
      return res.status(400).json({ msg: "Please send the id parameter" });
    }
    if (!passphrase) {
      return res
        .status(400)
        .json({ msg: "Please send the passphrase parameter" });
    }
    if (!purchaseValue) {
      return res
        .status(400)
        .json({ msg: "Please send the purchaseValue parameter" });
    }
    if (!fee) {
      return res.status(400).json({ msg: "Please send the fee parameter" });
    }

    let transaction;
    try {
      transaction = await api.purchaseNft({
        name,
        nftId,
        purchaseValue,
        fee,
        passphrase,
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
      res.json({ status: "success", Message: "Your Nft has been purchased" });
    } else {
      res.status(400).json({ Message: "Kindly try after sometime" });
    }
  });
};

//This api is used to make the nft available at the marketplace
const api = require("../../requests");

module.exports = function (app) {
  app.post("/sell", async (req, res) => {
    const name = req.body.name;
    const nftId = req.body.id;
    const minPurchaseMargin = req.body.minPurchaseMargin;
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
    if (!minPurchaseMargin) {
      return res
        .status(400)
        .json({ msg: "Please send the minPurchaseMargin parameter" });
    }
    if (!fee) {
      return res.status(400).json({ msg: "Please send the fee parameter" });
    }
    let transaction;
    try {
      transaction = await api.sellNft({
        name,
        nftId,
        minPurchaseMargin,
        passphrase,
        fee,
      });
    } catch (err) {
      return res.status(400).json({ Message: "Kindly try after sometime" });
    }

    if (!transaction) {
      return res.status(400).json({
        Message: "Cannot send the transaction.Kindly try after sometime",
      });
    }

    if (
      transaction.transactionId != undefined &&
      transaction.transaactionId != ""
    ) {
      res.json({ status: "success", Message: "Your Nft has been sold" });
    } else {
      res.status(400).json({ Message: "Kindly try after sometime" });
    }
  });
};

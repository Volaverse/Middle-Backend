const api = require("../../requests");
const buy_tokken = require("../../utils/transactions/purchaseNftToken");

module.exports = function (app) {
  app.post("/buy", async (req, res) => {
    const nodeInfo = await api.fetchNodeInfo();
    const name = req.body.name;
    const id = req.body.id;
    const purchaseValue = req.body.purchaseValue;
    const passphrase = req.body.passphrase;
    const fee = req.body.fee;

    if (!name) {
      return res.status(400).json({ msg: "Please send the name parameter" });
    }
    if (!id) {
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
    var networkId, minFee;
    if (nodeInfo) {
      networkId = nodeInfo.networkIdentifier;
      minFee = nodeInfo.genesisConfig.minFeePerByte;
    } else {
      res.status(400).json({
        Message: "Cannot get network info from the blockchain.Kindly try again",
      });
    }
    const transaction = await buy_tokken.purchaseNFTToken(
      name,
      id,
      purchaseValue,
      passphrase,
      fee,
      networkId,
      minFee
    );
    if (!transaction) {
      return res.status(400).json({
        Message: "Cannot get the transaction.Kindly try after sometime",
      });
    }
    const resp = await api.sendTransactions(transaction.tx);
    if (!resp) {
      return res.status(400).json({
        Message: "Cannot send the transaction.Kindly try after sometime",
      });
    }
    if (
      resp.data.data.transactionId != undefined &&
      resp.data.data.transactionId != ""
    ) {
      res.json({ status: "success", Message: "Your Nft has been purchased" });
    } else {
      res.status(400).json({ Message: "Kindly Try after sometime" });
    }
  });
};

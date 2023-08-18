const api = require("../../requests");
const transfer = require("../../utils/transactions/transfer");
const dotenv = require("dotenv");
dotenv.config();

module.exports = function (app) {
  app.post("/addFaucet", async (req, res) => {
    const nodeInfo = await api.fetchNodeInfo();
    const recipientAddress = req.body.recipientAddress;
    const amount = req.body.amount;
    const fee = req.body.fee;
    if (!recipientAddress) {
      return res
        .status(400)
        .json({ msg: "Please send the recipientAddress parameter" });
    }
    if (!amount) {
      return res.status(400).json({ msg: "Please send the amount parameter" });
    }
    if (!fee) {
      return res.status(400).json({ msg: "Please send the fee parameter" });
    }
    // eslint-disable-next-line no-undef
    const passphrase = process.env.passphrase_faucet;
    var networkId, minFee;
    if (nodeInfo) {
      networkId = nodeInfo.networkIdentifier;
      minFee = nodeInfo.genesisConfig.minFeePerByte;
    } else {
      res.status(400).json({
        Message: "Cannot get network info from the blockchain.Kindly try again",
      });
    }

    const transaction = await transfer.transfer(
      recipientAddress,
      amount,
      passphrase,
      fee,
      networkId,
      minFee
    );
    if (!transaction) {
      return res.status(400).json({
        Message: "Cannot sign the transaction.Kindly Try after sometime",
      });
    }
    const resp = await api.sendTransactions(transaction.tx);
    if (!resp) {
      return res.status(400).json({
        Message: "Cannot send the transaction.Kindly Try after sometime",
      });
    }

    if (
      resp.data.data.transactionId != undefined &&
      resp.data.data.transactionId != ""
    ) {
      res.json({ status: "success", Message: "Faucet has been transfered" });
    } else {
      res.status(400).json({ Message: "Kindly Try after sometime" });
    }
  });
};

const { passphrase, cryptography } = require("@liskhq/lisk-client");
const transfer = require("../../utils/transactions/transfer");
const api = require("../../requests");
const dotenv = require("dotenv");
dotenv.config();

module.exports = function (app) {
  app.get("/create", async (_req, res) => {
    const pass = passphrase.Mnemonic.generateMnemonic();
    const address = cryptography
      .getBase32AddressFromPassphrase(pass)
      .toString("hex");
    const nodeInfo = await api.fetchNodeInfo();
    const recipientAddress = address;
    const amount = "5";
    const fee = "2";
    // eslint-disable-next-line no-undef
    const passphrase_faucet = process.env.passphrase_faucet;
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
      passphrase_faucet,
      fee,
      networkId,
      minFee
    );
    if (!transaction) {
      return res.status(400).json({
        Message: "Cannot sign the transaction.Kindly try after sometime",
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
      res.json({
        status: "success",
        Message: "Account is created with 5 lisk faucet",
        password: pass,
        display_add: address,
      });
    } else {
      res.status(400).json({ Message: "Kindly Try after sometime" });
    }
  });
};

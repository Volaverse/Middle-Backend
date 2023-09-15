//This api is used to create account with lisk faucet
const { passphrase, cryptography } = require("@liskhq/lisk-client");
const api = require("../../requests");
const dotenv = require("dotenv");
dotenv.config();

module.exports = function (app) {
  app.get("/create", async (_req, res) => {
    const pass = passphrase.Mnemonic.generateMnemonic();
    const address = cryptography
      .getBase32AddressFromPassphrase(pass)
      .toString("hex");
    const recipientAddress = cryptography
      .getAddressFromPassphrase(pass)
      .toString("hex");
    // eslint-disable-next-line no-undef
    var transaction;
    try {
      transaction = await api.faucet(recipientAddress);
    } catch (err) {
      return res.status(400).json({ Message: "Kindly Try after sometime" });
    }
    if (!transaction) {
      return res.status(400).json({
        Message: "Cannot sign the transaction.Kindly try after sometime",
      });
    }

    if (transaction.result != undefined && transaction.result != "") {
      res.json({
        status: "success",
        Message: "Account is created with 100 lisk faucet",
        password: pass,
        display_add: address,
      });
    } else {
      res.status(400).json({ Message: "Kindly Try after sometime" });
    }
  });
};

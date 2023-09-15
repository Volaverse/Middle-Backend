//This api is for transfering faucet to a given address
const api = require("../../requests");
const dotenv = require("dotenv");
dotenv.config();

module.exports = function (app) {
  app.post("/addFaucet", async (req, res) => {
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
    let transaction;
    try {
      transaction = await api.faucet(recipientAddress, amount);
    } catch (err) {
      return res.status(400).json({ Message: "Kindly try after sometime" });
    }

    if (!transaction) {
      return res.status(400).json({
        Message: "Cannot sign the transaction.Kindly try after sometime",
      });
    }
    if (transaction.result != undefined && transaction.result != "") {
      res.json({ status: "success", Message: "Faucet has been transfered" });
    } else {
      res.status(400).json({ Message: "Kindly try after sometime" });
    }
  });
};

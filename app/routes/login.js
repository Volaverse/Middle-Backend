/* global Buffer */
//This api is used to return lisk address associated with a particular passphrase
const { cryptography } = require("@liskhq/lisk-client");

module.exports = function (app) {
  app.post("/login", async (req, res) => {
    const passphrase = req.body.passphrase;
    if (!passphrase) {
      return res
        .status(400)
        .json({ msg: "Please send the passphrase parameter" });
    }
    const address = cryptography
      .getAddressFromPassphrase(passphrase)
      .toString("hex");
    const base32UIAddress = cryptography
      .getBase32AddressFromAddress(Buffer.from(address, "hex"), "lsk")
      .toString("binary");

    res.json({ status: "success", display_add: base32UIAddress });
  });
};

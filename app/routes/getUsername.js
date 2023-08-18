const userData = require("../../models/user");

module.exports = function (app) {
  app.post("/getUsername", async (req, res) => {
    const liskAddress = req.body.liskAddress;
    if (!liskAddress) {
      return res
        .status(400)
        .json({ msg: "Please send the liskAddress parameter" });
    }

    try {
      const exsistingUser = await userData.findOne({ liskAddress });

      if (exsistingUser) {
        return res.status(200).json({ message: exsistingUser.userName });
      } else {
        return res.status(200).json({ message: "No user found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  });
};

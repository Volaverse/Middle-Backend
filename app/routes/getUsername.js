const userData = require("../../models/user");

module.exports = function (app) {
  app.post("/getUsername", async (req, res) => {
    const walletAddress = req.body.walletAddress;

    // Check if any field is null
    if (!walletAddress) {
      return res
        .status(400)
        .json({ success: false, msg: "Please enter all required fields" });
    }

    try {
      const exsistingUser = await userData.findOne({ walletAddress });
      console.log(exsistingUser);

      if (exsistingUser) {
        return res
          .status(200)
          .json({ success: true, message: exsistingUser.userName });
      } else {
        return res
          .status(200)
          .json({ success: false, message: "No user found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  });
};

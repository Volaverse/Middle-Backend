const userData = require("../../models/user");

module.exports = function (app) {
  console.log("Add Info to DB");

  app.post("/addInfo", async (req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const walletAddress = req.body.walletAddress;

    // Check if any field is null
    if (!userName) {
      return res.status(400).json({ msg: "Please enter username" });
    }

    try {
      const exsistingUser = await userData.findOne({ userName });

      if (exsistingUser)
        return res.status(200).json({ message: "Username already taken" });

      await userData.create({
        userName,
        email,
        walletAddress,
      });

      res.status(200).json({ message: "User created" });
    } catch (error) {
      console.log("err", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  });
};

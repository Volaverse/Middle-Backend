const userData = require("../../models/user");

module.exports = function (app) {
  app.post("/addInfo", async (req, res) => {
    const fullName = req.body.fullName;
    const userName = req.body.userName;
    const phoneNumber = req.body.phoneNumber;
    const age = req.body.age;
    const email = req.body.email;
    const liskAddress = req.body.liskAddress;

    // Check if any field is null
    if (!userName || !email || !age || !fullName) {
      return res.status(400).json({ msg: "Please enter all required fields" });
    }

    try {
      const exsistingUser = await userData.findOne({ userName });

      if (exsistingUser)
        return res.status(200).json({ message: "Username is already taken" });

      await userData.create({
        fullName,
        userName,
        phoneNumber,
        age,
        email,
        liskAddress,
      });

      res.status(200).json({ message: "User created " });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  });
};

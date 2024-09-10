const axios = require("axios");

module.exports = function (app) {
  const WEARABLE_ADDRESS = process.env.WEARABLE_CONTRACT.toLowerCase();

  app.get("/getUserWearables", async (req, res) => {
    try {
      const userAddress = req.query.address;
      const token = req.query.id;

      if (!userAddress) {
        return res.status(400).send("User address is required");
      }

      const lowerCaseUserAddress = userAddress.toLowerCase();

      // Fetch wearable NFTs
      const wearableNftsResponse = await axios.get(
        `https://blockscout.lisk.com/api/v2/tokens/${WEARABLE_ADDRESS}/instances?holder_address_hash=${lowerCaseUserAddress}`
      );
      const wearableNfts = wearableNftsResponse.data.items || [];

      if (token) {
        const hasToken = wearableNfts.some((item) => item.id === token);
        return res.json({ status: "success", data: hasToken });
      }

      const filteredNfts = {
        status: "success",
        data: {
          Wearable: [],
        },
      };

      // Process wearable NFTs
      filteredNfts.data.Wearable.push({
        amount: wearableNfts.length.toString(),
        tokenInstances: wearableNfts.map((item) => ({
          id: item.id,
        })),
      });

      res.json(filteredNfts);
    } catch (error) {
      console.error("Failed to fetch or process NFTs:", error);
      res.status(500).send("Error fetching or processing NFTs");
    }
  });
};

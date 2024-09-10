const axios = require("axios");

module.exports = function (app) {
  const LAND_ADDRESS = process.env.LAND_CONTRACT.toLowerCase();
  const WEARABLE_ADDRESS = process.env.WEARABLE_CONTRACT.toLowerCase();

  app.get("/getUserNfts", async (req, res) => {
    try {
      const userAddress = req.query.address;

      if (!userAddress) {
        return res.status(400).send("User address is required");
      }

      const lowerCaseUserAddress = userAddress.toLowerCase();

      // Fetch land NFTs
      const landNftsResponse = await axios.get(
        `https://blockscout.lisk.com/api/v2/tokens/${LAND_ADDRESS}/instances?holder_address_hash=${lowerCaseUserAddress}`
      );
      const landNfts = landNftsResponse.data.items || [];

      // Fetch wearable NFTs
      const wearableNftsResponse = await axios.get(
        `https://blockscout.lisk.com/api/v2/tokens/${WEARABLE_ADDRESS}/instances?holder_address_hash=${lowerCaseUserAddress}`
      );
      const wearableNfts = wearableNftsResponse.data.items || [];

      const filteredNfts = {
        status: "success",
        data: {
          Land: [],
          Wearable: [],
        },
      };

      // Process land NFTs
      filteredNfts.data.Land.push({
        amount: landNfts.length.toString(),
        tokenInstances: landNfts.map((item) => ({
          animation_url: item.animation_url,
          external_app_url: item.external_app_url,
          id: item.id,
          image_url: item.image_url,
          is_unique: item.is_unique,
          metadata: item.metadata,
          owner: item.owner,
          token: item.token,
          token_type: item.token_type,
          value: item.value,
        })),
      });

      // Process wearable NFTs
      filteredNfts.data.Wearable.push({
        amount: wearableNfts.length.toString(),
        tokenInstances: wearableNfts.map((item) => ({
          animation_url: item.animation_url,
          external_app_url: item.external_app_url,
          id: item.id,
          image_url: item.image_url,
          is_unique: item.is_unique,
          metadata: item.metadata,
          owner: item.owner,
          token: item.token,
          token_type: item.token_type,
          value: item.value,
        })),
      });

      res.json(filteredNfts);
    } catch (error) {
      console.error("Failed to fetch or process NFTs:", error);
      res.status(500).send("Error fetching or processing NFTs");
    }
  });
};

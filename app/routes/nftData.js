const { Web3 } = require("web3");
const fs = require("fs");
const web3 = new Web3("https://rpc.api.lisk.com");
const abi = "./contractABI.json";
const rawAbi = fs.readFileSync(abi, { encoding: "utf8" });
const contractABI = JSON.parse(rawAbi);
// Contract setup
const nftContractAddress = process.env.MARKETPLACE_CONTRACT;
const contract = new web3.eth.Contract(contractABI, nftContractAddress);
const landAddress = process.env.LAND_CONTRACT;
const wearableAddress = process.env.WEARABLE_CONTRACT;

function serializeBigNumbers(data) {
  for (const key in data) {
    if (typeof data[key] === "bigint") {
      // Check if the property is a BigInt
      data[key] = data[key].toString(); // Convert to string
    } else if (typeof data[key] === "object") {
      // Recursively handle nested objects
      serializeBigNumbers(data[key]);
    }
  }
}

module.exports = function (app) {
  app.get("/nftListings", async (req, res) => {
    try {
      const data = await contract.methods.getAllListings().call();

      if (data.length == 0) {
        return res.json([]);
      }
      const processedData = {
        status: "success",
        data: {
          Land: [],
          Wearable: [],
        },
      };

      data.forEach((listing) => {
        const listingObj = {
          tokenId: listing.tokenId,
          nftAddress: listing.nftAddress,
          price: listing.price,
          owner: listing.owner,
        };

        if (listing.nftAddress.toLowerCase() === landAddress.toLowerCase()) {
          processedData.data.Land.push(listingObj);
        } else if (
          listing.nftAddress.toLowerCase() === wearableAddress.toLowerCase()
        ) {
          processedData.data.Wearable.push(listingObj);
        }
      });
      serializeBigNumbers(processedData);
      res.json(processedData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });
};

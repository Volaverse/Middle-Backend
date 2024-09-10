const axios = require("axios");
const { Web3 } = require("web3");
const fs = require("fs");
const web3 = new Web3("https://rpc.sepolia-api.lisk.com");
const abi = "./contractABI.json";
const landAbi = "./landContractABI.json";
const rawAbi = fs.readFileSync(abi, { encoding: "utf8" });
const rawLandAbi = fs.readFileSync(landAbi, { encoding: "utf8" });
const contractABI = JSON.parse(rawAbi);
const contractLandABI = JSON.parse(rawLandAbi);

const LAND_ADDRESS = process.env.LAND_CONTRACT.toLowerCase();
const contractAddress = process.env.MARKETPLACE_CONTRACT;
const contract = new web3.eth.Contract(contractABI, contractAddress);
const landContract = new web3.eth.Contract(contractLandABI, LAND_ADDRESS);

module.exports = function (app) {
  app.get("/checkTokenOwnership", async (req, res) => {
    try {
      var { address, tokenId } = req.query;

      if (!address || !tokenId) {
        return res.status(400).send("Address and tokenId are required");
      }
      tokenId = tokenId - 1;
      const test = await landContract.methods;
      console.log("land contract is", test);

      const lowerCaseAddress = address.toLowerCase();

      // Fetch user Land NFTs
      const landNftsResponse = await axios.get(
        `https://blockscout.lisk.com/api/v2/tokens/${LAND_ADDRESS}/instances?holder_address_hash=${lowerCaseAddress}`
      );
      const landNfts = landNftsResponse.data.items || [];

      // Check if the token is owned by the user
      const ownedNft = landNfts.find((nft) => nft.id === tokenId);

      // Fetch marketplace listings
      const marketplaceData = await contract.methods.getAllListings().call();

      const listedNfts = marketplaceData.map((listing) => ({
        tokenId: listing.tokenId.toString(),
        owner: listing.owner.toLowerCase(),
        nftAddress: listing.nftAddress.toLowerCase(),
      }));

      // Check if the token is listed in the marketplace
      const marketplaceListing = listedNfts.find(
        (listing) =>
          listing.tokenId === tokenId && listing.nftAddress === LAND_ADDRESS
      );

      let ownershipStatus;
      let tokenName = `Land NFT ${parseInt(tokenId) + 1}`;
      let ownerAddress = "";
      let status = "";
      let link = "https://store.volaverse.com";

      if (ownedNft) {
        ownershipStatus = "owned by user";
        ownerAddress = lowerCaseAddress;
        status = "Owned";
        link = link + `/nfts?nftId=${tokenId}&nftAddress=${LAND_ADDRESS}`;
      } else if (marketplaceListing) {
        ownerAddress = marketplaceListing.owner;
        ownershipStatus =
          marketplaceListing.owner === lowerCaseAddress
            ? "owned by user and listed in marketplace"
            : "listed in marketplace";
        status = "sale";
        link =
          link +
          `/#/profile/${address}/nfts?nftId=${tokenId}&nftAddress=${LAND_ADDRESS}`;
      } else {
        ownershipStatus = "owned by someone else";
        ownerAddress = "unknown";
        status = "Not on sale";
      }

      res.json({
        status: "success",
        data: {
          name: tokenName,
          owner: ownerAddress,
          status: status,
          link: "https://store.volaverse.com",
        },
      });
    } catch (error) {
      console.error("Error checking token ownership:", error);
      res.status(500).send("Error checking token ownership");
    }
  });
};

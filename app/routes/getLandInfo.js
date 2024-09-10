const axios = require("axios");
const { Web3 } = require("web3");
const fs = require("fs");
const web3 = new Web3("https://rpc.api.lisk.com");
const abi = "./contractABI.json";
const landAbi = "./landContractABI.json";
const rawAbi = fs.readFileSync(abi, { encoding: "utf8" });
const rawLandAbi = fs.readFileSync(landAbi, { encoding: "utf8" });
const contractABI = JSON.parse(rawAbi);
const contractLandABI = JSON.parse(rawLandAbi);

const landAddress = process.env.LAND_CONTRACT;

const contractAddress = process.env.MARKETPLACE_CONTRACT;
const contract = new web3.eth.Contract(contractABI, contractAddress);
const landContract = new web3.eth.Contract(contractLandABI, landAddress);

module.exports = function (app) {
  app.get("/getLandInfo", async (req, res) => {
    try {
      const { address, tokenId } = req.query;

      if (!address || !tokenId) {
        return res.status(400).send("Address and tokenId are required");
      }

      const lowerCaseAddress = address.toLowerCase();

      // Fetch user Land NFTs
      const landNftsResponse = await axios.get(
        `https://blockscout.lisk.com/api/v2/tokens/${landAddress}/instances?holder_address_hash=${lowerCaseAddress}`
      );
      //  const landNftsResponse = await axios.get(`https://sepolia-blockscout.lisk.com/api/v2/tokens/0x25326b02B672f1f610928Bc09Ead6fe81EC9e6Df/instances?holder_address_hash=${lowerCaseAddress}`);
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
          listing.tokenId === tokenId && listing.nftAddress === landAddress
      );

      let ownershipStatus;
      let tokenName = `Land NFT ${parseInt(tokenId)}`;
      let ownerAddress = "";
      let status = "";
      let link = "https://store.volaverse.com";

      if (ownedNft) {
        ownershipStatus = "owned by user";
        ownerAddress = lowerCaseAddress;
        status = "Owned";
        link =
          link +
          `/#/profile/${address}/nfts?nftId=${tokenId}&nftAddress=${landAddress}`;
      } else if (marketplaceListing) {
        ownerAddress = marketplaceListing.owner;
        ownershipStatus =
          marketplaceListing.owner === lowerCaseAddress
            ? "owned by user and listed in marketplace"
            : "listed in marketplace";
        status = "sale";
        link = link + `/nfts?nftId=${tokenId}&nftAddress=${landAddress}`;
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
          link: link,
        },
      });
    } catch (error) {
      console.error("Error checking token ownership:", error);
      res.status(500).send("Error checking token ownership");
    }
  });
};

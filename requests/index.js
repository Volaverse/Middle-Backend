/* global Buffer */
/* global BigInt */
//These are the requests which are sent to blockchain
const { transactions } = require("@liskhq/lisk-client");
const { apiClientReq, clientTxnReq } = require("./apiClient");

//To get blockchain information
const fetchNodeInfo = async () => {
  try {
    const nodeInfo = await apiClientReq("app:getNodeInfo");
    return nodeInfo;
  } catch (err) {
    throw new Error(err.message);
  }
};
// to get account information
const fetchAccountInfo = async (address) => {
  try {
    const accountInfo = await apiClientReq("getAccount", { address: address });
    return accountInfo;
  } catch (err) {
    throw new Error(err.message);
  }
};
// to add faucet
const faucet = async (address, tokken) => {
  try {
    const faucet = await apiClientReq("faucet:fundTokens", {
      address: address,
      tokken,
    });
    return faucet;
  } catch (err) {
    throw new Error(err);
  }
};
// to list all nft tokens
const fetchAllNFTTokens = async () => {
  try {
    const nftTokens = await apiClientReq("nft:getAllNFTTokens");
    return nftTokens;
  } catch (err) {
    throw new Error(err.message);
  }
};
// to purchase nft
const purchaseNft = async ({ name, nftId, purchaseValue, fee, passphrase }) => {
  const tx = {
    moduleID: 1024,
    assetID: 1,
    fee: BigInt(transactions.convertLSKToBeddows(fee)),
    asset: {
      name: name,
      nftId: Buffer.from(nftId, "hex"),
      purchaseValue: BigInt(transactions.convertLSKToBeddows(purchaseValue)),
    },
  };

  let res = "";
  try {
    res = await clientTxnReq(tx, passphrase);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};
// to sell nft
const sellNft = async ({ name, nftId, minPurchaseMargin, fee, passphrase }) => {
  const tx = {
    moduleID: 1024,
    assetID: 2,
    fee: BigInt(transactions.convertLSKToBeddows(fee)),
    asset: {
      name: name,
      nftId: Buffer.from(nftId, "hex"),
      minPurchaseMargin: parseInt(minPurchaseMargin),
    },
  };

  let res = "";
  try {
    res = await clientTxnReq(tx, passphrase);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};
// to create nft
const createNft = async ({
  name,
  description,
  initValue,
  minPurchaseMargin,
  passphrase,
  category,
  imageUrl,
  fee,
}) => {
  const tx = {
    moduleID: 1024,
    assetID: 0,
    fee: BigInt(transactions.convertLSKToBeddows(fee)),
    asset: {
      name: name,
      description: description,
      initValue: BigInt(transactions.convertLSKToBeddows(initValue)),
      minPurchaseMargin: parseInt(minPurchaseMargin),
      category: parseInt(category),
      imageUrl: imageUrl,
    },
  };

  let res = "";
  try {
    res = await clientTxnReq(tx, passphrase);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  fetchNodeInfo,
  fetchAccountInfo,
  fetchAllNFTTokens,
  purchaseNft,
  sellNft,
  createNft,
  faucet,
};

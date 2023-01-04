/* global BigInt */

const { transactions, codec, cryptography } =require ("@liskhq/lisk-client");
const commonAsset =require("../common");
const { fetchAccountInfo } =require("../../requests");

const createNFTTokenSchema = {
  $id: "lisk/nft/create",
  type: "object",
  required: ["minPurchaseMargin", "initValue", "name","category","imageUrl"],
  properties: {
    minPurchaseMargin: {
      dataType: "uint32",
      fieldNumber: 1,
    },
    initValue: {
      dataType: "uint64",
      fieldNumber: 2,
    },
    name: {
      dataType: "string",
      fieldNumber: 3,
    },
    category: {
      dataType: "uint32",
      fieldNumber: 4,
    },
    imageUrl: {
      dataType: "string",
      fieldNumber: 5,
    },
  },
};

const createNFTToken = async (
  name,
  initValue,
  minPurchaseMargin,
  passphrase,
  category,
  imageUrl,
  fee,
  networkIdentifier,
  minFeePerByte,
) => {
  console.log('inside in create nft tokken '+passphrase)
  const { publicKey } = cryptography.getPrivateAndPublicKeyFromPassphrase(
    passphrase
  );

  const address = cryptography.getAddressFromPassphrase(passphrase);
  console.log("Value for nft creation CATEGORY"+ parseInt(category)+ " : "+ imageUrl);

  const {
    sequence: { nonce },
  } = await fetchAccountInfo(address.toString("hex"));

  const { id, ...rest } = transactions.signTransaction(
    createNFTTokenSchema,
    {
      moduleID: 1024,
      assetID: 0,
      nonce: BigInt(nonce),
      fee: BigInt(transactions.convertLSKToBeddows(fee)),
      senderPublicKey: publicKey,
      asset: {
        name,
        initValue: BigInt(transactions.convertLSKToBeddows(initValue)),
        minPurchaseMargin: parseInt(minPurchaseMargin),
        category: parseInt(category),
        imageUrl,
      },
    },
    Buffer.from(networkIdentifier, "hex"),
    passphrase
  );

  return {
    id: id.toString("hex"),
    tx: codec.codec.toJSON(commonAsset.getFullAssetSchema(createNFTTokenSchema), rest),
    minFee: commonAsset.calcMinTxFee(createNFTTokenSchema, minFeePerByte, rest),
  };
};

module.exports.createNFTTokeen= createNFTToken;

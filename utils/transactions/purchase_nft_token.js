/* global BigInt */

const { transactions, codec, cryptography } =require ("@liskhq/lisk-client");
const commonAsset =require("../common");
const { fetchAccountInfo } =require("../../api");

const purchaseNFTTokenSchema = {
  $id: "lisk/nft/purchase",
  type: "object",
  required: ["nftId", "purchaseValue"],
  properties: {
    nftId: {
      dataType: "bytes",
      fieldNumber: 1,
    },
    purchaseValue: {
      dataType: "uint64",
      fieldNumber: 2,
    },
    name: {
      dataType: "string",
      fieldNumber: 3,
    },
  },
};


const purchaseNFTToken = async (name,nftId,purchaseValue,passphrase,fee,networkIdentifier,minFeePerByte) =>{

  const { publicKey } = cryptography.getPrivateAndPublicKeyFromPassphrase(
    passphrase
  );

  const address = cryptography.getAddressFromPassphrase(passphrase);
  const {
    sequence: { nonce },
  } = await fetchAccountInfo(address.toString("hex"));
  const { id, ...rest } = transactions.signTransaction(
    purchaseNFTTokenSchema,
    {
      moduleID: 1024,
      assetID: 1,
      nonce: BigInt(nonce),
      fee: BigInt(transactions.convertLSKToBeddows(fee)),
      senderPublicKey: publicKey,
      asset: {
        name,
        nftId: Buffer.from(nftId, "hex"),
        purchaseValue: BigInt(transactions.convertLSKToBeddows(purchaseValue)),
      },
    },
    Buffer.from(networkIdentifier, "hex"),
    passphrase
  );

  return {
    id: id.toString("hex"),
    tx: codec.codec.toJSON(commonAsset.getFullAssetSchema(purchaseNFTTokenSchema), rest),
    minFee: commonAsset.calcMinTxFee(purchaseNFTTokenSchema, minFeePerByte, rest),
  };
}



module.exports.purchaseNFTToken= purchaseNFTToken;

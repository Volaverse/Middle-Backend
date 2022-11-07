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


// module.exports(purchaseNFTToken)
// module.exports ={purchaseNFTToken,purchaseNFTTokenSchema};

function testConsole(){
  console.log("This is a function for export");
}

// module.exports= function( name,nftId,purchaseValue,passphrase,fee,networkIdentifier,
//   minFeePerByte){purchaseNFTToken(name,nftId,purchaseValue,passphrase,fee,networkIdentifier,
//     minFeePerByte)};

module.exports = {purchaseNFTToken:async (name,nftId,purchaseValue,passphrase,fee,networkIdentifier,minFeePerByte) =>{
  console.log('inside purchaseNFTToken');
  console.log('name is '+ name);
  console.log('passphrase is ',passphrase);
  const { publicKey } = cryptography.getPrivateAndPublicKeyFromPassphrase(
    passphrase
  );
  console.log("public key is",JSON.stringify(publicKey));

  const address = cryptography.getAddressFromPassphrase(passphrase);
  console.log("address is",address.toString("hex"));
  const {
    sequence: { nonce },
  } = await fetchAccountInfo(address.toString("hex"));
  // const nonce=0;
  console.log("nonce",JSON.stringify(publicKey));
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
  console.log("return id",id.toString("hex"));
  console.log("schema json"+JSON.stringify(purchaseNFTTokenSchema))
  console.log("transaction is "+ commonAsset.getFullAssetSchema(purchaseNFTTokenSchema));
  // console.log("transaction json",JSON.stringify(codec.codec.toJSON(commonAsset.getFullAssetSchema(purchaseNFTTokenSchema), rest)));
  console.log("minimum fee",commonAsset.calcMinTxFee(purchaseNFTTokenSchema, minFeePerByte, rest));

  return {
    id: id.toString("hex"),
    tx: codec.codec.toJSON(commonAsset.getFullAssetSchema(purchaseNFTTokenSchema), rest),
    minFee: commonAsset.calcMinTxFee(purchaseNFTTokenSchema, minFeePerByte, rest),
  };
}}

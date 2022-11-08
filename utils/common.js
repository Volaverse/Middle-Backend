/* global BigInt */

const { objects } =require('@liskhq/lisk-utils');
const { codec } =require('@liskhq/lisk-codec');

const baseAssetSchema = {
	$id: 'lisk/base-transaction',
	type: 'object',
	required: ['moduleID', 'assetID', 'nonce', 'fee', 'senderPublicKey', 'asset'],
	properties: {
		moduleID: {
			dataType: 'uint32',
			fieldNumber: 1,
		},
		assetID: {
			dataType: 'uint32',
			fieldNumber: 2,
		},
		nonce: {
			dataType: 'uint64',
			fieldNumber: 3,
		},
		fee: {
			dataType: 'uint64',
			fieldNumber: 4,
		},
		senderPublicKey: {
			dataType: 'bytes',
			fieldNumber: 5,
		},
		asset: {
			dataType: 'bytes',
			fieldNumber: 6,
		},
		signatures: {
			type: 'array',
			items: {
				dataType: 'bytes',
			},
			fieldNumber: 7,
		},
	},
};

 const getFullAssetSchema = (assetSchema) => {return objects.mergeDeep({}, baseAssetSchema, { properties: { asset: assetSchema }, })};

 const calcMinTxFee = (assetSchema, minFeePerByte, tx) => {
	const assetBytes = codec.encode(assetSchema, tx.asset);
	const bytes = codec.encode(baseAssetSchema, { ...tx, asset: assetBytes });
	return BigInt(bytes.length * minFeePerByte);
};
// module.exports =()=>{({baseAssetSchema,getFullAssetSchema,calcMinTxFee})}

module.exports = {baseAssetSchema,getFullAssetSchema,calcMinTxFee}

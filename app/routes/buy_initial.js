const api = require("../../api");
const { transactions, codec, cryptography } =require ("@liskhq/lisk-client");
// const { getFullAssetSchema, calcMinTxFee } =require("../common");
const purchaseNFTToken  = require("../../utils/transactions/purchase_nft_token");
var nodeInfo;
module.exports = function(app) {
    console.log("in buy file")
    
    app.post('/buy',(req,res) =>{
        const name=req.name;
        const id =req.id;
        const purchaseValue = req.purchaseValue;
        const passphrase = req.passphrase;
        const fee = req.fee;
        api.fetchNodeInfo().then((result) => {console.log("result is "+JSON.stringify(result)); nodeInfo=result;console.log("nodeInfo is "+nodeInfo.networkIdentifier +"min fee"+nodeInfo.minFeePerByte)}).then(()=>{
            purchaseNFTToken({name,
            id,
            purchaseValue,
            passphrase,
            fee,
            networkIdentifier: nodeInfo.networkIdentifier,  
            minFeePerByte: nodeInfo.minFeePerByte,
          }).then((resp) =>{console.log("result from buy "+resp);res.json({success:true,data:resp})}).catch((error)=> {console.log("got some error "+error);res.json({err:error})})}).catch((error)=> {console.log("got some error "+error);res.json({err:error})});
;
          
    })
}
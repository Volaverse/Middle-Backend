const api = require("../../api");
const { transactions, codec, cryptography } =require ("@liskhq/lisk-client");
// const { getFullAssetSchema, calcMinTxFee } =require("../common");
const purchaseNFTToken  = require("../../utils/transactions/purchase_nft_token");
const test = require("./console");

// var nodeInfo;
module.exports = function(app) {
    console.log("in buy file")
    
    app.post('/buy',   (req,res) =>{
        const name=req.body.name;
        const id =req.body.id;
        const purchaseValue = req.body.purchaseValue;
        const passphrase = req.body.passphrase;
        const fee = req.body.fee;
        const networkId= 'ef30ac12d1ae8b49c3b0dde3c1424f26db294c64da34386c187957b01f03a3f';
        const minFee= 1000;
        // api.fetchNodeInfo().then((result) => {console.log("result is "+JSON.stringify(result)); nodeInfo=result;console.log("nodeInfo is "+nodeInfo.networkIdentifier +"min fee"+nodeInfo.genesisConfig.minFeePerByte)}).then(()=>{
        //     purchaseNFTToken({name,
        //     id,
        //     purchaseValue,
        //     passphrase,
        //     fee,
        //     networkIdentifier: networkId,  
        //     minFeePerByte: minFee,
        //   }).then((resp) =>{console.log("result from buy "+resp);res.json({success:true,data:resp})}).catch((error)=> {console.log("got some error "+error);res.json({err:error})})}).catch((error)=> {console.log("got some error "+error);res.json({err:error})});




        // const resp=purchaseNFTToken(name,
        //     id,
        //     purchaseValue,
        //     passphrase,
        //     fee,
        //     networkId,  
        //     minFee
        //   )


        const resp=purchaseNFTToken(name,
            id,
            purchaseValue,
            passphrase,
            fee,
            networkId,  
            minFee
          )
        test.console_test(name);
        console.log("resp for buy "+JSON.stringify(resp));
        res.send("success");
        // res.json({success:"yes",data:resp})
          
    })
}
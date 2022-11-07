const api = require("../../api");
const { transactions, codec, cryptography } =require ("@liskhq/lisk-client");
// const { getFullAssetSchema, calcMinTxFee } =require("../common");
const sell_token  = require("../../utils/transactions/sell_nft");
const test = require("./console");

// var nodeInfo;
module.exports = function(app) {
    console.log("in sell file")
    
    app.post('/sell',    async (req,res) =>{
        //var nodeInfo;
        const nodeInfo = await api.fetchNodeInfo();
        const name=req.body.name;
        const id =req.body.id;
        const minPurchaseMargin = req.body.minPurchaseMargin;
        const passphrase = req.body.passphrase;
        const fee = req.body.fee;
        var networkId,minFee;
        if(nodeInfo){
            networkId= nodeInfo.networkIdentifier;
            minFee = nodeInfo.genesisConfig.minFeePerByte;
        }
        else{
            res.status(400).json({Message:"Cannot get network info from the blockchain.Kindly try again"});
        }
        console.log("networkId is ",networkId," min fee is ",minFee);
        const txn = await sell_token.sellNFT(name,id,minPurchaseMargin,passphrase,fee,networkId,minFee)
        if(!txn){
            return res.status(400).json({Message:"Cannot sign the txn.Kindly Try after sometime"})
        }
        const resp = await api.sendTransactions(txn.tx);
        if(!resp){
            return res.status(400).json({Message:"Cannot send the txn.Kindly Try after sometime"})
        }
        console.log("response from api is ",resp)
        console.log("resp from buy",JSON.stringify(resp.data));
        console.log("http code from response",resp.status)
        console.log("transactionId response",resp.data.data.transactionId)
        
        if(resp.data.data.transactionId !=undefined && resp.data.data.transactionId !='' ){
            res.json({status:"success",Message:"Your Nft has been Sold"});
        }
        else{
            res.status(400).json({Message:"Kindly Try after sometime"});
        }

        // res.json({success:"yes",data:resp})
          
    })
}
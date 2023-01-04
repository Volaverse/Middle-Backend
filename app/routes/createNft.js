const api = require("../../requests");
const { transactions, codec, cryptography } =require ("@liskhq/lisk-client");
const create_tokken  = require("../../utils/transactions/create_nft_token");

// var nodeInfo;
module.exports = function(app) {
    console.log("in create nft file")
    
    app.post('/createNft',    async (req,res) =>{

        //var nodeInfo;
        const nodeInfo = await api.fetchNodeInfo();
        const name=req.body.name;
        const minPurchaseMargin = req.body.minPurchaseMargin;
        const initValue = req.body.initValue;
        const imageUrl = "";
        const category = req.body.category;
        const passphrase = req.body.passphrase;
        const fee = req.body.fee;
        var networkId,minFee;
        const nft_tokens= await api.fetchAllNFTTokens();
        const dup = nft_tokens.filter((nft)=>nft.name==name)

        if(dup.length>0){
            res.status(400).json({Message:"Username already taken"});
        }
        if (fee <= 0) {
            res.status(400).json({Message:"Fee value is too low."});
          } 
        if (initValue <= 0) {
            res.status(400).json({Message:"NFT init value is too low."});
          } 
          else if (minPurchaseMargin < 0 || minPurchaseMargin > 100) {
            res.status(400).json({Message:"The NFT minimum purchase value needs to be between 0 and 100."});
          }
        console.log("req body is "+JSON.stringify(req.body))
        if(nodeInfo){
            networkId= nodeInfo.networkIdentifier;
            minFee = nodeInfo.genesisConfig.minFeePerByte;
        }
        else{
            res.status(400).json({Message:"Cannot get network info from the blockchain.Kindly try again"});
        }
        if(!(category==3 || category=='3')){
            res.status(400).json({Message:"Cannot create nft for the given category"});
        }
        console.log("networkId is ",networkId," min fee is ",minFee);
        const txn = await create_tokken.createNFTTokeen(name,initValue,minPurchaseMargin,passphrase,category,imageUrl,fee,networkId,minFee)
        if(!txn){
            return res.status(400).json({Message:"Cannot grt the txn.Kindly Try after sometime"})
        }
        const resp = await api.sendTransactions(txn.tx);
        if(!resp){
            return res.status(400).json({Message:"Cannot send the txn.Kindly Try after sometime"})
        }
        console.log("response from api is ",resp)
        console.log("resp from create",JSON.stringify(resp.data));
        console.log("http code from response",resp.status)
        console.log("transactionId response",resp.data.data.transactionId)
        
        if(resp.data.data.transactionId !=undefined && resp.data.data.transactionId !='' ){
            res.json({status:"success",Message:"Your Nft has been created"});
        }
        else{
            res.status(400).json({Message:"Kindly Try after sometime"});
        }

        // res.json({success:"yes",data:resp})
          
    })
}
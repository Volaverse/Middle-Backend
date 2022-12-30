const api = require("../../requests");
const { transactions, codec, cryptography } =require ("@liskhq/lisk-client");
// const { getFullAssetSchema, calcMinTxFee } =require("../common");
const transfer  = require("../../utils/transactions/transfer");

// var nodeInfo;
module.exports = function(app) {
    
    app.post('/addFaucet',    async (req,res) =>{
        //var nodeInfo;
        const nodeInfo = await api.fetchNodeInfo();
        console.log("parameters are "+JSON.stringify(req.body));
        console.log('address is '+ req.body.recipientAddress)
        const recipientAddress=req.body.recipientAddress;
        const amount =req.body.amount;
        const fee = req.body.fee;
        const passphrase='peanut hundred pen hawk invite exclude brain chunk gadget wait wrong ready';
        var networkId,minFee;
        if(nodeInfo){
            networkId= nodeInfo.networkIdentifier;
            minFee = nodeInfo.genesisConfig.minFeePerByte;
        }
        else{
            res.status(400).json({Message:"Cannot get network info from the blockchain.Kindly try again"});
        }
        console.log("networkId is ",networkId," min fee is ",minFee);
        const txn = await transfer.transfer(recipientAddress,amount,passphrase,fee,networkId,minFee)
        if(!txn){
            return res.status(400).json({Message:"Cannot sign the txn.Kindly Try after sometime"})
        }
        const resp = await api.sendTransactions(txn.tx);
        if(!resp){
            return res.status(400).json({Message:"Cannot send the txn.Kindly Try after sometime"})
        }
        console.log("response from api is ",resp)
        console.log("resp from transfer",JSON.stringify(resp.data));
        console.log("http code from response",resp.status)
        console.log("transactionId response",resp.data.data.transactionId)
        
        if(resp.data.data.transactionId !=undefined && resp.data.data.transactionId !='' ){
            res.json({status:"success",Message:"Faucet has been transfered"});
        }
        else{
            res.status(400).json({Message:"Kindly Try after sometime"});
        }

        // res.json({success:"yes",data:resp})
          
    })
}
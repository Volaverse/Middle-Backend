
const {passphrase,cryptography} = require("@liskhq/lisk-client");
const transfer  = require("../../utils/transactions/transfer");
const api = require("../../requests");




// var nodeInfo;
module.exports = function(app) {
    console.log("in create file")
    
    app.get('/create',    async (req,res) =>{

        //var nodeInfo;
        const pass = passphrase.Mnemonic.generateMnemonic();
        const address = cryptography.getBase32AddressFromPassphrase(pass).toString("hex");
        const nodeInfo = await api.fetchNodeInfo();
        console.log('address is '+ address)
        const recipientAddress=address;
        const amount ="5";
        const fee = "2";
        const passphrase_faucet='peanut hundred pen hawk invite exclude brain chunk gadget wait wrong ready';
        var networkId,minFee;
        if(nodeInfo){
            networkId= nodeInfo.networkIdentifier;
            minFee = nodeInfo.genesisConfig.minFeePerByte;
        }
        else{
            res.status(400).json({Message:"Cannot get network info from the blockchain.Kindly try again"});
        }
        console.log("networkId is ",networkId," min fee is ",minFee);
        const txn = await transfer.transfer(recipientAddress,amount,passphrase_faucet,fee,networkId,minFee)
        if(!txn){
            return res.status(400).json({Message:"Cannot sign the txn.Kindly Try after sometime"})
        }
        const resp = await api.sendTransactions(txn.tx);
        if(!resp){
            return res.status(400).json({Message:"Cannot send the txn.Kindly Try after sometime"})
        }
        
        if(resp.data.data.transactionId !=undefined && resp.data.data.transactionId !='' ){
            res.json({status:"success",Message:"Account is created with 5 lisk faucet",password:pass,display_add:address});
        }
        else{
            res.status(400).json({Message:"Kindly Try after sometime"});
        }
          
    })
}
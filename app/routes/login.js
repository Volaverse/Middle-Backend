
const {cryptography} = require("@liskhq/lisk-client");




// var nodeInfo;
module.exports = function(app) {
    console.log("in buy file")
    
    app.post('/login',    async (req,res) =>{

        //var nodeInfo;
        const passphrase = req.body.passphrase;
        const { publicKey } = cryptography.getPrivateAndPublicKeyFromPassphrase(
            passphrase
          );
          const address = cryptography.getAddressFromPassphrase(passphrase).toString("hex");
          const base32UIAddress = cryptography.getBase32AddressFromAddress(Buffer.from(address, 'hex'), 'lsk').toString('binary');
          res.json({status:"success",publicKey:publicKey,display_add:base32UIAddress})

        // res.json({success:"yes",data:resp})
          
    })
}
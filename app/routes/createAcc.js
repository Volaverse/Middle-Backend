
const {passphrase,cryptography} = require("@liskhq/lisk-client");




// var nodeInfo;
module.exports = function(app) {
    console.log("in create file")
    
    app.get('/create',    async (req,res) =>{

        //var nodeInfo;
        const pass = passphrase.Mnemonic.generateMnemonic();
        const address = cryptography.getBase32AddressFromPassphrase(pass).toString("hex");
          res.json({password:pass,display_add:address})

        // res.json({success:"yes",data:resp})
          
    })
}
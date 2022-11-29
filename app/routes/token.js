const api = require("../../requests");

module.exports = function(app) {
    app.get('/tokenInfo',(req,res) =>{
        api.fetchAllNFTTokens().then((result) => {console.log("result is "+JSON.stringify(result)); res.json({success:true,data:result})});

    
    })
}
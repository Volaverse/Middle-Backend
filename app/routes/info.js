const api = require("../../requests");
module.exports = function(app) {
    console.log("in info file")
    app.post('/info',(req,res) =>{
        console.log("request parameters"+JSON.stringify(req.body));
        api.fetchNodeInfo().then((result) => {console.log("result is "+JSON.stringify(result)); res.json({success:true,data:result})});

    
    })
}
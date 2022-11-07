const api = require("../../api");
const test = require("./console");
module.exports = function(app) {
    console.log("in info file")
    app.post('/info',(req,res) =>{
        console.log("request parameters"+JSON.stringify(req.body));
        test.console_test(req.body.name)
        console.log(test.name);
        api.fetchNodeInfo().then((result) => {console.log("result is "+JSON.stringify(result)); res.json({success:true,data:result})});

    
    })
}
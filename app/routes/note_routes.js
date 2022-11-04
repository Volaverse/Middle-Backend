module.exports = function(app) {
    app.post('/notes',(req,res) =>{ console.log(req.body); res.json({status:"success",message:"Hello World"});console.log(req.body.tokenId)})
    app.all('*',(req,res) => {res.status(400).send('Resource not found')})
};
const userData=require("../../models/user");


module.exports = function(app) {
    console.log("Get username from address")

    app.post('/getUsername',    async (req,res) =>{
        console.log("heyy");
        const liskAddress = req.body.liskAddress;
        
        // Check if any field is null
        if(!liskAddress){
            return res.status(400).json({msg:"Please enter all required fields"});
        }

        try {
          const exsistingUser = await userData.findOne({liskAddress})
          console.log(exsistingUser);
  
          if(exsistingUser) {return res.status(200).json({message: exsistingUser.userName})}
          else{return res.status(200).json({message: "No user found"})}
            
      } catch (error) {
          res.status(500).json({message: "Something went wrong"});
      } 
    })
}


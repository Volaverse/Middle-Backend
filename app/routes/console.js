 function  console_test(mess){
    console.log("console testing through import "+mess);
}
 const name="chintan";

// module.exports= function(){console_test};

//module.exports= (mess)=>{console_test(mess),name};

module.exports ={console_test,name}
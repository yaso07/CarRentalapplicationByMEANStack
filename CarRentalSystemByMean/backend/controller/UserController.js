const mongoose = require("mongoose");
const user= mongoose.model("user",require("./../model/user"));
const bidding=mongoose.model("bidding",require('./../model/bidding'))
exports.addUser=async(req,res)=>{
    try{
     await user.create(req.body)
      res.send("success")
    }
    catch(error)
    {
        res.send(error.message)
    }


}

exports.getUser=async(req,res)=>{
      
      const data= await user.find();
       res.send(data)
}

exports.updateUserDetails=async(req,res)=>{
       await user.findByIdAndUpdate(req.params.id,req.body);
       res.send()
}
exports.getUserById=async(req,res)=>{
    const data= await user.findById(req.params.id);
     res.send(data)
}


 
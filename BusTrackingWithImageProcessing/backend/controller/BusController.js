
const mongoose=require('mongoose')
const bus = mongoose.model("bus", require('./../model/Bus'));


exports.addBusDetails=async(req,res)=>{

     console.log(req.body)
     console.log(bus)
     await bus.create(req.body);
     res.json("success")
     
}

exports.getBusDetails=async(req,res)=>{
    
      const a =await bus.find({});
      res.send(a); 
}
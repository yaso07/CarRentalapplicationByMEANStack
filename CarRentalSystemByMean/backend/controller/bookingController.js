const mongoose=require('mongoose')
const booking=mongoose.model('booking',require('../model/booking'))

exports.addBooking=async(req,res)=>{
       await booking.create(req.body)
       res.send("(..)")
}
exports.getBookingByUserId=async(req,res)=>{
      const data=await booking.findById(req.body);
      res.send(data)

}
exports.getBooking=async(req,res)=>{
     
    let data=booking.find();
      if(req.query.sort) 
      {
        data=data.sort(req.query.sort);
      }
       const bookingObject=await data
      res.send(bookingObject)
}

exports.updateBookingDetails=async(req,res)=>{
      
             await booking.findByIdAndUpdate(req.params.id,req.body)
             res.send()
}

const mongoose=require('mongoose')
const bookingSchema=mongoose.Schema({

      userId:{
         type:String,
         required:true
      },
      carId:{
         type:String,
         required:true
      },
      brand:{
        type:String
      },
      model:{
        type:String
      },
      rentDate:{
          type:String
      },
      returnDate: {
          type:String
      },
      location: {
          type:String
      },
      totalDays:{
          type:Number
      },
      totalCost: { 
          type:Number
        },
     reservedDate: {
          type:String
      },
      currentStatus: {
          type:String
      },
      cancelledDate:{
          type:String
      },
      refund:
      {
            refundStatus:{
                type:String
            },
            refundAmount:{ 
                type:String
            }
      }
     

})


module.exports=bookingSchema


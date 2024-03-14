const mongoose=require('mongoose')
const biddingSchema = mongoose.Schema({
  amount: {
    type: Number,
  },
  accepted: {
    type: String,
  },
  carModel: {
    type:String
  },
  carBrand: {
    type:String
  },
  actualAmount: {
    type: String,
  }
});

module.exports=biddingSchema
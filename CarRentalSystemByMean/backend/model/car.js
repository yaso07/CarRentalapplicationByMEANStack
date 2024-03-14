const mongoose = require("mongoose");
const carSchema = mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
  },
  fuel: {
    type: String,
  },
  transmission: {
    type: String,
  },
  carType: {
    type: String,
  },
  carCount: {
    type: Number,
  },
  rent: {
    type: Number,
  },
  image: {
    type: String,
  }, 
},{
    toJSON:{virtuals:false}
});

carSchema.virtual("offers").get(()=>{
     return "10%"; 
})
carSchema.pre('find',function(next){
     this.find({carCount:{$gte:5}})
     next();
})
carSchema.post('find',function(content,next){
     console.log(content)
     next();
})
const car=mongoose.model("car",carSchema)
 
module.exports = carSchema; 

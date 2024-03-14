const { default: mongoose } = require("mongoose")

const busSchema=mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    BusNo:{
        type:String,
        required:true
    },
    location:{
        type:String
    },
    routes:{
        type:[String]
    },
    timings:{
        type:[String]
    },
    availablilty:{
        type:String
    }


    

    

})


module.exports=busSchema;
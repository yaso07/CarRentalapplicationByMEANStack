const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: {
        type: String,
      
    },
    password: {
        type: String,
        
    },
    firstname: {
        type: String,
       
    },
    lastname: {
        type: String,
        
    },
    email: {
        type: String,
      
    },
    address: {
        address1: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        pincode:{
            type:String
        }
    },

    mobile: {
        type: Number,
    },
    subscription: {
        type: {
            type: String,
        },
        subscriptionDate: {
            type: String,
        },
        subscriptionEndDate: {
            type: String,
        },
    },
    idProofs: {
        aadhar: {
            type: String,
        },
        licence: {
            type: String,
        },
    },
    accountDetails: {
        accountNo: {
            type: String,
        },
        ifsc: {
            type: String,
        },
    },
});

module.exports=userSchema
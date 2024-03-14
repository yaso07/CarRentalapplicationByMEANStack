
const express=require('express');
let app=express();
let cors=require('cors')
 
const dotEnv = require("dotenv");
dotEnv.config({path:'./config.env'})
app.use(express.json());

const mongoose=require('mongoose');
mongoose.connect(process.env.connection,{
     
}).then((con)=>{
    console.log("db connected");
})
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:4200");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   )
//   console.log(res.getHeaders())
//   console.log("added")
//   next();      
// });

var corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

     
const carRouter=require('./routes/CarRoutes');
const userRouter=require('./routes/UserRoutes')
const bookingRouter=require('./routes/BookingRoutes')
const biddingRouter=require('./routes/BiddingRoutes')
app.use('/api/rental/car',cors(corsOptions),carRouter);
app.use("/api/user", cors(corsOptions), userRouter);
app.use("/api/booking", cors(corsOptions), bookingRouter);
app.use("/api/bidding", cors(corsOptions),biddingRouter);  

app.listen(process.env.port,()=>{
     console.log(`listening on http://localhost:${process.env.port}`);
})

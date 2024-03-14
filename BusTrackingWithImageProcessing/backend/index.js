
const express=require('express')
const app=express();
const cors=require('cors')
const dotEnv=require('dotenv')
const mongoose=require('mongoose')
dotEnv.config({path:'./config.env'})
console.log(process.env.connection);
app.use(express.json());
 
mongoose.connect(process.env.connection, {}).then((con) => {
  console.log("connected");
});
const router=express.Router();
var corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const busController=require('./controller/BusController')
router.route('/addBus').patch(busController.addBusDetails);
router.route("/buses").get(busController.getBusDetails); 
app.use('/user',cors(corsOptions),router); 
app.listen(process.env.port,()=>{
  
  console.log("http://localhost:"+process.env.port)
})
const express=require('express')
const biddingRouter=express.Router()

const biddingController = require("../controller/BiddingController");

 

//bidding

biddingRouter
  .route("/")
  .post(biddingController.addBidding)
  .get(biddingController.getBidding);
biddingRouter
  .route("/:id")
  .get(biddingController.getBiddingById)
  .patch(biddingController.updateBiddingdetails);

module.exports = biddingRouter
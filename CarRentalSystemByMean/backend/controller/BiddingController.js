 const mongoose = require("mongoose");
 
 const bidding = mongoose.model("bidding", require("./../model/bidding"));
 
 exports.addBidding = async (req, res) => {
   await bidding.create(req.body);
   res.send();
 };
 exports.getBidding = async (req, res) => {
   let query = bidding.find();
   query = query.sort(req.query.sort);
   const data = await query;
   res.send(data);
 };

 exports.getBiddingById = async (req, res) => {
   const data = await bidding.findById(req.params.id);
   res.send(data);
 };
 exports.updateBiddingdetails = async (req, res) => {
   await bidding.findByIdAndUpdate(req.params.id, req.body, { new: true });
   res.send();
 };
 
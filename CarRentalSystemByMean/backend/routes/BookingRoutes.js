const express = require("express");
const bookingRouter=express.Router();
const bookingController=require('../controller/bookingController')


bookingRouter.route('/').get(bookingController.getBooking).post(bookingController.addBooking)
bookingRouter.route('/:id').patch(bookingController.updateBookingDetails)


module.exports=bookingRouter
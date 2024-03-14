const express = require("express");
const userRouter = express.Router();

const userController=require('../controller/UserController')
 
userRouter.route('/').post(userController.addUser).get(userController.getUser)
userRouter.route('/:id').patch(userController.updateUserDetails).get(userController.getUserById)

//bidding
 
 module.exports=userRouter

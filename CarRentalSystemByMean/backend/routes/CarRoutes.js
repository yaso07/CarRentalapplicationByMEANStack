const express=require('express');
const router=express.Router();
const carController=require('../controller/CarController');
router.route("/filter").get(carController.getCarByFilter);
router.route('/').post(carController.addCar).get(carController.getCar)
router.route('/:id').get(carController.getCarById).patch(carController.updateCar)

module.exports=router;
const mongoose = require("mongoose");
const car = mongoose.model("car", require("./../model/car"));

exports.addCar = async (req, res) => {
  try {
    await car.create(req.body);
    res.send({
      data: "success",
    });
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
};
exports.getCar = async (req, res) => {
  try {
    let data = car.find(req.query);
    data = data.sort(req.query.sort);
    const object = await data;
    res.json(object);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
};

exports.getCarById = async (req, res) => {
  try {
    console.log(req.params);
    const data = await car.findById(req.params.id);
    res.send(data);
  } catch (error) {
    res.send(error.message);
  }
};
exports.updateCar = async (req, res) => {
  try {
    await car.findByIdAndUpdate(req.params.id, req.body);
    res.send("success");
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
};

exports.getCarByFilter = async (req, res) => {
  const a = await car.aggregate([
    {
      $match: { 
        $or:[{carCount:{$gte:1,$lte:10}}], 
      }},
      {$group:{
          _id:'$brand',  
          carCount:{$avg:'$carCount'},
          avgprice:{$avg:'$rent'},
          minprice:{$min:'$rent'},
          count:{$sum:1}
      } 
    },
    {
        $project:{carCount:0,count:0}
    }
     
  ]);

  res.send(a);
};

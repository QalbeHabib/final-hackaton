const reviewModel = require('../Model/reviewModel');
require('cookie-parser');

exports.get = async(req, res, next) => {
  const data = req.body;
  try {
    const review = await reviewModel.find();
    res.send(review);  
  }
  catch (err) {
    next(err);
  }
};

exports.add = async(req, res, next) => {
  const data = req.body;

  try {
    const review = await reviewModel.create(data);
    res.send(review);  
  } catch (err) {
    next(err)
  }
};








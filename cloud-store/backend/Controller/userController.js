const model = require("../Model/userModel");
const jwt = require("jsonwebtoken");
require("cookie-parser");

exports.get = async (req, res, next) => {
  const data = req.body;
  try {
    const user = await model.findOne({
      email: data.email,
      password: data.password,
    });
    if (user) {
      const userObj = {
        id: data._id,
        email: data.email,
        name: data.name,
        role: data.role,
        profileImage: data.profileImage,
      };
      const token = jwt.sign(userObj, process.env.TOKEN_SECRET);
      // set token in cookie
      res.cookie("token", token, {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "none",
      });
      res.send(user);
      // res.cookie('token',token).send(user)
    } else {
      res.status(401).send("user not found");
    }
  } catch (err) {
    next(err);
  }
};

exports.add = async (req, res, next) => {
  const data = req.body;

  try {
    const email = await model.findOne({ email: data.email });
    if (email) {
      res
        .status(400)
        .send({ status: "Email", message: "Email already exists" });
    } else {
      const user = await model.create(data);
      res.send(user);
    }
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const id = req.params.id;
  try {
    const doc = await model.findByIdAndDelete(id);
    res.send(doc);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const doc = await model.findByIdAndUpdate(id, data, { new: true });
    res.send(doc);
  } catch (err) {
    console.log(err);
  }
};

exports.getById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await model.findById(id).exec();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

// cookie token
// exports.authenticateCookie = async (req, res, next) => {

exports.authenticate = async (req, res, next) => {
  try {
    const user = await model.findOne({ email: req.user.email });
    if (user) {
      res.send(user);
    } else {
      res.status(401).send("user not found");
    }
  } catch (err) {
    next(err);
  }
};

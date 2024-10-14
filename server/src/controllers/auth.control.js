require("dotenv").config();
const createError = require("http-errors");
const { user } = require("../models/users.model");
const passport = require("passport");

const regControl = async (req, res, next) => {
  try {
    const _user = await user.findOne({ email: req.body.email });
    if (_user) {
      next(createError(401, "User already exists"));
    } else {
      const newUser = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      await newUser
        .save()
        .then((user) => {
          return res.status(201).send({
            success: true,
            message: "User is successfully registered",
            user_id: user._id,
          });
        })
        .catch((error) => {
          next(createError(400, error.message));
        });
    }
  } catch (error) {
    next(error);
  }
};

const loginControl = async (req, res, next) => {
  try {
    res.status(200).send({
      success:true,
      message:"login successfull"
    })
  } catch (error) {
    next(error);
  }
};
const logoutControl = async (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) {
        return next(createError(500,err.message));
      }
      res.clearCookie('connect.sid', { path: '/', httpOnly: true, secure: true });
      res.status(200).json({ success: true, message: "Logged out successfully" });
    });
  } catch (error) {
    next(error);
  }
};

const protectedControl = async (req, res, next) => {
  try {
    if(req.isAuthenticated()){
      res.status(200).send({success:true});
    }
    else res.status(401).send({success:false});
  } catch (error) {
    res.status(401).send({success:false});
    next(error);
  }
};

module.exports = {
  regControl,
  loginControl,
  logoutControl,
  protectedControl,
};

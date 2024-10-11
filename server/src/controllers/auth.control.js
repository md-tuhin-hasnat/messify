require("dotenv").config();
const createError = require("http-errors");
const { user } = require("../models/users.model");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../secrets");

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
    const _user = await user.findOne({ email: req.body.email });
    if (!_user) {
      next(createError(401, "User not found"));
    } else if (!bcrypt.compareSync(req.body.password, _user.password)) {
      next(createError(402, "Password did not match"));
    } else {
      const token = jwt.sign({ user_id: _user._id }, jwtSecret, {
        expiresIn: "7d",
      });

      // res.cookie("jwt", token, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: "None",
      //   maxAge: 7 * 24 * 60 * 60 * 1000,
      // });
      res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: true,
        signed: true,
        // secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        success: true,
        message: "Login successful",
      });
    }
  } catch (error) {
    next(createError(400, "server Error"));
  }
};
const logoutControl = async (req, res, next) => {
  try {
    res.clearCookie("jwt", { path: "/" });
    res.status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    next(error);
  }
};
const protectedControl = async (req, res, next) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  regControl,
  loginControl,
  logoutControl,
  protectedControl,
};

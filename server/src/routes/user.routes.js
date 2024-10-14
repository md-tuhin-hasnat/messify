const express = require("express");
const { getUser } = require("../controllers/user.control");
const passport = require("passport");
const userRouter = express.Router();

userRouter.get("/", getUser);

module.exports = userRouter;

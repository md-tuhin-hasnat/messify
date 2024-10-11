const express = require("express");
const { getUsers } = require("../controllers/user.control");
const userRouter = express.Router();

userRouter.get("/", getUsers);

module.exports = userRouter;

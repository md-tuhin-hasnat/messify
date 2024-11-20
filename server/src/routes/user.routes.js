const express = require("express");
const { getUser, getUserById } = require("../controllers/user.control");
const userRouter = express.Router();
const checkAuth = require("../checkAuth");

userRouter.get("/", getUser);
userRouter.get("/:userId", checkAuth, getUserById);

module.exports = userRouter;

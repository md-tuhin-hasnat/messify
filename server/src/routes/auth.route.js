const express = require("express");
const {
  regControl,
  loginControl,
  logoutControl,
} = require("../controllers/auth.control");
const authRouter = express.Router();

authRouter.post("/register", regControl);
authRouter.post("/login", loginControl);
authRouter.post("/logout", logoutControl);

module.exports = authRouter;

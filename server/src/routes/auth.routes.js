const express = require("express");
const { passport } = require("../config/passport");
const {
  regControl,
  loginControl,
  logoutControl,
  protectedControl,
} = require("../controllers/auth.control");
const authRouter = express.Router();

authRouter.post("/register", regControl);
authRouter.post("/login", loginControl);
authRouter.post("/logout", logoutControl);
authRouter.get(
  "/protected",
  passport.authenticate("jwt-cookiecombo", {
    session: false,
  }),
  protectedControl
);

module.exports = authRouter;

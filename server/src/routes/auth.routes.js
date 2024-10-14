const express = require("express");
const passport = require('passport')
const {
  regControl,
  loginControl,
  logoutControl,
  protectedControl,
} = require("../controllers/auth.control");
const authRouter = express.Router();

authRouter.post("/register", regControl);
authRouter.post(
  "/login",
  passport.authenticate("local"),
  loginControl
);
authRouter.post("/logout", logoutControl);
authRouter.get(
  "/protected",
  protectedControl
);
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile","email"],
  })
);
authRouter.get("/google/redirect", passport.authenticate("google",
  {
    successRedirect:"http://localhost:3000/",
    failureRedirect:"http://localhost:3000/auth"
  }
));
module.exports = authRouter;

const express = require("express");
const checkAuth = require("../checkAuth");
const {
  createMess,
  getMessByUserId,
  getMessByCode,
  postJoinRequest,
  approveJoinRequest,
  userRoles,
} = require("../controllers/mess.control");
const messRouter = express.Router();

messRouter.post("/create", checkAuth, createMess);
messRouter.post("/join", checkAuth, postJoinRequest);
messRouter.post("/approve", checkAuth, approveJoinRequest);
messRouter.get("/getbyid", checkAuth, getMessByUserId);
messRouter.get("/getrole/:messCode", checkAuth, userRoles);
messRouter.get("/getbycode/:messCode", checkAuth, getMessByCode);

module.exports = messRouter;

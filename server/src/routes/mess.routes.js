const express = require("express");
const checkAuth = require("../checkAuth");
const { createMess, getMess } = require("../controllers/mess.control");
const messRouter = express.Router();

messRouter.post("/create", checkAuth, createMess);
messRouter.get("/get", checkAuth, getMess);

module.exports = messRouter;

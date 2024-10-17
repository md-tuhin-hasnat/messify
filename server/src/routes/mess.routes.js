const express = require("express");
const checkAuth = require("../checkAuth");
const { createMess } = require("../controllers/mess.control");
const messRouter = express.Router();

messRouter.post("/create", checkAuth, createMess);

module.exports = messRouter;

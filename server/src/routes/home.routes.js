const express = require("express");
const { getHome, getData } = require("../controllers/home.control");
const checkAuth = require("../checkAuth");
const homeRouter = express.Router();

homeRouter.get("/get-data/:mess_code/:month", checkAuth, getData);

module.exports = homeRouter;

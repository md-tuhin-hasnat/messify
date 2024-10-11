const express = require("express");
const { getHome } = require("../controllers/home.control");
const homeRouter = express.Router();

homeRouter.get("/", getHome);

module.exports = homeRouter;

const express = require("express");
const { getHome } = require("../controllers/homeController");
const homeRouter = express.Router();

homeRouter.get("/", getHome);

module.exports = homeRouter;

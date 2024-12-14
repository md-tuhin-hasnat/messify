const express = require("express");
const checkAuth = require("../checkAuth");
const { getData } = require("../controllers/dashboard.control");

const dashBoardRouter = express.Router();

dashBoardRouter.get("/get-data/:mess_code/:month", checkAuth, getData);

module.exports = dashBoardRouter;

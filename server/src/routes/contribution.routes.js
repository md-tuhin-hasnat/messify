const express = require("express");
const checkAuth = require("../checkAuth");
const { addMoney, getContribution, getTotalContribution } = require("../controllers/contribution.control");

const contributionRouter = express.Router();

contributionRouter.post("/add-money", checkAuth, addMoney);
contributionRouter.get("/get-contribution/:date/:month/:mess_code", checkAuth, getContribution);
contributionRouter.get("/get-total-contribution/:month/:mess_code", checkAuth, getTotalContribution);

module.exports = contributionRouter;

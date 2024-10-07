const express = require("express");
const { getSeedUser } = require("../controllers/seedUser.control");
const seedRouter = express.Router();

seedRouter.get("/users", getSeedUser);

module.exports = { seedRouter };

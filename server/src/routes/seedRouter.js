const express = require("express");
const { getSeedUser } = require("../controllers/seedUserController");
const seedRouter = express.Router();

seedRouter.get("/users", getSeedUser);

module.exports = { seedRouter };

const express = require("express");
const checkAuth = require("../checkAuth");
const { addBulk, addMeal, getMeal, getTotalMeal} = require("../controllers/meal.control");

const mealRouter = express.Router();

mealRouter.post("/add-bulk", checkAuth, addBulk);
mealRouter.post("/add-meal", checkAuth, addMeal);
mealRouter.get("/get-meal/:date/:type/:mess_code", checkAuth, getMeal);
mealRouter.get("/totals/:date/:mess_code", checkAuth, getTotalMeal);

module.exports = mealRouter;

const express = require("express");
const checkAuth = require("../checkAuth");
const { getMealExpense } = require("../controllers/expenses.control");
const expenseRouter = express.Router();

// expenseRouter.post("/create-meal-expense", checkAuth, createMess);
expenseRouter.get("/get-meal-expense", checkAuth, getMealExpense);

module.exports = expenseRouter;

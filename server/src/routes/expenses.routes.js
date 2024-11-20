const express = require("express");
const checkAuth = require("../checkAuth");
const { getMealExpense } = require("../controllers/expenses.control");
const expenseRouter = express.Router();

expenseRouter.get("/get-meal-expense", checkAuth, getMealExpense);

module.exports = expenseRouter;

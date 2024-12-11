const express = require("express");
const checkAuth = require("../checkAuth");
const { getExpense, addExpense, editExpense ,deleteExpense } = require("../controllers/expenses.control");
const expenseRouter = express.Router();

expenseRouter.get("/get-expense/:mess_code", checkAuth, getExpense);
expenseRouter.post("/add-expense", checkAuth, addExpense);
expenseRouter.post("/edit-expense", checkAuth, editExpense);
expenseRouter.post("/delete-expense", checkAuth, deleteExpense);

module.exports = expenseRouter;

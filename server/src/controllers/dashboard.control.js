const createHttpError = require("http-errors");
const { userToMess } = require("../models/user-mess.model ");
const { user } = require("../models/users.model");
const { meal } = require("../models/meal.model");
const { expense } = require("../models/expense.model");
const { contribution } = require("../models/contribution.model");


async function getData(req,res,next){
  const {mess_code, month} = req.params;
  console.log("Month : ",month);
  try {
    const _expenses = await expense.find({mess_code: mess_code});
    console.log(_expenses);
    let totalExpense = 0;
    for (let i = 0; i < _expenses.length; i++) {
      const _expense = _expenses[i];
      const Month = new Date(_expense.date).getMonth();
      // console.log("------------------------------------ A", Month, " B", new Date(month).getMonth());
      if(new Date(month).getMonth() === Month){
        totalExpense += _expense.subtotal;
      }
    }

    const contributions = await contribution.find({month: new Date(month).getMonth()+1, mess_code:mess_code});
    let totalContribution = 0;
    for (let i = 0; i < contributions.length; i++) {
      totalContribution += contributions[i].amount;
    }

    const MealMonth = await meal.find({mess_code:mess_code});

    let totalMeals = 0;
    for (let i = 0; i < MealMonth.length; i++) {
      const _meal = MealMonth[i];
      const _mealDate = new Date(_meal.date);
      const _date = new Date(month);
      if(_mealDate.getMonth() === _date.getMonth()){
        totalMeals+=_meal.meal_quantity;
      }
    }

    const _user = await user.findById(req.user.id);
    let supervisorName = _user.name;

    let messCode = mess_code;

    let predictedMealRate = totalExpense/totalMeals;
    let currentMonthExpenses = totalExpense;

    let previousMonthExpenses = 0;
    for (let i = 0; i < _expenses.length; i++) {
      const _expense = _expenses[i];
      const Month = new Date(_expense.date).getMonth();
      if(new Date(month).getMonth() - 1 === Month){
        previousMonthExpenses += _expense.subtotal;
      }
    }
    res.status(200).send({
      totalExpense,
      totalContribution,
      totalMeals,
      supervisorName,
      messCode,
      predictedMealRate,
      currentMonthExpenses,
      previousMonthExpenses,
    })
  } catch (error) {
    console.log(error);
    next(createHttpError(500,error));
  }
}

module.exports = {
  getData,
}
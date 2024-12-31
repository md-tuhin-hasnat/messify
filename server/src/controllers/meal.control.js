const createHttpError = require("http-errors");
const { userToMess } = require("../models/user-mess.model ");
const { user } = require("../models/users.model");
const { meal } = require("../models/meal.model");
const dateToMonth = (_date) => {
  const date = new Date(_date);
  const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[date.getMonth()];
}
async function addBulk(req,res,next){
  const {date,number,type,mess_code} = req.body;
  const month = dateToMonth(date);
  try {
    const userOfMess = await userToMess.find({messCode:mess_code});
    userOfMess.map(async (_user)=>{
      const User = await user.findById(_user.userId);
      const newMeal = new meal({
        mess_code: mess_code,
        type: type,
        member_id: User.id,
        meal_quantity: number,
        member_name: User.name,
        date: date,
        month: month
      })
      await newMeal.save();
    })
    res.status(201).send({success: true});
  } catch (error) {
    next(createHttpError(500,error));
  }
}

async function addMeal(req,res,next){
  const {date,number,type,mess_code, userId} = req.body;
  const month = dateToMonth(date);
  try {
    const User = await user.findById(userId);
      const newMeal = new meal({
        mess_code: mess_code,
        type: type,
        member_id: User.id,
        meal_quantity: number,
        member_name: User.name,
        date: date,
        month: month
      })
      await newMeal.save();
    res.status(201).send({success: true});
  } catch (error) {
    next(createHttpError(500,error));
  }
}

async function getMeal(req,res,next){
  const {date,type,mess_code} = req.params;
  const month = dateToMonth(date);
  try {
    let Meal;
    if(type !== "All_Meal" ) Meal = await meal.find({month:month, type:type, mess_code:mess_code});
    else Meal = await meal.find({month:month, mess_code:mess_code});
    let meals = [];
    let mealsByDate = new Map();
    for (let i = 0; i < Meal.length; i++) {
      const _meal = Meal[i];
      const meal = {
        id : _meal.member_id,
        userId: _meal.member_id,
        breakfast: 0,
        lunch: 0,
        diner: 0,
        total: 0,
        date: _meal.date
      }
      if(_meal.type === 'Breakfast'){
        meal.breakfast += _meal.meal_quantity;
        meal.total += _meal.meal_quantity;
      }
      else if(_meal.type === 'Lunch'){
        meal.lunch += _meal.meal_quantity;
        meal.total += _meal.meal_quantity;
      }
      else{
        meal.diner += _meal.meal_quantity;
        meal.total += _meal.meal_quantity;
      }


      if(mealsByDate.has(meal.date.toString()+meal.userId.toString())){
        let befor = mealsByDate.get(meal.date.toString()+meal.userId.toString());
        befor.breakfast += meal.breakfast;
        befor.lunch += meal.lunch;
        befor.diner += meal.diner;
        befor.total += meal.total;
        mealsByDate.set(meal.date.toString()+meal.userId.toString(), befor);
      }
      else{
        mealsByDate.set(meal.date.toString()+meal.userId.toString(), meal);
      }
    }
    for(const [key, value] of mealsByDate){
      meals.push(value);
    }
    res.status(200).send(meals);
  } catch (error) {
    next(createHttpError(500,error));
  }
}

async function getTotalMeal(req,res,next){
  const {date, mess_code} = req.params;
  try {
    const Meal = await meal.find({date:date, mess_code:mess_code});
    const MealMonth = await meal.find({mess_code:mess_code});
    let daily = 0;
    for (let i = 0; i < Meal.length; i++) {
      const _meal = Meal[i];
      daily+=_meal.meal_quantity;
    }
    let monthly = 0;
    for (let i = 0; i < MealMonth.length; i++) {
      const _meal = MealMonth[i];
      const _mealDate = new Date(_meal.date);
      const _date = new Date(date);
      if(_mealDate.getMonth() === _date.getMonth()){
        monthly+=_meal.meal_quantity;
      }
    }
    res.status(200).send({daily,monthly});
  } catch (error) {
    console.log(error);
    next(createHttpError(500,error));
  }
}
module.exports = {
  addBulk,
  addMeal,
  getMeal,
  getTotalMeal
}
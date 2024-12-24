const createHttpError = require("http-errors");
const { expense } = require("../models/expense.model");

async function getExpense(req, res, next) {
  const mess_code = req.params.mess_code;
  try {
    const _expenses = await expense.find({mess_code});
    const expenses = [];
    for (let i = 0; i < _expenses.length; i++) {
      const _expense = _expenses[i];
      const expense = {
        id: _expense._id,
        mess_code: _expense.mess_code,
        product_name: _expense.product_name,
        product_category: _expense.product_category,
        quantity: _expense.quantity,
        rate: _expense.rate,
        discount: _expense.discount,
        subtotal: _expense.subtotal,
        date: _expense.date
      }
      expenses.push(expense);
    }
    // console.log(expense);
    res.status(200).send({
      success:true,
      expenses
    })
  } catch (error) {
    next(createHttpError(400, error.message));
  }
}

async function addExpense(req, res, next) {
  const {mess_code, product_name, product_category, quantity, rate, subtotal, date, discount} = req.body;
  try {
    const newExpense = new expense({
      mess_code,
      product_name,
      product_category,
      quantity,
      rate,
      subtotal,
      date,
      discount
    });
    await newExpense.save();
    res.status(201).send({success: true, id: newExpense.id});
  } catch (error) {
    next(createHttpError(500, error.message));
  }
}
async function editExpense(req, res, next) {
  const {id,mess_code,product_name, product_category, quantity, rate, subtotal,date, discount} = req.body;
  // console.log(id);
  try {
    const findExpense = await expense.findByIdAndUpdate(
      id,
      {
        mess_code,
        product_name,
        product_category,
        quantity,
        rate,
        subtotal,
        date,
        discount
      }
    );
    findExpense.save();

    res.status(200).send({success: true});
  } catch (error) {
    console.log(error);
    next(createHttpError(500, error.message));
  }
}


async function deleteExpense(req, res, next) {
  const {id} = req.body;
  // console.log("id", id);
  try {
    const findExpense = await expense.findByIdAndDelete(id);
    res.status(200).send({success: true});
  } catch (error) {
    console.log(error);
    next(createHttpError(500, error.message));
  }
}
module.exports = {
  getExpense,
  addExpense,
  editExpense,
  deleteExpense
};

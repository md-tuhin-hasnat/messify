const { model, Schema } = require("mongoose");

const mealExpenseSchema = new Schema(
  {
    product_id: {
      type: String,
      required: [true, "Product ID is required!"],
    },
    quantity: {
      type: Number,
      required: [true, "Product Quantity is required!"],
    },
    rate: {
      type: Number,
      required: [true, "Product Rate is required!"],
    },
    subtotal: {
      type: Number,
      required: [true, "Subtotal is required!"],
    },
  },
  {
    timestamps: true,
  }
);
const mealExpense = model("MealExpense", mealExpenseSchema);
module.exports = { mealExpense };

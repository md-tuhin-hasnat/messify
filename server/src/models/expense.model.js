const { model, Schema } = require("mongoose");

const expenseSchema = new Schema(
  {
    mess_code:{
      type: String,
      required: [true, "Mess Code is required!"],
    },
    product_name: {
      type: String,
      required: [true, "Product Name is required!"],
    },
    product_category: {
      type: String,
      required: [true, "Product category is required!"],
    },
    quantity: {
      type: Number,
      required: [true, "Product Quantity is required!"],
    },
    rate: {
      type: Number,
      required: [true, "Product Rate is required!"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    subtotal: {
      type: Number,
      required: [true, "Subtotal is required!"],
    },
    date:{
      type: Date,
      required:[true, "Date is required!"],
    }
  }
);
const expense = model("Expense", expenseSchema);
module.exports = { expense };

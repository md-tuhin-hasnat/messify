const { model, Schema } = require("mongoose");

const mealSchema = new Schema(
  {
    mess_code:{
      type: String,
      required: [true, "Mess Code is required!"],
    },
    type: {
      type: String,
      required: [true, "Meal Type is required!"],
    },
    member_id: {
      type: String,
      required: [true, "Member ID is required!"],
    },
    meal_quantity: {
      type: Number,
      required: [true, "Meal Quantity is required!"],
    },
    member_name: {
      type: String,
      required: [true, "Member Name is required!"],
    },
    date:{
      type: Date,
      required:[true, "Date is required!"],
    },
    month:{
      type: String,
      required:[true, "Month is required!"],
    }
  }
);
const meal = model("Meal", mealSchema);
module.exports = { meal };

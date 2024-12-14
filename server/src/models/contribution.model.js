const { model, Schema } = require("mongoose");

const contributionSchema = new Schema(
  {
    mess_code:{
      type: String,
      required: [true, "Mess Code is required!"],
    },
    userId: {
      type: String,
      required: [true, "User ID is required!"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required!"],
    },
    date:{
      type: Date,
      required:[true, "Date is required!"],
    },
    month:{
      type: Number,
      required:[true, "Month is required!"],
    }
  }
);
const contribution = model("Contribution", contributionSchema);
module.exports = { contribution };

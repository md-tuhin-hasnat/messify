const { model, Schema } = require("mongoose");

const messSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Mess name is required!"],
      trim: true,
      maxlength: [31, "Mess name can be at most 31 characters long!"],
      minlength: [3, "Mess name must be at least 3 characters long!"],
    },
    type: {
      type: String,
      required: [true, "Mess type is required!"],
      trim: true,
      enum: ["1 to 10", "11 to 50", "51 to 100", "Above 100"],
    },
    code: {
      type: String,
      required: [true, "Mess code is required!"],
    },
  },
  {
    timestamps: true,
  }
);
const mess = model("Mess", messSchema);
module.exports = { mess };

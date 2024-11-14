const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required!"],
      trim: true,
      maxlength: [31, "Product name can be at most 31 characters long!"],
      minlength: [3, "Product name must be at least 3 characters long!"],
    },
  },
  {
    timestamps: true,
  }
);
const product = model("Product", productSchema);
module.exports = { product };

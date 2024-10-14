const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required!"],
      trim: true,
      maxlength: [31, "User name can be at most 31 characters long!"],
      minlength: [3, "User name must be at least 3 characters long!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      lowercase: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email address format",
      },
    },
    googleID: {
      type: String,
    },
    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters long!"],
      set: (value) => {
        return bcrypt.hashSync(value, bcrypt.genSaltSync(10));
      },
    },
    image: {
      type: String,
      default: "../../public/images/users/22549350534.png",
    },
    oauth: {
      type: Boolean,
      default:false,
    },
  },
  {
    timestamps: true,
  }
);
const user = model("User", userSchema);
module.exports = { user };

const { model, Schema } = require("mongoose");

const userMessSchema = new Schema(
  {
    messCode: {
      type: String,
      required: [true, "Mess code is required!"],
    },
    userId: {
      type: String,
      required: [true, "User ID is required!"],
    },
    userType: {
      type: String,
      required: [true, "User type is required!"],
      trim: true,
      enum: ["admin", "manager", "assistant manager", "member", "guest"],
    },
  },
  {
    timestamps: true,
  }
);
const userToMess = model("UserToMess", userMessSchema);
module.exports = { userToMess };

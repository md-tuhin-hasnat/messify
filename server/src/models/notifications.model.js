const { model, Schema } = require("mongoose");
const notificationSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["joinRequest", "event", "admin"],
    },
    userId: {
      type: String,
      required: function () {
        return this.type === "event";
      },
    },
    requestUserId: {
      type: String,
      required: function () {
        return this.type === "joinRequest";
      },
    },
    messCode: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const notification = model("Notification", notificationSchema);
module.exports = { notification };

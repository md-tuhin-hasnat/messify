const express = require("express");
const notificationRouter = express.Router();
const checkAuth = require("../checkAuth");
const {
  readnotification,
  getnotification,
  postnotification,
} = require("../controllers/notifications.control");

notificationRouter.get("/get/:page", checkAuth, getnotification);
notificationRouter.post("/send", postnotification);
notificationRouter.post("/:notificationId/read", readnotification);

module.exports = notificationRouter;

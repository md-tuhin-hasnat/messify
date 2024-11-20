const createHttpError = require("http-errors");
const { notification } = require("../models/notifications.model");
// async function getnotification(req, res, next) {
//   const userId = req?.user?.id;
//   const page = req.params.page;
//   try {
//     const notifications = await notification.find({ userId });
//     res.status(200).json({
//       success: true,
//       data: notifications,
//     });
//   } catch (error) {
//     next(createHttpError(400, error.message));
//   }
// }
async function getnotification(req, res, next) {
  const userId = req?.user?.id;
  const page = parseInt(req.params.page) || 1; // Default to page 1 if not provided
  const limit = 2; // Number of notifications per page
  const skip = (page - 1) * limit;

  try {
    // Fetch unread notifications (these should always be included)
    const unreadNotifications = await notification
      .find({ userId, read: false })
      .sort({ createdAt: -1 });

    // Fetch paginated notifications, excluding unread ones to avoid duplication
    const paginatedNotifications = await notification
      .find({ userId, read: true }) // Fetch only read notifications for pagination
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Combine unread and paginated notifications
    const combinedNotifications = [
      ...unreadNotifications,
      ...paginatedNotifications,
    ];

    res.status(200).json({
      success: true,
      data: combinedNotifications,
    });
  } catch (error) {
    next(createHttpError(400, error.message));
  }
}

async function readnotification(req, res, next) {
  const notificationId = req.params.notificationId;
  try {
    await notification.findOneAndUpdate(
      { _id: notificationId },
      { read: true },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    next(createHttpError(400, error.message));
  }
}

async function postnotification(req, res, next) {
  const { type, userId, message, messCode } = req.body;

  if (!type || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Type and message are required." });
  }

  try {
    const notifications = new notification({ type, userId, message, messCode });
    await notifications.save();
    res
      .status(200)
      .json({ success: true, message: "Notification sent and saved." });
  } catch (err) {
    console.error("Error sending notification:", err);
    next(createHttpError(500, { message: "Failed to send notification." }));
  }
}

module.exports = { getnotification, readnotification, postnotification };

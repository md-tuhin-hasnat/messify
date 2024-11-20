const createHttpError = require("http-errors");
const { mess } = require("../models/mess.model");
const { userToMess } = require("../models/user-mess.model ");
const { notification } = require("../models/notifications.model");

async function createMess(req, res, next) {
  function generateRandomCode(length = 6) {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    return code;
  }

  try {
    var code;
    var isExistMess;
    while (true) {
      code = generateRandomCode(6);
      isExistMess = await mess.findOne({ code: code });
      if (!isExistMess) break;
    }
    const newMess = new mess({
      name: req.body.name,
      type: req.body.messType,
      code: code,
    });
    await newMess.save().catch((error) => {
      next(createHttpError(400, error.message));
    });

    const _userToMess = new userToMess({
      userId: req.user._id,
      userType: "admin",
      messCode: code,
    });
    await _userToMess
      .save()
      .then(() => {
        res.status(201).send({ success: true });
      })
      .catch((error) => {
        next(createHttpError(400, error.message));
      });
  } catch (error) {
    next(createHttpError(400, error.message));
  }
}

async function getMessByUserId(req, res, next) {
  const userId = req?.user?.id;
  try {
    const _userToMess = await userToMess.find({ userId: userId });
    if (_userToMess) {
      var allMessOfUser = [];
      for (const u2m of _userToMess) {
        const messcode = u2m.messCode;
        const messInfo = await mess.findOne({ code: messcode });
        const { name, code } = messInfo;
        allMessOfUser.push({ name, code });
      }
      res.status(200).send({
        success: true,
        allMessOfUser,
      });
    } else {
      res.status(404).send({
        success: false,
      });
    }
  } catch (error) {
    next(createHttpError(5000, error.message));
  }
}
async function getMessByCode(req, res, next) {
  const messCode = req.params.messCode;
  try {
    const MessData = await mess.findOne({ code: messCode });
    if (MessData) {
      res.status(200).json({ success: true, messname: MessData.name });
    } else {
      next(createHttpError(404, "No Mess Found"));
    }
  } catch (error) {
    next(createHttpError(500, "Server Error"));
  }
}

async function postJoinRequest(req, res, next) {
  const userId = req?.user?.id;
  const messcode = req.body.messcode;
  try {
    const isSentrequest = await notification.findOne({
      type: "joinRequest",
      requestUserId: userId,
      messCode: messcode,
    });
    if (!isSentrequest) {
      const usertoMessAdmin = await userToMess
        .find({
          messCode: messcode,
        })
        .or([{ userType: "admin" }, { userType: "manager" }]);
      if (usertoMessAdmin) {
        for (const u2m of usertoMessAdmin) {
          const adminUserId = u2m.userId;
          const _notification = new notification({
            type: "joinRequest",
            userId: adminUserId,
            requestUserId: userId,
            messCode: messcode,
          });
          await _notification.save();
        }
        res.status(201).json({ success: true, message: "Join Request Sent" });
      } else {
        next(createHttpError(400, "Error Sending join Request"));
      }
    } else {
      next(createHttpError(400, "Already Sent Join Request Before"));
    }
  } catch (error) {
    next(createHttpError(500, error.message));
  }
}
async function approveJoinRequest(req, res, next) {
  const requestedUserId = req.body.userId;
  const requestedMessCode = req.body.messCode;
  try {
    const newUserToMess = new userToMess({
      messCode: requestedMessCode,
      userId: requestedUserId,
      userType: "member",
    });
    await newUserToMess.save();

    const approveNotification = new notification({
      type: "admin",
      userId: requestedUserId,
      messCode: requestedMessCode,
    });
    await approveNotification.save();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
}
async function userRoles(req, res, next) {
  const userId = req?.user?.id;
  const messCode = req.params.messCode;

  try {
    const roles = await userToMess.findOne({
      userId: userId,
      messCode: messCode,
    });

    if (roles) {
      res.status(200).json({
        success: true,
        role: roles.userType,
      });
    } else {
      next(createHttpError(400, "No Roles Found"));
    }
  } catch (error) {
    next(createHttpError(500, "Server Error"));
  }
}
module.exports = {
  createMess,
  getMessByUserId,
  getMessByCode,
  postJoinRequest,
  approveJoinRequest,
  userRoles,
};

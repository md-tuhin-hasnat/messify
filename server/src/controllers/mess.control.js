const createHttpError = require("http-errors");
const { mess } = require("../models/mess.model");
const { userToMess } = require("../models/user-mess.model ");

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

async function getMess(req, res, next) {
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
module.exports = {
  createMess,
  getMess,
};

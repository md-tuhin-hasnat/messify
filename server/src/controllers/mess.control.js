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

module.exports = {
  createMess,
};

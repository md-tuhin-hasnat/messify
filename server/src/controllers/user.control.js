const { user } = require("../models/users.model");

const getUsers = (req, res, next) => {
  try {
    user.find({}).then((users) => {
      res.status(200).json({
        message: "users are retuned",
        users,
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
};

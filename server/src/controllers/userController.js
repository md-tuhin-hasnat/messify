const { users } = require("../models/users.model");

const getUsers = (req, res, next) => {
  try {
    res.status(200).json({
      message: "users are retuned",
      users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
};

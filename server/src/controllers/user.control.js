const createHttpError = require("http-errors");
const { user } = require("../models/users.model");

const getUser = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const { name, image } = req.user;
      res.status(200).send({
        success: true,
        user: { name, image },
      });
    } else res.status(401).send({ success: false, message: "Not Authorized" });
  } catch (error) {
    next(error);
  }
};
const getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const userData = await user.findOne({ _id: userId });
    // console.log(userData);
    res.status(200).json({
      success: true,
      data: {
        username: userData.name,
        email: userData.email,
      },
    });
  } catch (error) {
    next(createHttpError(500, error));
  }
};

module.exports = {
  getUser,
  getUserById,
};

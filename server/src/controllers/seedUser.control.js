const { user } = require("../models/users.model");
const { Data } = require("../seed-data");

const getSeedUser = async (req, res, next) => {
  try {
    //delete all user from database
    await user.deleteMany({});

    //insert new users
    const users = await user.insertMany(Data.users);

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSeedUser };

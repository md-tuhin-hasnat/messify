const mongoose = require("mongoose");
const { dbUrl } = require("../secrets");
const Log = require("../log/timelog");

const connectDb = async (options = {}) => {
  try {
    await mongoose.connect(dbUrl, options);
    Log("Database Connected successfully..");

    mongoose.connection.on("error", (error) => {
      Log(`${error.toString()}`, false, true);
    });
  } catch (error) {
    Log(`${error.toString()}`, false, true);
  }
};

module.exports = connectDb;

require("dotenv").config();

const port = process.env.PORT;
const mongoDbUrl = process.env.MONGODB_URL;
const mongoDbLocalUrl = process.env.MONGODB_LOCAL_URL;
const dbUrl = mongoDbLocalUrl;
const jwtSecret = process.env.JWT_SECRET;

module.exports = {
  serverPort: port,
  dbUrl: dbUrl,
  jwtSecret: jwtSecret,
};

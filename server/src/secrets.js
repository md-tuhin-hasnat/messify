require("dotenv").config();

const port = process.env.PORT;
const mongoDbUrl = process.env.MONGODB_URL;
const mongoDbLocalUrl = process.env.MONGODB_LOCAL_URL;
const dbUrl = mongoDbLocalUrl;

module.exports = {
  serverPort: port,
  dbUrl: dbUrl,
};

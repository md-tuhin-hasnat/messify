require("dotenv").config();

const port = process.env.PORT;
const mongoDbUrl = process.env.MONGODB_REMOTE_URL;
const dbUrlforSession = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const mongoDbLocalUrl = process.env.MONGODB_LOCAL_URL;
const dbUrl = mongoDbUrl;
const jwtSecret = process.env.JWT_SECRET;
const googleId = process.env.GOOGLE_ID;
const googleSecret = process.env.GOOGLE_SECRET;

module.exports = {
  serverPort: port,
  dbUrl: dbUrl,
  jwtSecret: jwtSecret,
  googleId: googleId,
  googleSecret: googleSecret,
  dbUrlforSession: dbUrlforSession,
  dbName: dbName,
};

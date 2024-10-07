const express = require("express");
const morgan = require("morgan");
const creatError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routes/user.route");
const homeRouter = require("./routes/home.route");
const { seedRouter } = require("./routes/seed.route");
const cors = require("cors");

const log = require("./log/timelog");
const authRouter = require("./routes/auth.route");

const app = express();
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many requests from this ip. please try again later",
});

// ------------------MeddleWares--------------------------
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(xssClean());
app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//--------------------------------------------------------

// ------------------Routes-------------------------------
app.use("/", homeRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/seed", seedRouter);
//--------------------------------------------------------

//Client Error handling
app.use((req, res, next) => {
  next(creatError(404, "route not found"));
});

//Server Error handling
app.use((err, req, res, next) => {
  res.status(err.status || 5000).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;

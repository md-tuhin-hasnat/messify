const express = require("express");
const morgan = require("morgan");
const creatError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routes/userRouter");
const homeRouter = require("./routes/homeRouter");
const { seedRouter } = require("./routes/seedRouter");

const log = require("./log/timelog");

const app = express();
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many requests from this ip. please try again later",
});

// ------------------MeddleWares--------------------------
app.use(morgan("dev"));
app.use(xssClean());
app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//--------------------------------------------------------

// ------------------Routes-------------------------------
app.use("/", homeRouter);
app.use("/api/users", userRouter);
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

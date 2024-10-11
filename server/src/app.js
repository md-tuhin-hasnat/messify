const express = require("express");
const morgan = require("morgan");
const creatError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routes/user.routes");
const homeRouter = require("./routes/home.routes");
const { seedRouter } = require("./routes/seed.routes");
const authRouter = require("./routes/auth.routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const log = require("./log/timelog");
const { jwtSecret } = require("./secrets");

const app = express();
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 500,
  message: "Too many requests from this ip. please try again later",
});
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ------------------MeddleWares--------------------------
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(xssClean());
app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(jwtSecret));
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

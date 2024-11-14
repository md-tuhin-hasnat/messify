const express = require("express");
const morgan = require("morgan");
const creatError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routes/user.routes");
const homeRouter = require("./routes/home.routes");
const { seedRouter } = require("./routes/seed.routes");
const authRouter = require("./routes/auth.routes");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
require("./config/passport");
const log = require("./log/timelog");
const { dbUrl } = require("./secrets");
const messRouter = require("./routes/mess.routes");
const serverless = require("serverless-http");
const expenseRouter = require("./routes/expenses.routes");
const productRouter = require("./routes/products.routes");
const app = express();
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 500,
  message: "Too many requests from this ip. please try again later",
});
const corsOptions = {
  origin: ["http://localhost:3000", "http://192.168.0.109:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ------------------MeddleWares--------------------------
app.set("trust proxy", 1);
app.use(
  session({
    secret: "oedtgufr0934",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: dbUrl,
      collectionName: "sessions",
      ttl: 2 * 24 * 60 * 60 + 60 * 60,
    }),
    cookie: {
      // secure: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(xssClean());
app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//--------------------------------------------------------

// ------------------Routes-------------------------------
app.use("/", homeRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/mess", messRouter);
app.use("/api/expense", expenseRouter);
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
module.exports.handler = serverless(app);

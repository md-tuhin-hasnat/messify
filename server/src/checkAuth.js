const createHttpError = require("http-errors");

async function checkAuth(req, res, next) {
  try {
    if (req.isAuthenticated()) next();
    else next(createHttpError(401, "Unauthorized"));
  } catch (error) {
    next(createHttpError(500, "Server errror while Authorized"));
  }
}

module.exports = checkAuth;

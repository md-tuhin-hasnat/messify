const passport = require("passport");
const { Strategy: JwtStrategy } = require("passport-jwt");
const { jwtSecret } = require("../secrets");

const opts = {
  jwtFromRequest: (req) => req.cookies.jwt, // Extract JWT from cookie
  secretOrKey: jwtSecret,
};

passport.use(
  new JwtStrategy(opts, (jwtPayload, done) => {
    try {
      const user = { email: jwtPayload.email };
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);
module.exports = { passport };

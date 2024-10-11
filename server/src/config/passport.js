const passport = require("passport");
// const { Strategy: JwtStrategy } = require("passport-jwt");
const JwtCookieComboStrategy = require("passport-jwt-cookiecombo");
const { jwtSecret } = require("../secrets");

const opts = {
  secretOrPublicKey: jwtSecret,
  jwtVerifyOptions: {
    audience: "http://localhost:3000",
    expiresIn: "7d", // 1d
    issuer: "example.io",
  },
  passReqToCallback: false,
};

passport.use(
  new JwtCookieComboStrategy(
    { secretOrPublicKey: jwtSecret },
    (payload, done) => {
      try {
        console.log(payload);
        const user = { user_id: payload.user_id };
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
// passport.use(
//   new JwtStrategy(opts, (jwtPayload, done) => {
//     try {
//       console.log(jwtPayload);
//       const user = { user_id: jwtPayload.user_id };
//       if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//       }
//     } catch (error) {
//       return done(error, false);
//     }
//   })
// );
module.exports = { passport };

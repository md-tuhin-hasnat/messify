const passport = require("passport");
const { user } = require("../models/users.model");
const bcrypt = require("bcryptjs");
const { googleId, googleSecret } = require("../secrets");
const createHttpError = require("http-errors");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const _user = await user.findOne({ email });
        if (!_user) {
          return done(createHttpError(401, "Incorrect Username"));
        }
        const userPassword = _user?.password || "_";
        const isMatch = await bcrypt.compare(password, userPassword);
        if (!isMatch && userPassword !== "_") {
          return done(createHttpError(402, "Incorrect Password"));
        } else if (!isMatch) {
          return done(createHttpError(403, "Log in using Google ID"));
        }

        return done(null, _user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: googleId,
      clientSecret: googleSecret,
      callbackURL: "/api/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const _user = await user.findOne({ email: profile.emails[0].value });

        if (!_user) {
          const newUser = new user({
            name: profile.displayName,
            googleID: profile.id,
            email: profile.emails[0].value,
            image: profile.photos?.[0]?.value,
            oauth: true,
          });
          await newUser.save();
          return done(null, newUser);
        } else if (!_user.oauth) {
          await _user.updateOne({
            oauth: true,
            googleID: profile.id,
          });
        }
        return done(null, _user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const _user = await user.findById(id);
    if (!_user) {
      return done(null, false);
    }
    done(null, _user);
  } catch (error) {
    done(error, false);
  }
});

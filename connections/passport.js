const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/users/google/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    return cb(null, 'user');
  }
));
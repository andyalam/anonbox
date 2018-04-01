const passport = require('passport');
const passportJWT = require('passport-jwt');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy(
  {
    usernameField: 'email'
  },
  function (username, password, done) {
    return User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
));

passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  },
  function (jwtPayload, done) {
    console.log(jwtPayload);
    return User
      .findOne(
        { id: jwtPayload.id },
        { salt: false, hash: false }
      )
      .then(user => {
        return done(null, user);
      })
      .catch(err => {
        return done(err);
      });
  }
));

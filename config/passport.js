const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userModel = require('../models/user.js');

module.exports = function(passport) {
  passport.use(new LocalStrategy({ usernameField: 'nick', passwordField: 'pass'}, (nick, pass, done) => {
    userModel.findOne({ nick })
      .then(user => {
        if(!user)
          return done(null, false, {message: 'Invalid credentials.'});

        bcrypt.compare(pass, user.pass, (err, same) => {
          if(err)
            throw err;

          if(same)
            return done(null, user);
          else
            return done(null, false, {message: 'Invalid credentials.'});
        });
      })
      .catch(err => console.log(err));
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
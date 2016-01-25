var FacebookStrategy    = require('passport-facebook').Strategy;
var LocalStrategy       = require('passport-local' ).Strategy;
var User                = require('../models/user');
process.env             = require('../../env');

module.exports = function(passport) {

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  passport.use(new LocalStrategy(User.authenticate()));

  passport.use(new FacebookStrategy({

    clientID     : process.env.facebookID,
    clientSecret : process.env.facebookSecret,
    callback     : process.env.callbackURL
  },

  function(token, secret, profile, done) {

    process.nextTick(function() {

      User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

        if (err) return done(err);

        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();

          newUser.facebook.id     = profile.id;
          newUser.facebook.token  = token;
          newUser.facebook.name   = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.facebook.email  = profile.emails[0].value;

          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

};

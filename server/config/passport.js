var FacebookStrategy    = require('passport-facebook').Strategy;
var LocalStrategy       = require('passport-local' ).Strategy;
var User                = require('../models/user');
process.env             = require('../../env');

module.exports = function(passport) {

  passport.serializeUser(function(user, callback) {
    callback(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
    User.findById(id, function(err, user) {
      callback(err, user);
    });
  });

  passport.use(new LocalStrategy(User.authenticate()));
  
  // passport.use("local-signup", new LocalStrategy({
  //   username : "email",
  //   password : "password",
  //   passReqToCallback : true
  // }, function(req, email, password, firstName, lastName, callback){
  //   // Find a user with this e-mail
  //     User.findOne({ "username" : email }, function(err, user) {
  //       if (err) return callback(err);
  //
  //       // If there already is a user with this email
  //       if (user) {
  //         return callback(null, false, req.flash("signupMessage", "This email is already used."));
  //       } else {
  //         // There is no email registered with this email
  //
  //         // Create a new user
  //         var newUser = new User();
  //         newUser.username  = email;
  //         newUser.firstName = firstName;
  //         newUser.lastName  = lastName;
  //         // newUser.birthday  = req.body.birthday;
  //         newUser.password  = newUser.encrypt(password);
  //
  //         newUser.save(function(err) {
  //           if (err) throw err;
  //           return callback(null, newUser);
  //         });
  //       }
  //   });
  // }));
  //
  // passport.use("local-login", new LocalStrategy({
  //   username : "email",
  //   password : "password",
  //   passReqToCallback : true
  // }, function(req, email, password, callback){
  //
  //   // Search for a user with this email
  //   User.findOne({ "email" : email }, function(err, user) {
  //     if (err) {
  //       return callback(err);
  //     }
  //
  //     // If no user is found
  //     if (!user) {
  //       return callback(null, false, req.flash("loginMessage", "No user found."));
  //     }
  //
  //     // Wrong password
  //     if (!user.validPassword(password)) {
  //       return callback(null, false, req.flash("loginMessage", "Oops! Wrong password."));
  //     }
  //
  //     return callback(null, user);
  //   });
  // }));

  passport.use(new FacebookStrategy({

    clientID     : process.env.facebookID,
    clientSecret : process.env.facebookSecret,
    callbackURL  : process.env.callbackURL,
    profileFields: ['id','picture.type(large)', 'emails', 'displayName']
  },

  function(token, secret, profile, done) {

    process.nextTick(function() {

      User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

        if (err) return done(err);

        if (user) {
          console.log(user);
          return done(null, user);
        } else {
          var newUser = new User();

          newUser.facebook.id     = profile.id;
          newUser.facebook.token  = token;
          newUser.facebook.name   = profile.displayName;
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

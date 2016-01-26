var express = require('express'),
    router = express.Router(),
    passport = require('passport');
    User = require('../models/user.js');


router.post('/register', function(req, res) {
  console.log(req.body);
  User.register(new User({
    username  : req.body.username,
    firstName : req.body.firstName,
    lastName  : req.body.lastName,
    birthday  : req.body.birthday
  }), req.body.password, function(err, user) {
    if (err) {
      return res.status(500).json({err: err});
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({status: 'Registration successful!', user: user});
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({status: 'Login successful!', user: user});
    });
  })(req, res, next);
});

// FACEBOOK ROUTES ======================================
router.get('/auth/facebook', passport.authenticate('facebook', {
  scope : 'email'
}));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect : '/',
  failureRedirect : '/login'
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
});

// LIST & ITEM ROUTES ======================================
router.get("/items", function(req, res){
  Item.find({}).then(function(items){
    res.json(items);
  });
});

router.get("/lists", function(req, res){
  List.find({}).then(function(lists){
    res.json(lists);
  });
});

router.get("/all", function(req, res){
  User.find({}).then(function(users){
    res.json(users);
  });
});

module.exports = router;
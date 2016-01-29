var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user.js'),
    List = require('../models/list.js');


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
  List.find({ owner: req.user.id}).then(function(lists){
    res.json(lists);
  });
});

router.post("/lists", function(req, res){
  List.create({for: req.body.for, owner: req.user.id}).then(function(list){
    res.json(list);
  });
});

router.get("/lists/:id", function(req, res){
  List.find({_id: req.params.id}).then(function(list){
    res.json(list);
  });
});

router.put("/lists/:id/addItem", function(req, res){
  console.log(req.params.id);
  List.findByIdAndUpdate(req.params.id, {
    $push: {
      items: {name: "asdf"}
    }
  }, function(err, docs){
    console.log("error: " + err);
    if (!err){
      res.json(docs);
    }
  });
});

router.put("/lists/:id", function(req, res){
  console.log(req.params.id);
  List.findByIdAndUpdate(req.params.id, {
    $set: {
      for: "person"
    }
  }, function(err, docs){
    console.log("error: " + err);
    if (err){
      throw err;
    }
    res.json(docs);
  });
});

router.delete("/lists/:id", function(req, res){
  List.findByIdAndRemove({_id: req.params.id},
    function(err, docs){
      if (err){
        throw err;
      }
      else { res.redirect("/lists");}
    });
});

module.exports = router;

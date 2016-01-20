// express
var express = require('express');
var app = express();

// public paths
var path = require('path');
app.use(express.static(path.join(__dirname, '/public')));

//db requirements
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/giffter');
var User = require("./models/user");
var List = require("./models/list");
var Item = require("./models/item");


// index route
app.get("/", function(req, res){
  res.send("giffter backend")
})

app.get("/users", function(req, res){
  User.find({}).then(function(users){
    res.json(users);
  })
});

app.get("/items", function(req, res){
  Item.find({}).then(function(items){
    res.json(items);
  })
});

app.get("/lists", function(req, res){
  List.find({}).then(function(lists){
    res.json(lists);
  })
});

// listening on port
var port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

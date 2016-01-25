var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:8080/giffter');
var UserModel = require("../models/user");
var ListModel = require("../models/list");
var ItemModel = require("../models/item");

// conn.on("error", function(err){
//   console.log("Oops! Mongo threw an error. Is `mongod` running?");
//   console.log(err.message);
//   process.exit();
// });

ListModel.remove({}, function(err){
  console.log(err);
});
ItemModel.remove({}, function(err){
  console.log(err);
});
UserModel.remove({}, function(err){
  console.log(err);
});

var newList = new ListModel({
  for: "Mom",
  items: [],
  owner: ""
});
newList.save().then(console.log("saved"));

var newUser = new UserModel({
  local: {
    email: "testemail@email.com",
    password: "asdf"
  },
  lists: []
});
newUser.save().then(console.log("saved"));

var newItem = new ItemModel({
    name: "item name",
    price: 20,
    thumbnail: "http://placecage.com/200/200",
    image: "http://placecage.com/200/200",
    amazonUrl: "http://google.com",
  });
newItem.save().then(console.log("saved"));

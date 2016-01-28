
// require("./schema");
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/beacon');
var db = mongoose.connection;
var userData = require("./user_data");
var itemData = require("./item_data");
var listData = require("./list_data");

db.on("error", function(err){
  console.log("Oops! Mongo threw an error. Is `mongod` running?");
  console.log(err.message);
  process.exit();
});

db.once("open", function () {
  console.log("Connected to the database.");
  var User = require("../models/user");
  var List = require("../models/list");
  var Item = require("../models/item");

  User.remove({}).then(function(){
    forEach(userData, function(userDatum){
      return new User(userDatum).save();
    }).then(function(){
      process.exit();
    });
  });

  List.remove({}).then(function(){
    forEach(listData, function(listDatum){
      return new List(listDatum).save();
    }).then(function(){
      process.exit();
    });
  });

  Item.remove({}).then(function(){
    forEach(itemData, function(itemDatum){
      return new Item(itemDatum).save();
    }).then(function(){
      process.exit();
    });
  });
});

function forEach(collection, callback, index){
  if(!index) index = 0;
  return callback(collection[index]).then(function(){
    if(collection[index + 1]) return forEach(collection, callback, index + 1);
  });
}

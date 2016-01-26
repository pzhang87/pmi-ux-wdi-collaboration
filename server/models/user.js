// user model
var mongoose                = require('mongoose');
var passportLocalMongoose   = require('passport-local-mongoose');


var User = mongoose.Schema({

  username  : String,
  password  : String,
  firstName : String,
  lastName  : String,
  birthday  : String,

  facebook : {
    id: String,
    token: String,
    name: String,
    email: String
  }

});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);

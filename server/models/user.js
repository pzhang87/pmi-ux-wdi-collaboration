// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
  username: String,
  password: String,

  facebook : {
    id: String,
    token: String,
    name: String,
    email: String
  },
  lists: []
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);

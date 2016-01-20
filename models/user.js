var mongoose = require('mongoose');

var User = mongoose.Schema({
  local: {
    email: String,
    password: String
  },
  lists: []
})

module.exports = mongoose.model('User', User);

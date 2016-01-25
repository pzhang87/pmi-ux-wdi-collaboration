
require("../db/schema.js");
var mongoose = require("mongoose");

var ListModel = mongoose.model("List");
module.exports = ListModel;

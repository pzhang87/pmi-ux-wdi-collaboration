var mongoose = require('mongoose');
mongoose.createConnection(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/giffter');

var Schema    = mongoose.Schema,
    ObjectId  = Schema.Types.ObjectId;

//define schema for item
var ItemSchema = new Schema({
    name: String,
    price: Number,
    thumbnail: String,
    image: String,
    amazonUrl: String,
  });

//define schema for basket
var ListSchema = new Schema({
    for: String,
    created_on: { type: Date, required: true, default: Date.now },
    items: [],
    owner: String
  });

var ListModel = mongoose.model("List", ListSchema);
var ItemModel = mongoose.model("Item", ItemSchema);

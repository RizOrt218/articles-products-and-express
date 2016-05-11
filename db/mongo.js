var Mongoose = require('mongoose');

//open a connection to the test database on our locally running instance of MongoDB.
Mongoose.connect('mongodb://localhost/products_articles');
var db = Mongoose.connection;


module.exports = db;





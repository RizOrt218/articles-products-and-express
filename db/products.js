module.exports  = (function(){
  var db       = require('./mongo');
  var Mongoose = require('mongoose');
  var Schema   = Mongoose.Schema;

  //creating product schema
  var productSchema = Schema ({
    inventory   : Number,
    name        : String,
    price       : Number
  });

  //convert productSchema into a model
  var ProductMod = Mongoose.model('Product', productSchema);

  function _all () {
    return ProductMod.find();
  }

  function _getById ( productId ) {
    return ProductMod.findOne({ _id : productId });
  }

  function _add (req) { //aka insert
    var name      = req.name;
    var inventory = req.inventory;
    var price     = req.price;

    return new ProductMod({
      name     : name,
      inventory: inventory,
      price    : price
    }).save();
  }

  function _editById (productId, productOptions) {
    return ProductMod.findOneAndUpdate({ _id : productId },
    { $set : productOptions }, { new: true });
  }

  function _deleteById (productId) {
    return ProductMod.find({ _id: productId}).remove().exec();
  }

  return {
    all: _all,
    add: _add,
    getById: _getById,
    editById: _editById,
    deleteById: _deleteById
  };
}());
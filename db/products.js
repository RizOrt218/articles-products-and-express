module.exports  = (function(){
  var db = require('../db-connect.js');

  function _all () {
    return new Promise(function(resolve, reject){
      db.query("select * from products_table", true)
        .then(function(data){
          return resolve(data);
        })
        .catch(reject);
    });
  }

  function _getById (id) {
    return new Promise(function(data, reject) {
        db.query("select * from products_table where id=$1", id)
        .then(data)
        .catch(function (reject) {
            console.log(reject);
        });
    });
  }

  function _add (req) { //aka insert
    var inventory = req.inventory;
    var name = req.name;
    var price = req.price;

    return new Promise(function(data, reject) {
      db.one('insert into products_table(id, inventory, product_name, price) values(default, $1, $2, $3) returning id', [inventory, name, price])
        .then(data)
        .catch(function (reject) {
            // error;
        });
    });
  }

  function _editById (id, productOptions) {
    return new Promise(function(resolve, reject) {
      db.query("update products_table set inventory=$2, product_name=$3, price=$4 WHERE id = $1 ",[id, productOptions.inventory, productOptions.product_name, productOptions.price])
          .then(resolve)
          .catch(function (reject) {
              //error
          });
      });
  }

  function _deleteById (id) {
    return new Promise(function(resolve, reject) {
      db.none("delete from products_table where id=$1", id)
        .then(resolve)
        .catch(function(reject) {
          //error
        });
    });

  }

  return {
    all: _all,
    add: _add,
    getById: _getById,
    editById: _editById,
    deleteById: _deleteById
  };
}());
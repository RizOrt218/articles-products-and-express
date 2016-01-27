module.exports  = (function(){
  var db = require('../db-connect.js');

  function _all () {
    return new Promise(function(data, reject){
      db.query("select * from products_table", true)
        .then(data)
        .catch(reject);
    });
  }

  function _getById (id) {
    return new Promise(function(data, reject) {
        db.query("select * from products_table where id=$1", id)
        .then(data)
        .catch(function (reject) {
            // error;
        });
    });
  }

  function _add (req, callback) { //aka insert
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
    var updateP = null;
    return new Promise(function(resolve, reject) {
      db.query("update products_table set inventory=$2, product_name=$3, price=$4 WHERE id = $1 returning id, inventory, product_name, price",[id, productOptions.inventory, productOptions.product_name, productOptions.price])
          .then(resolve)
          .catch(function (reject) {
              console.log(reject);
          });
      });
  }

  // function _deleteById (id, callback) {
  //   for ( var i = 0; i < productList.length; i++) {
  //     if( productList[i].id === parseInt(id) ) {
  //       productList.splice(i,1);
  //       return callback(null);
  //     } else {
  //       callback(new Error("Can't find ID"));
  //     }
  //   }
  // }

  return {
    all: _all,
    add: _add,
    getById: _getById,
    editById: _editById
    // deleteById: _deleteById
  };
}());
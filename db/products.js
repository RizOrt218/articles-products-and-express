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
// CREATE / insert
  // db.one('insert into products_table(id, inventory, product_name, price) values(default, $1, $2, $3) returning id',
  //   [8357, 'Pumpkin Pie', '500'])
  //   .then(function (data) {
  //       console.log(data.id); // print new user id;
  //   })
  //   .catch(function (error) {
  //       console.log("ERROR:", error); // print error;
  //   });



  // function _editById (id, productOptions, callback) {
  //   var updateP = null;
  //   for ( var i = 0; i < productList.length; i++) {
  //     if( productList[i].id === parseInt(id) ) {
  //       updateP = productList[i];
  //       for(var key in productOptions) {
  //         updateP[key] = productOptions[key];
  //       }
  //         return callback(null);
  //     } else {
  //       callback(new Error("Can't find ID"));
  //     }
  //   }
  // }


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


  // READ / alter


  // UPDATE / transaction
  // db.tx(function (t) {
  //         // this = t = transaction protocol context;
  //         // this.ctx = transaction config + state context;
  //         return t.batch([
  //           t.one("insert into products_table(product_name) values($1) returning id", "John")
  //         ]);
  //     })
  //     // using .spread(function(user, event)) is best here, if supported;
  //     .then(function (data) {
  //         console.log(data[0].id); // print new user id;
  //         // console.log(data[1].id); // print new event id;
  //     })
  //     .catch(function (error) {
  //         // error;
  //     });


  // db.one("update products_table set inventory = 78 where id = $1 returning id", 2)
  //     .then(function (data) {
  //         console.log(data.id); // print new user id;
  //     })
  //     .catch(function (error) {
  //         console.log("ERROR:", error); // print error;
  //     });



  return {
    all: _all,
    add: _add,
    getById: _getById
    // editById: _editById,
    // deleteById: _deleteById
  };
}());
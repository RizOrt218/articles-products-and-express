    var promise = require('bluebird');
    var options = {
      promiseLib: promise //overriding the default promise library
    };
    var pgp = require('pg-promise')(options);
    //configure database connection
    var cn = {
      host : 'localhost', //default server
      port : 5432, //default port fro psql
      database : 'corizzy_database', //database you are connecting to.
      user : 'Corina'
    };
    //create a new db in memory
    var db = pgp(cn);

module.exports = db;
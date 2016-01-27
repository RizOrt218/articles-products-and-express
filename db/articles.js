module.exports = (function(){
  var db       = require('../db-connect.js');

  function _all () {
    return new Promise(function(resolve, reject) {
      db.query("select articles_table.*, authors_table.author " +
        "from articles_table inner join authors_table " +
        "on articles_table.fk_author_id = authors_table.id", true)
        .then(function(data){
          return resolve(data);
        })
        .catch(reject);
    });
  }

  function _getByTitle (title) {
    return new Promise(function(resolve, reject) {
      db.query('select articles_table.*, authors_table.author ' +
        'from articles_table inner join authors_table ' +
        'on articles_table.fk_author_id = authors_table.id ' +
        'where articles_table.title = $1', title)
      .then(function(data) {
        return resolve(data);
      })
      .catch(function (reject) {
        console.log(reject);
      });
    });
  }

  function _add (req) {
    var title = req.title;
    var author = req.author;
    var urlTitle = title.replace(/ /g, "%20");

    return new Promise(function(resolve, reject) {

      db.query('insert into articles_table(id, title, urlTitle) '+
        'values(default, $1, $2) returning id, title, urlTitle', [title, urlTitle])
        .then(data)
        .catch(function(reject) {
          console.log(reject);
        });
    });
  }

  function _editByTitle (title, articleOptions, callback) {
    var updateA = null;
    for ( var i = 0; i < articleList.length; i++) {
      if( articleList[i].title === title ) {
        updateA = articleList[i];
        for(var key in articleOptions) {
          updateA[key] = articleOptions[key];
        }
          return callback(null);
      } else {
        callback(new Error("Can't find title"));
      }
    }
  }


  function _deleteByTitle (title, callback) {
    for ( var i = 0; i < articleList.length; i++) {
      if( articleList[i].title === title ) {
        articleList.splice(i,1);
        return callback(null);
      } else {
        callback(new Error("Can't find title"));
      }
    }
  }

  return {
    all: _all,
    add: _add,
    getByTitle: _getByTitle,
    editByTitle: _editByTitle,
    deleteByTitle: _deleteByTitle
  };
}());

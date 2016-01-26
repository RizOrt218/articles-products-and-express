module.exports = (function(){
  var dbConnect     = require('../db-connect.js');
  var articleList = [];


  function _all () {
    return articleList;
  }

  function _getByTitle (title) {
    for(var i = 0; i < articleList.length; i++) {
      if(articleList[i].title === title){
        return articleList[i];
      }
    }
  }
  function _add (req, callback) {

    var title = req.title;
    var author = req.author;
    var urlTitle = title.replace(/ /g, "%20");

    for( var i = 0; i < articleList.length; i++ ) {
      if( articleList[i].title === title ) {
        var err = new Error("Could not create new article");
        return callback(err);
      }
    }

    var aObj = {
      'title' : title,
      'author' : author,
      'urlTitle' : urlTitle
    };

    articleList.push(aObj);
    return callback(null);
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
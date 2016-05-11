module.exports = (function(){
  // var db       = require('../db-connect.js');
  var db = require('./mongo');
  var Mongoose = require('mongoose');

  var articlesSchema = Mongoose.Schema ({
    title : String,
    author: String
  });

  var ArticlesMod = Mongoose.model('Articles', articlesSchema);


  function _all () {
    return ArticlesMod.find();
  }

  function _getByTitle (id) {
    // console.log("title", title);
    // var result = ArticlesMod.find( {title : title} );

    console.log("DBDBDBDBDB", id);
    return ArticlesMod.find( {_id : id} );
  }

  function _add (req) {
    var title    = req.title;
    var author   = req.author;

      // console.log("consoleLogging", req);
    return new ArticlesMod({
      title   : title,
      author  : author,
    }).save();
  }

  function _editByTitle (title, articleOptions) {
    return ArticlesMod.findOneAndUpdate({ title : title },
    { $set : articleOptions }, { new : true });
  }


  function _deleteByTitle (title) {
    return ArticlesMod.find({ title: title}).remove().exec();
  }

  return {
    all: _all,
    add: _add,
    getByTitle: _getByTitle,
    editByTitle: _editByTitle,
    deleteByTitle: _deleteByTitle
  };
}());

var Articles = require('./../db/articles.js');
var path     = require('path');
var express  = require('express');
var router   = express.Router();
var fs       = require('fs');
var prettyjson = require( 'prettyjson' );
//NOTE WE MUST USE FS TO WRITE TO A FILE
//FS.APPENDFILE

//MIDDLEWARE
router.use(function(req, res, next) {
  var articleDateLog = new Date();
  var day      = articleDateLog.getDate();
  var month    = articleDateLog.getMonth() + 1;
  var year     = articleDateLog.getFullYear() + ".log";
  var fullDate = month + '.' + day + '.' + year;
  var zeHeader = req.headers;


  var prettyZeHeader = Object.keys(zeHeader).reduce(function ( string, c ){
    var prettyMeAlready = zeHeader[c];
    return string + c + " : " + zeHeader[c] + "\n";
  }, "");

  var logData = {
    METHOD : req.originalMethod,
    URL : req.originalUrl,
    TIMESTAMP : new Date(),
    HEADERS : prettyZeHeader
  };

  // this will take object and make it human readable
  var prettyLogData = Object.keys(logData).reduce(function ( string, c ){
    var prettyMeAlready = logData[c];
    return string + c + " : " + prettyjson.render(logData[c]) + "\n";
  }, "");

  //if file not created
  fs.appendFile( path.join(process.cwd(), 'logs', fullDate), prettyLogData, "utf8", function (err) {
    if (err) {
      return new Error( 'Can\'t write file!' );
    }
    next();
    });
  }); // end of fs.access ('../lo


// end middleware

router.route('/')
  .get(function(req, res) {
    Articles.all()
    .then(function(data) {
      res.render('articles/index', {
        articles: data
      });
    })
    .catch(function(err){
      res.send(err);
    });
  })

  .post(function (req, res) {
    Articles.add(req.body)
      .then(function(data) {
        res.redirect('/articles/');
      })
      .catch(function(err) {
        res.send(err);
      });
  });

router.route('/new')
  .get(function(req,res) {
    res.render('articles/new');
  });

router.route('/:title/edit')
  .get(function(req, res) {
    res.render('articles/edit', {
      articles: Articles.getByTitle( req.params.title )
    });
  });

router.route('/:title')
  .get(function(req, res) {
    Articles.getByTitle(req.params.title)
    .then(function(data) {
      res.render('articles/single', {
        article:data[0]
      });
    })
    .catch(function(err) {
      res.send(err);
    });
  })

  .put(function (req, res) {

    Articles.editByTitle( req.params.title, req.body, function(err) {
      if(err) return res.send({success: false, message: err.message});

      return res.redirect('/articles/' + req.body.title);
    });
  })

  .delete(function (req, res) {
    Articles.deleteByTitle( req.params.title, function(err) {
      if(err) return res.send({success: false, message: err.message});

      return res.redirect('/articles/');
  });
})
;

module.exports = router;

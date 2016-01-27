var Products   = require('./../db/products.js');
var path       = require('path');
var express    = require('express');
var router     = express.Router();
var fs         = require('fs');
var prettyjson = require( 'prettyjson' );
//NOTE WE MUST USE FS TO WRITE TO A FILE
//FS.APPENDFILE

//MIDDLEWARE
router.use(function(req, res, next) {
  var fileName = new Date();
  var day      = fileName.getDate();
  var month    = fileName.getMonth() + 1;
  var year     = fileName.getFullYear() + ".log";
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
    Products.all()
    .then(function(data){
      res.render('products/index', {
      products: data
    });
   })
    .catch(function(err){
      res.send(err);
    });
  })
  .post(function (req, res) {
    Products.add(req.body)
    .then(function(data) {
      res.redirect('/products/');
    })
    .catch(function(err) {
      res.send(err);
    });
  });

//when client clicks on 'new' btn
//this renders 'products/new' page
router.route('/new')
  .get(function(req, res) {
    res.render('products/new');
  });

//when client clicks on edit btn
//this renders page where it gives you option
//to input different values of the same id
router.route('/:id/edit')
  .get(function(req, res) {
    Products.getById(req.params.id)
    .then(function(data) {
      console.log(data);
      res.render('products/edit', {
        product:data[0]
      });
    })
    .catch(function(err) {
      res.send(err);
    });
    // Products.editById(req.params.id)
    // .then(function(data) {
      // res.render('products/edit', {
      //   item: data
      // });
    // })
    // .catch(function(err) {
    //   res.send(err);
    // });
  });


router.route('/:id')
  .get(function(req, res) {
    Products.getById(req.params.id)
    .then(function(data){
        console.log(data);
      res.render('products/single', {
        product: data
      });
    })
    .catch(function(err) {
      res.send(err);
    });
  })

  .put(function (req, res) {
    Products.editById( req.params.id, req.body )
      .then(function(data) {
        console.log(data, 'hi');
        // res.get('/products/');
        res.render('products/single', {
          product: data
        });
      })
      .catch(function(err) {
      console.log('sumting wrong');
        res.send(err);
      });
  })

.delete(function(req,res) {
  Products.deleteById( req.params.id )
  .then(function(){
    return res.redirect('/products');
  })
  .catch(function(err) {
    res.send(err);
  });
});

module.exports = router;


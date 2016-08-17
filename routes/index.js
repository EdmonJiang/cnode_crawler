var express = require('express');
var router = express.Router();
var cnode = require('../spider/cnode.js');
var url = require('url');
var qs = require('querystring');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('list', { title: 'list' });
  var cnodeUrl = 'https://cnodejs.org/';
  if(req.query){
    cnodeUrl = url.resolve(cnodeUrl, req.url);
    console.log(cnodeUrl);
  }
  
  var c = new cnode(cnodeUrl)
  c.getData(res, next);
  //console.log(c.cnodeUrl);
 
});

module.exports = router;

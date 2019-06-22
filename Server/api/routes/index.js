var express = require('express');
var router = express.Router();

const ds18b20 = require('../midleware/ds18b20');

var test = require('./test.json');

/* GET home page. */
router.get('/', function(req, res, next) {


  //res.render('index', { title: 'Express' });
  console.log(ds18b20.temp);
  res.send(test);
});

module.exports = router;

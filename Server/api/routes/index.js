var express = require('express');
var router = express.Router();

const ds18b20 = require('../midleware/ds18b20');
const dht11 = require('../midleware/dht11');

var test = require('./test.json');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.status(200).json({
    message: ds18b20.temp
  });
});

router.get('/dht11', function(req, res, next) {

 res.status(200).json({
   message: dht11.temp
 });
});

module.exports = router;

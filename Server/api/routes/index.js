var express = require('express');
var router = express.Router();

const ds18b20 = require('../midleware/ds18b20');
const dht11 = require('../midleware/dht11');

var test = require('./test.json');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
  console.log(ds18b20.temp);
  res.write(ds18b20.temp);
});

router.get('/dht11', function(req, res, next) {

  res.render('index', { title: 'Express' });
  console.log(dht11.temp);
  res.write(dht11.temp);
});

module.exports = router;

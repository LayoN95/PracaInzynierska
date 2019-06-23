var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const DHT11 = require('../models/dht11');

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
  DHT11
  .find()
  .select('_id temperature date')
  .exec()
  .then(docs => {
    res.status(200).json({
      count: docs.length,
      orders: docs.map(doc => {
        return {
          _id: doc.id,
          temperature: doc.temperature,
          date: doc.date
        }
      })
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
 /*res.status(200).json({
   message: ("Wilgotność: " + dht11.humid + " Temperatura: " + dht11.temp)
 });*/
});

module.exports = router;

var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const DHT11 = require('../models/dht11');
const DS18B20 = require('../models/ds18b20');
const PIR = require('../models/pirHCSR501');
const THERMOSTAT = require('../models/thermostat');


const schedule = require('../midleware/schedule');
const ds18b20 = require('../midleware/ds18b20');
const dht11 = require('../midleware/dht11');
const pir = require('../midleware/pirHCSR501');
const leds = require('../midleware/leds');


var test = require('./test.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  DS18B20.find().sort({_id: -1 }).limit(24)  .exec()
  .then(docs => {
    res.status(200).json({
      count: docs.length,
      ds18b20: docs.map(doc => {
        return {
          _id: doc.id,
          temperature: doc.temperature,
          date: doc.date
        }
      })
    });
  })
  /*.findOne()
  .select('_id temperature date')
  .exec()
  .then(docs => {
    res.status(200).json({
      count: docs.length,
      ds18b20: docs.map(doc => {
        return {
          _id: doc.id,
          temperature: doc.temperature,
          date: doc.date
        }
      })
    });
  })
  .catch(err => {
    error: err
  });*/
  //res.send(test);
  /*res.status(200).json({
    "message": ds18b20.temp
  });*/
});

router.get('/dht11', function(req, res, next) {
  DHT11
  .find().sort({_id: -1 }).limit(24)
  .select('_id temperature humidity date')
  .exec()
  .then(docs => {
    res.status(200).json({
      count: docs.length,
      records: docs.map(doc => {
        return {
          _id: doc.id,
          temperature: doc.temperature,
          humidity: doc.humidity,
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

router.get('/pir', function(req, res, next) {
  res.status(200).json({
    message: (pir.count)
  });
});

router.post('/leds/:ledId/:value', (req, res, next) => {
  if(req.params.value == '1')
  {
    leds.led(req.params.ledId, 1)
    console.log("led ID: " + req.params.ledId + " value: " + req.params.value);
    res.status(200).json({
      message: ("Uruchomiono diodę")
    });
  } else {
    leds.led(req.params.ledId, 0)
    console.log("led ID: " + req.params.ledId + " value: " + req.params.value);
    res.status(200).json({
      message: ("Wyłączono diodę")
    });
  }
});

router.post('/schedule/:hour/:min/:state', (req, res, next) => {
  //req.params.hour = schedulde.hour;
  //req.params.min = schedulde.min;
  console.log("hour:" + req.params.hour + " min: " + req.params.min);
  schedule.schedule1(req.params.min, req.params.hour, req.params.state);
  res.status(200).json({
    message: ("Submit: " + req.params.min + " " + req.params.hour + " " + req.params.state)
  });
});

router.get('/alarm', (req, res, next) => {
  res.status(200).json({
    message: (pir.alarm)
  });
});

router.post('/reset', (req, res, next) => {
  PIR.findById('5d4c5a3d5af4f10b07a9bbde', function(err, doc) {
    if (err) {
        console.log("erorr not found");
    }
    doc.state = 0;
    doc.save();
})
  leds.led(20, 0);
  res.status(200).json({
    message: (pir.alarm)
  });
});

router.post('/thermostat/:temp', (req, res, next) => {
  THERMOSTAT.findById('5d4c5a3d5af4f10b07a9bbde', function(err, doc) {
    if (err) {
        console.log("erorr not found");
    }
    doc.temperature = req.params.temp;
    doc.save();
}) 
});



module.exports = router;

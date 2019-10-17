var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const DHT11 = require('../models/dht11');
const DS18B20 = require('../models/ds18b20');
const PIR = require('../models/pirHCSR501');
const THERMOSTAT = require('../models/thermostat');
const DEVICE_STATUS = require('../models/devicesStatus');



const schedule = require('../midleware/schedule');
const ds18b20 = require('../midleware/ds18b20');
const dht11 = require('../midleware/dht11');
const pir = require('../midleware/pirHCSR501');
const leds = require('../midleware/leds');
const thermostat = require('../midleware/thermostat');
const servoControl = require('../midleware/servo');
const hcsr = require('../midleware/hcsr');



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
  var columnName;

  if (req.params.ledId == 18)
  {
    columnName = `room_1`;
  } else if(req.params.ledId == 6) {
    columnName = `room_2`;
  } else if(req.params.ledId == 17) {
    columnName = `outdoor`;
  }
  //let columnName = `.room_${req.params.ledId}`;
  
  if(req.params.value == '1')
  {
    leds.led(req.params.ledId, 1)
    //console.log("led ID: " + req.params.ledId + " value: " + req.params.value);
    DEVICE_STATUS.findById('5d8a5d38456fa304cebf8f4a', function(err, doc) {
      if (err) {
          console.log("erorr not found");
      }
      console.log(columnName);
      doc[columnName] = req.params.value;
      doc.save();
     })
    res.status(200).json({
      message: ("Uruchomiono diodę")
    });
  } else {
    leds.led(req.params.ledId, 0)
    console.log("led ID: " + req.params.ledId + " value: " + req.params.value);

    DEVICE_STATUS.findById('5d8a5d38456fa304cebf8f4a', function(err, doc) {
      if (err) {
          console.log("erorr not found");
      }
      console.log(columnName);
      doc[columnName] = req.params.value;
      doc.save();
      })

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
  PIR.findById('5d4c5a3d5af4f10b07a9bbde', function(err, doc) {
    if (err) {
        console.log("erorr not found");
    }
    res.status(200).json({
      message: (doc.state)
    });
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
  THERMOSTAT.findById('5d4c6723b9388f0ed86b1da3', function(err, doc) {
    if (err) {
        console.log("erorr not found");
    }
    doc.temperature = req.params.temp;
    doc.save();
    console.log("BEFORE Thermostat temp " + thermostat.temp);

    thermostat.setTemp(req.params.temp);
    console.log("Thermostat temp " + thermostat.temp);
    res.status(200).json({
      message: (req.params.temp)
    });
}) 
});

router.get('/thermostat', (req, res, next) => {
  THERMOSTAT.findById('5d4c6723b9388f0ed86b1da3', function(err, doc) {
    if (err) {
        console.log("erorr not found");
    }
    
    res.status(200).json({
      message: (doc.temperature)
    });
}) 
});

router.post('/servo/:value', (req, res, next) => {
  if(req.params.value >= 600 && req.params.value <= 2500) {
    servoControl.servoControl(req.params.value);
  }
  res.status(200).json({
    message: (req.params.value)
  });
});

router.get('/devicestatus', (req, res, next) => {
  DEVICE_STATUS.find().exec()
  .then(docs => {
    res.status(200).json({
      deviceStatus: docs.map(doc => {
        return {
          _id: doc.id,
          state: doc.state,
          window_open: doc.window_open,
          hcsr04: doc.hcsr04,
          date: doc.date
        }
      })
    });
  })
})

module.exports = router;

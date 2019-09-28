const Gpio = require('pigpio').Gpio;
const mongoose = require('mongoose');
const devicesSchema = require('../models/devicesStatus');
 
const motor = new Gpio(13, {mode: Gpio.OUTPUT});
 
let pulseWidth = 1550; 

function servoControl(value) {
    motor.servoWrite(value);

    devicesSchema.findById('5d8a5d38456fa304cebf8f4a', function(err, doc) {
      if (err) {
          console.log("erorr not found");
      }
      doc.window_open = value;
      doc.save();
  })
}

/*setInterval(() => {
    motor.servoWrite(pulseWidth);
 
  pulseWidth += increment;
  if (pulseWidth >= 2400) {
    increment = -200;
  } else if (pulseWidth <= 600) {
    increment = 200;
  }
}, 100); */

module.exports.servoControl = servoControl;
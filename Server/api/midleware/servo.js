const Gpio = require("pigpio").Gpio;
const mongoose = require("mongoose");
const devicesSchema = require("../models/devicesStatus");

const motor = new Gpio(13, { mode: Gpio.OUTPUT });


function servoControl(value) {
  motor.servoWrite(value);
  devicesSchema.findById("5d8a5d38456fa304cebf8f4a", function(err, doc) {
    if (err) {
      console.log("erorr not found");
    }
    doc.window_open = value;
    doc.save();
  });
}


module.exports.servoControl = servoControl;

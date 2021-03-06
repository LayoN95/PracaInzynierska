const Gpio = require("onoff").Gpio;
const mongoose = require("mongoose");
const devicesSchema = require("../models/devicesStatus");
var socket = require("socket.io-client")(process.env.PATH);

function led(ledId, value) {
  switch (ledId) {
    case "18": {
      //console.log("inside LED Case 18: ROOM 1");
      socket.emit("LED_18", { state: value });
      break;
    }
    case "6": {
      //console.log("inside LED Case 6: ROOM 2");
      socket.emit("LED_6", { state: value });
      break;
    }
    case "21": {
      //console.log("inside LED Case 21: OUTDOOR");
      socket.emit("LED_21", { state: value });
      break;
    }
  }
  var LED = new Gpio(ledId, "out");
  devicesSchema.findById("5d8a5d38456fa304cebf8f4a", function(err, doc) {
    if (err) {
      console.log("erorr not found");
    }
    doc.state = value;
    doc.save();
  });

  LED.writeSync(value);
}
module.exports.led = led;

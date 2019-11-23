const Gpio = require("onoff").Gpio;
var RELAY = new Gpio(25, "out");

function airConditioner(value) {
  RELAY.writeSync(value);
}

module.exports.airConditioner = airConditioner;

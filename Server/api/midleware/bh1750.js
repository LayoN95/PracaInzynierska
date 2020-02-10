var BH1750 = require("bh1750");
var socket = require("socket.io-client")("http://192.168.1.48:3000");
var Gpio = require("onoff").Gpio;
var LIGHT = new Gpio(17, 'out');
var LED =  require("leds");

var light = new BH1750({
  address: 0x23,
  device: "/dev/i2c-1",
  command: 0x10,
  length: 2
});
var lightRead = 0;
setInterval(function() {
  light.readLight(function(err, value) {
    if (err) {
      console.log("light error: " + err);
      throw err;
    } else {
      socket.emit("BH1750", { light: value.toFixed(1) });
      lightRead = value.toFixed(1);
      if (value < 13) {
        LIGHT.writeSync(0);
        LED.LED(21,1);
      } else {
        LIGHT.writeSync(1);
        LED.LED(21,0);
      }
      module.exports.lightRead = lightRead;
    }
  });
}, 30000);
module.exports.lightRead = lightRead;

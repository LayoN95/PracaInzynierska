var BH1750 = require('bh1750');
var LEDS = require('../midleware/leds');
var socket = require('socket.io-client')('http://192.168.1.48:3000');

var light = new BH1750({
     address: 0x23,
    device: '/dev/i2c-1',
    command: 0x10,
    length: 2
});
var lightRead = 0;
setInterval(function() {
light.readLight(function(err, value){
    if (err) {
        console.log("light error: " + err);
        throw err;
    } else {
        //console.log("light value is: ", value.toFixed(1), "lx");

        socket.emit('BH1750', { light: value.toFixed(1)});
        var ledId = "21";

        lightRead = value.toFixed(1);
        if (value < 13){
            LEDS.led(ledId,1);
            //console.log("Turn light on!");
        }else {
            LEDS.led(ledId,0);
            //console.log("Turn light off!");
        }
        module.exports.lightRead = lightRead;
    }
});
}, 30000);
module.exports.lightRead = lightRead;
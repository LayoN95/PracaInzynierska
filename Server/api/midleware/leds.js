const Gpio = require('onoff').Gpio;
const mongoose = require('mongoose');
const devicesStatus = ('../models/devicesStatus');

    var value = false;
    var ledId = 0;
    function led(ledId, value) {
        console.log("FUNKCJA DZIALA " + ledId + " " + value);
        var LED = new Gpio(ledId, 'out'); 
        devicesStatus.findById('5d8a46ad1c9d440000c541e3', function(err, doc) {
            if (err) {
                console.log("erorr not found");
            }
            doc.status = value;
            doc.save();

        })
        LED.writeSync(value);


    }
module.exports.led = led;

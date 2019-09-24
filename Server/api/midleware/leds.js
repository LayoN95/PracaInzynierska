const Gpio = require('onoff').Gpio;
const mongoose = require('mongoose');
const devicesStatusSchema = ('../models/devicesStatus');

    var value = false;
    var ledId = 0;
    function led(ledId, value) {
        console.log("FUNKCJA DZIALA " + ledId + " " + value);
        var LED = new Gpio(ledId, 'out'); 
        
        LED.writeSync(value);

       /* devicesStatusSchema.findById('5d8a45091c9d440000c541df', function(err, doc) {
            if (err) {
                console.log("erorr not found");
            }
            doc.status = value;
            doc.save();

        })*/
    }
module.exports.led = led;

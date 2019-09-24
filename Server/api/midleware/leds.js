const Gpio = require('onoff').Gpio;
const mongoose = require('mongoose');
const devicesSchema = require('../models/devicesStatus');

    var value = false;
    var ledId = 0;
    function led(ledId, value) {
        console.log("FUNKCJA DZIALA " + ledId + " " + value);
        var LED = new Gpio(ledId, 'out'); 
        /*devicesSchema.findById('5d8a5b771c9d4400002e3fa9', function(err, doc) {
            if (err) {
                console.log("erorr not found");
            }
            doc.state = value;
            doc.save();
        })*/
        const DEVICEstatus = devicesSchema({
            _id: mongoose.Types.ObjectId(),
            name: "light2",
            state: value

        });
        DEVICEstatus.save();

        LED.writeSync(value);



    }
module.exports.led = led;

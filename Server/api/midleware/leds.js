const Gpio = require('onoff').Gpio;
const mongoose = require('mongoose');
const devicesSchema = require('../models/devicesStatus');

    var value = false;
    var ledId = 0;
    function led(ledId, value) {
        console.log("FUNKCJA DZIALA " + ledId + " " + value);
        var LED = new Gpio(ledId, 'out'); 
        devicesSchema.findById('5d8a5d38456fa304cebf8f4a', function(err, doc) {
            if (err) {
                console.log("erorr not found");
            }
            doc.state = value;
            doc.save();
        })

        LED.writeSync(value);
        switch(ledId) {
            case "18": 
            {
              console.log("Case 18: ROOM 1");
              socket.emit('LED_18', {state: value});
              break;
            }
            case "6": 
            {
              console.log("Case 6: ROOM 2");
              socket.emit('LED_6', {state: value});  
              break;
            }
            case "21": 
            {
              console.log("Case 21: OUTDOOR");
              socket.emit('LED_21', {state: value});
              break;
            }
          }


    }
module.exports.led = led;

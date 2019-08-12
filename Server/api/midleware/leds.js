const Gpio = require('onoff').Gpio;

    var value = false;
    var ledId = 0;
    function led(ledId, value) {
        console.log("FUNKCJA DZIALA " + ledId + " " + value);
        var LED = new Gpio(ledId, 'out'); 
        
        LED.writeSync(value);
    }
module.exports.led = led;

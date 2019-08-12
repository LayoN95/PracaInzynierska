const Gpio = require('onoff').Gpio;
var ALARM = new Gpio(20, 'out');
var alarm = setInterval(blinking, 250);

    var value = false;
    var ledId = 0;
    function led(ledId, value) {
        console.log("FUNKCJA DZIALA " + ledId + " " + value);
        var LED = new Gpio(ledId, 'out'); 
        
        LED.writeSync(value);
    }

    function blinking() {
        if (ALARM.readSync() === 0) {
            ALARM.writeSync(1);
        } else {
            ALARM.writeSync(0);
        }
    }
    function endBlink() {
        clearInterval(alarm);
        ALARM.writeSync(0);
        ALARM.unexport();
    }

module.exports.alarm = alarm;
module.exports.endBlink = endBlink;
module.exports.led = led;

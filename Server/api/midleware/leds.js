const Gpio = require('onoff').Gpio;
ALARM = new Gpio(20, 'out');

    var value = false;
    var ledId = 0;
    function led(ledId, value) {
        console.log("FUNKCJA DZIALA " + ledId + " " + value);
        var LED = new Gpio(ledId, 'out'); 
        
        LED.writeSync(value);
    }

const alarm = setInterval(function() {
 
    if (value = false) {
        ALARM.writeSync(1);
    } else {
        ALARM.writeSync(0);
    }
}, 1000);

function resetAlarm() {
    clearInterval(alarm);
    ALARM.writeSync(0);
}
module.exports.led = led;
module.exports.alarm = alarm;
module.exports.resetAlarm = resetAlarm;
var Gpio = require('onoff').Gpio;
LED = new Gpio(21, 'out');

var x = false;

    if(x == true) {
        LED.write(false);
        console.log('Wylaczono diode');
    } else {
        LED.write(true);
        console.log('Wlaczono diode');
    }




var Gpio = require('onoff').Gpio;
LED = new Gpio(21, 'out');

var x = false;

    if(x == true) {
        LED.write(false);
        console.log('Wlaczono diode');
    } else {
        LED.write(true);
        console.log('Wylaczono diode');
    }




var Gpio = require('onoff').Gpio;
LED = new Gpio(20, 'out');

var x = true;

setInterval(function (){
    if(x == true) {
        LED.write(false);
    } else {
        LED.write(true);
    }


},1000);

const Gpio = require('onoff').Gpio;


    var value = false;

    function led(ledId, value) {
        const LED = new Gpio(ledId, 'out'); // gpio 4 as out
        console.log("FUNKCJA DZIALA");
        LED.writeSync(value);
    }
module.exports.led = led;

 // making the gpio 4 on. Will turn LED on
  
/*function switchOff(){
  LED.writeSync(0); // making the gpio 4 off. Will turn LED off
  LED.unexport(); // Unexport GPIO to free resources
}
 
setTimeout(switchOff, 10000);*/
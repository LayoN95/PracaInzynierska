const Gpio = require('pigpio').Gpio;
 
const motor = new Gpio(13, {mode: Gpio.OUTPUT});
 
let pulseWidth = 1550; 

function servoControl(value) {
    motor.servoWrite(value);
}

setInterval(() => {
    motor.servoWrite(pulseWidth);
 
  /*pulseWidth += increment;
  if (pulseWidth >= 2400) {
    increment = -200;
  } else if (pulseWidth <= 600) {
    increment = 200;
  }*/
}, 100); 

module.exports.servoControl = servoControl;
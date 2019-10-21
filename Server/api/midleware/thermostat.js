const mongoose = require('mongoose');
const ds18b20 = require('./ds18b20');
const Gpio = require('onoff').Gpio;
var RELAY = new Gpio(25, 'out');

var temp;
function setTemp(setTemp){
    temp = setTemp;
    console.log("Temp after setTemp()" + temp);
}
setInterval(function () {
console.log(`DS18B20 Temperature ${ds18b20.temp}`);
console.log(`Thermostat SET temperature ${temp}`);

if (ds18b20.temp < temp) {
    console.log("Turn on the heater.");
    RELAY.writeSync(0);
} else if (ds18b20.temp >= temp) {
    console.log("Turn off the heater");
    RELAY.writeSync(1);

}}, 60000);

module.exports.setTemp = setTemp;
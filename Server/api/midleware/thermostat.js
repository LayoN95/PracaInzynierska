const mongoose = require('mongoose');
const ds18b20 = require('./ds18b20');

var temp;

setInterval(function () {
console.log(`DS18B20 Temperature ${ds18b20.temp}`);
console.log(`Thermostat SET temperature ${temp}`);
if (ds18b20.temp < temp) {
    console.log("Turn on the heater.");
} else if (ds18b20.temp >= temp) {
    console.log("Turn off the heater");
}}, 15000);

module.exports.temp = temp;
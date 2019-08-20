const mongoose = require('mongoose');
const ds18b20 = require('./ds18b20');

var temp = 27;

setInterval(function () {
console.log(ds18b20.temp);

if (temp < ds18b20.temp) {
    console.log("Turn on the heater.");
} else if (temp => ds18b20.temp) {
    console.log("Turn off the heater");
}}, 15000);

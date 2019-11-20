const mongoose = require('mongoose');
const ds18b20 = require('./ds18b20');
var socket = require('socket.io-client')('http://192.168.1.48:3000');



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
    socket.emit('heater_turn_on', {value: true});
} else if (ds18b20.temp >= temp) {
    console.log("Turn off the heater");
    console.log("turn air conditioner off");
    socket.emit('heater_turn_off', {value: false});
    socket.emit('air_conditioner_turn_off', {value: false});
} else if (ds18b20.temp > temp){
    console.log("Turn air conditioner on");
    socket.emit('air_conditioner_turn_on', {value: true});
}}, 60000);

module.exports.setTemp = setTemp;
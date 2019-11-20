const mongoose = require('mongoose');
const ds18b20 = require('./ds18b20');
var socket = require('socket.io-client')('http://192.168.1.48:3000');
const DEVICE_STATUS = require('../models/devicesStatus');



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
    
    DEVICE_STATUS.findById('5d8a5d38456fa304cebf8f4a', function(err, doc) {
        if (err) {
            console.log("erorr not found");
        }
        doc.radiator = true;
        doc.save();
       })
       DEVICE_STATUS.findById('5d8a5d38456fa304cebf8f4a', function(err, doc) {
        if (err) {
            console.log("erorr not found");
        }
        doc.air_conditioner = false;
        doc.save();
       })

} else if (ds18b20.temp == temp) {
    console.log("Turn off the heater");
    console.log("turn air conditioner off");
    socket.emit('heater_turn_off', {value: false});
    socket.emit('air_conditioner_turn_off', {value: false});

    DEVICE_STATUS.findById('5d8a5d38456fa304cebf8f4a', function(err, doc) {
        if (err) {
            console.log("erorr not found");
        }
        doc.air_conditioner = false;
        doc.save();
       })

    DEVICE_STATUS.findById('5d8a5d38456fa304cebf8f4a', function(err, doc) {
        if (err) {
            console.log("erorr not found");
        }
        doc.radiator = false;
        doc.save();
       })

} else if (ds18b20.temp > temp){
    console.log("Turn air conditioner on");
    socket.emit('air_conditioner_turn_on', {value: true});
    
    DEVICE_STATUS.findById('5d8a5d38456fa304cebf8f4a', function(err, doc) {
        if (err) {
            console.log("erorr not found");
        }
        doc.air_conditioner = true;
        doc.save();
       })
       DEVICE_STATUS.findById('5d8a5d38456fa304cebf8f4a', function(err, doc) {
        if (err) {
            console.log("erorr not found");
        }
        doc.radiator = false;
        doc.save();
       })
}}, 60000);

module.exports.setTemp = setTemp;
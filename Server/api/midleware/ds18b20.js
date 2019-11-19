const ds18b20 = require('ds18b20-raspi');
const ds18b20Schema = require('../models/ds18b20');
const mongoose = require('mongoose');
var socket = require('socket.io-client')('http://192.168.1.48:3000');


var temp = 0;

var schedule = require('node-schedule');



setInterval(function () {

    ds18b20.readSimpleC((err, temperature) =>{
        if (err) {
            console.log(err);
            console.log("Brak urządzenia");
        } else {

            socket.emit('DS18B20', { temp: temperature.toFixed(1)});
            console.log("SOCKET EMIT DS18B20: " + temperature);

        }
    });
}, 10000);
 
var rule = new schedule.RecurrenceRule();

rule.minute = [0,15,30,45];
 
var j = schedule.scheduleJob(rule, function(){
    ds18b20.readSimpleC((err, temperature) =>{
        if (err) {
            console.log(err);
            console.log("Brak urządzenia");
        } else {


            console.log("temperature" + temperature);
            temp = temperature;
            console.log("temp:" + temp);
            module.exports.temp = temp;

        }
    });
  const DS18B20schema = ds18b20Schema({
    _id: mongoose.Types.ObjectId(),
    temperature: temp
});
if (temp!=0){DS18B20schema.save();}
});
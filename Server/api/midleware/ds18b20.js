const ds18b20 = require('ds18b20-raspi');
const ds18b20Schema = require('../models/ds18b20');
const mongoose = require('mongoose');
var temp = 0;

var schedule = require('node-schedule');



setInterval(function () {

    ds18b20.readSimpleC((err, temperature) =>{
        if (err) {
            console.log(err);
            console.log("Brak urządzenia");
        } else {
            const DS18B20schema = ds18b20Schema({
                _id: mongoose.Types.ObjectId(),
                temperature: temperature
            });
            DS18B20schema.save();

            console.log("temperature" + temperature);
            temp = temperature;
            console.log("temp:" + temp);
            module.exports.temp = temp;

        }
    });
}, 900000); 
 
var rule = new schedule.RecurrenceRule();

rule.minute = [0,15,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,45];
 
var j = schedule.scheduleJob(rule, function(){
  console.log('Today is recognized by Rebecca Black!');

});
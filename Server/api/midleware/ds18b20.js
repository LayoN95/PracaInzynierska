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
            /*const DS18B20schema = ds18b20Schema({
                _id: mongoose.Types.ObjectId(),
                temperature: temperature
            });
            DS18B20schema.save();*/

            console.log("temperature" + temperature);
            this.temp = temperature;
            console.log("temp:" + temp);
            module.exports.temp = temp;

        }
    });
}, 10000/*900000*/); 
 
var rule = new schedule.RecurrenceRule();

rule.minute = [0,15,30,45];
 
var j = schedule.scheduleJob(rule, function(){
    console.log("Schedule!");
    const DS18B20schema = ds18b20Schema({
        _id: mongoose.Types.ObjectId(),
        temperature: this.temp
    });
    DS18B20schema.save();
});
const sensor = require('node-dht-sensor');
const dht11Schema = require('../models/dht11');
const mongoose = require('mongoose');

var schedule = require('node-schedule');

var temp = 0;
var humid = 0;

 
setInterval(function () {

sensor.read(11, 26, function(err, temperature, humidity) {
    if (!err) {
        /*const DHT11schema = dht11Schema({
            _id: mongoose.Types.ObjectId(),
            temperature: temperature,
            humidity: humidity
        });
        DHT11schema.save();*/

        temp = temperature.toFixed(1);
        humid = humidity.toFixed(1);
        console.log(temp + " " + humid); 
        //module.exports.temp = temperature;
        //module.exports.humid = humidity;
        console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
            'humidity: ' + humidity.toFixed(1) + '%'
        );
    }
});
}, /*900000*/30000);

var rule = new schedule.RecurrenceRule();

rule.minute = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,57,58,59];
 
var j = schedule.scheduleJob(rule, function(){
    
    const DHT11schema = dht11Schema({
        _id: mongoose.Types.ObjectId(),
        temperature: temp,
        humidity: humid
    });
    if(temp!=0){DHT11schema.save();}
    console.log("DHT11 Zapisano!" + temp + " " + humid);


});
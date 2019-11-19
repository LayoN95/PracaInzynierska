const sensor = require('node-dht-sensor');
const dht11Schema = require('../models/dht11');
const mongoose = require('mongoose');
var socket = require('socket.io-client')('http://192.168.1.48:3000');

var schedule = require('node-schedule');

var temp = 0;
var humid = 0;

 
setInterval(function () {

sensor.read(11, 26, function(err, temperature, humidity) {
    if (!err) {
        temp = temperature.toFixed(1);
        humid = humidity.toFixed(1);
        module.exports.temp = temperature;
        module.exports.humid = humidity;
        socket.emit('DHT11', { temp: temperature, humid: humidity});

    }
});
}, 60000);

var rule = new schedule.RecurrenceRule();

rule.minute = [0,15,30,45];
 
var j = schedule.scheduleJob(rule, function(){
    
    sensor.read(11, 26, function(err, temperature, humidity) {
        if (!err) {
            temp = temperature.toFixed(1);
            humid = humidity.toFixed(1);
            //console.log(temp + " " + humid); 
            module.exports.temp = temperature;
            module.exports.humid = humidity;
            //console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
            //    'humidity: ' + humidity.toFixed(1) + '%'
           // );
        }
    });
    const DHT11schema = dht11Schema({
        _id: mongoose.Types.ObjectId(),
        temperature: temp,
        humidity: humid
    });
    if(temp!=0){DHT11schema.save();}
    console.log("DHT11 Zapisano!" + temp + " " + humid);


});
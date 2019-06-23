const sensor = require('node-dht-sensor');
const dht11Schema = require('../models/dht11');
const mongoose = require('mongoose');

var temp = 0;
var humid = 0;
 
setInterval(function () {

sensor.read(11, 26, function(err, temperature, humidity) {
    if (!err) {
        const DHT11schema = dht11Schema({
            _id: mongoose.Types.ObjectId(),
            temperature: temperature,
            humidity: humidity
        });
        DHT11schema.save();

        module.exports.temp = temperature;
        module.exports.humid = humidity;
        console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
            'humidity: ' + humidity.toFixed(1) + '%'
        );
    }
});
}, 10000);
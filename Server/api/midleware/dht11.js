const sensor = require('node-dht-sensor');
const dht11Schema = require('../models/dht11');

var temp = 0;
var humid = 0;
 
setInterval(function () {

sensor.read(11, 26, function(err, temperature, humidity) {
    if (!err) {
        const dht11Schema = dht11Schema({
            _id: mongoose.Types.ObjectId(),
            temperature: temperature
        });
        dht11Schema.save();

        module.exports.temp = temperature;
        module.exports.humid = humidity;
        console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
            'humidity: ' + humidity.toFixed(1) + '%'
        );
    }
});
}, 10000);
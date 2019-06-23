const ds18b20 = require('ds18b20-raspi');
const ds18b20Schema = require('../models/dht11');
const mongoose = require('mongoose');
var temp = 0;



setInterval(function () {

    ds18b20.readSimpleC((err, temperature) =>{
        if (err) {
            console.log(err);
            console.log("Brak urządzenia");
        } else {
            const schema = ds18b20Schema({
                _id: mongoose.Types.ObjectId(),
                temperature: temperature
            });
            schema.save();

            console.log("temperature" + temperature);
            temp = temperature;
            console.log("temp:" + temp);
            module.exports.temp = temp;

        }
    });
}, 10000); 
 

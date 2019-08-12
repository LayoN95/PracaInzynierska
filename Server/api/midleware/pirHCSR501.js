var Gpio = require('onoff').Gpio,
    pir = new Gpio(19, 'in', 'both');
const pirSchema = require('../models/pirHCSR501');
const mongoose = require('mongoose');
const LED = require('../midleware/leds')

var count = 0;
var alarm = 0;




    pir.watch(function (err, value) {
        if (err) exit(err);
        console.log(value ? 'Ktos tu jest!' : ' Juz Nie!');
        alarm = 1;
        count++;
        pirSchema.findById('5d4c5a3d5af4f10b07a9bbde', function(err, doc) {
            if (err) {
                console.log("erorr not found");
            }
            doc.state = alarm;
            doc.save();
        })
    
        if (value = true) {
            //LED.led(20,1);
            LED.alarm;
        }

        module.exports.alarm = alarm;
        module.exports.count = count;
        console.log('Intruder detected' + count + " " +  alarm);

    });

    function exit(err) {
        if (err) console.log('wystapil blad: ' + err);
        pir.unexport();
        console.log('Do zobaczenia!');
        process.exit();
    }

    process.on('SIGINT', exit);


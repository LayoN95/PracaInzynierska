var Gpio = require('onoff').Gpio,
    pir = new Gpio(19, 'in', 'both');
const pirSchema = require('../models/pirHCSR501');
var count = 0;
var alarm = 0;




    pir.watch(function (err, value) {
        if (err) exit(err);
        console.log(value ? 'Ktos tu jest!' : ' Juz Nie!');
        alarm = 1;
        count++;

        const PIRschema = pirSchema({
            _id: mongoose.Types.ObjectId(),
            state: alarm
        });
        PIRschema.save();

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


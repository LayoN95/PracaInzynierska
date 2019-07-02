var Gpio = require('onoff').Gpio,
    pir = new Gpio(19, 'in', 'both');
var count = 0;



    pir.watch(function (err, value) {
        count++;
        console.log('Intruder detected' + count);

    });


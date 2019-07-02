var Gpio = require('onoff').Gpio,
    pir = new Gpio(27, 'in', 'both');
var count = 0;

exports.start = function () {


    pir.watch(function (err, value) {
        //count++;
        //console.log('Intruder detected' + count);

        socket.emit("intruderValue", {
            "value": value
        });
    });

};
const leds = require('./leds');
var schedule = require('node-schedule');
var date = new Date(2019, 6, 24, 15, 52, 0);


var j = schedule.scheduleJob('57 17 * * *', function(){
    leds.led(21,1);
  });

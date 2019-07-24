const leds = require('./leds');
var schedule = require('node-schedule');
var date = new Date(2019, 6, 24, 15, 52, 0);

console.log("schedule1");

var j = schedule.scheduleJob('2 16 * * *', function(){
    console.log("schedule");
    leds.led(21,1);
  });

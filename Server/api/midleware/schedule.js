const leds = require('./leds');
var schedule = require('node-schedule');
var date = new Date(2019, 6, 24, 15, 52, 0);
var min, hour = 0;
var value = false;
var j;

console.log("schedule1");

function schedule1(min, hour, value) {
        j.cancel();
        console.log(min + " " + hour + " " + value);
        j = schedule.scheduleJob('' + min + ' ' + hour + ' * * *', function(){
        console.log("schedule");
        leds.led(21, parseInt(value));
      });
}


  module.exports.schedule1 = schedule1;
  module.exports.min = min;
  module.exports.hour = hour;



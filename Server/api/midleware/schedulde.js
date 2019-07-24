const leds = require('./leds');
var schedule = require('node-schedule');
var date = new Date(2019, 6, 24, 15, 52, 0);
var min, hour = 0;

console.log("schedule1");

function schedule(min, hour) {
    var j = schedule.scheduleJob(min + hour + ' * * *', function(){
        console.log("schedule");
        leds.led(21,1);
      });
}


  module.exports.schedule = schedule;
  module.exports.min = min;
  module.exports.hour = hour;

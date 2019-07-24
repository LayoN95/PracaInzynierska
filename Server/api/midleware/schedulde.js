const leds = require('./leds');
var schedule = require('node-schedule');
var date = new Date(2019, 6, 24, 15, 52, 0);
var min, hour = 0;
var state;

console.log("schedule1");

function schedule1(min, hour, state) {
        console.log(min + " " + hour);
        var j = schedule.scheduleJob('' + min + ' ' + hour + ' * * *', function(){
        console.log("schedule");
        leds.led(21, state);
      });
}


  module.exports.schedule1 = schedule1;
  module.exports.min = min;
  module.exports.hour = hour;
  module.exports.state = state;

const leds = require('./leds');
var schedule = require('node-schedule');
var date = new Date(2019, 6, 24, 15, 52, 0);
var min, hour = 0;
var value = false;
var rule = new schedule.RecurrenceRule();


console.log("schedule1");

function schedule1(min, hour, value) {
        rule.hour = hour;
        rule.minute = min;
        console.log(min + " " + hour + " " + value);
        var j = schedule.scheduleJob(rule, function(){
        console.log("schedule");
        leds.led(21, parseInt(value));
      });
}


  module.exports.schedule1 = schedule1;
  module.exports.min = min;
  module.exports.hour = hour;



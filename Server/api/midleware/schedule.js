const leds = require('./leds');
var schedule = require('node-schedule');
var min, hour = 0;
var value = false;
var rule = new schedule.RecurrenceRule();
const ds18b20 = require('./ds18b20');


function schedule1(min, hour, value, id) {
        rule.hour = hour;
        rule.minute = min;
        console.log(min + " " + hour + " " + value);
        var j = schedule.scheduleJob(rule, function(){
        console.log("schedule");
        leds.led(id, parseInt(value));
      });
}


  module.exports.schedule1 = schedule1;
  module.exports.min = min;
  module.exports.hour = hour;



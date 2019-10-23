const leds = require('./leds');
const servo = require('./servo');
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
        console.log(j);
        leds.led(id, parseInt(value));
      });
}

function windowSchedule(min, hour, value) {
  /*rule.hour = hour;
  rule.minute = min;*/
  dayOfWeek = [new schedule.Range(0, 6)];

  var window = schedule.scheduleJob({hour: hour, minute: min, dayOfWeek}, function(){
    servo.servoControl(value);
  })
}

  module.exports.windowSchedule = windowSchedule;
  module.exports.schedule1 = schedule1;
  module.exports.min = min;
  module.exports.hour = hour;



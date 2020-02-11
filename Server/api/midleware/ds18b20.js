const ds18b20 = require("ds18b20-raspi");
const ds18b20Schema = require("../models/ds18b20");
const mongoose = require("mongoose");
var socket = require("socket.io-client")(process.env.PATH);

var temp = 0;

var schedule = require("node-schedule");

setInterval(function() {
  ds18b20.readSimpleC((err, temperature) => {
    if (err) {
      console.log(err);
      console.log("Brak urządzenia");
    } else {
      temp = temperature;
      module.exports.temp = temp;
      socket.emit("DS18B20", { temp: temperature.toFixed(1) });
    }
  });
}, 60000);

var rule = new schedule.RecurrenceRule();

rule.minute = [0, 15, 30, 45];

var j = schedule.scheduleJob(rule, function() {
  ds18b20.readSimpleC((err, temperature) => {
    if (err) {
      console.log(err);
      console.log("Brak urządzenia");
    } else {
      temp = temperature;
    }
  });
  const DS18B20schema = ds18b20Schema({
    _id: mongoose.Types.ObjectId(),
    temperature: temp
  });
  if (temp != 0) {
    DS18B20schema.save();
  }
});

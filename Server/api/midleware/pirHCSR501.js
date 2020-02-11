var Gpio = require("onoff").Gpio,
  pir = new Gpio(19, "in", "both");
const pirSchema = require("../models/pirHCSR501");
const mongoose = require("mongoose");
const LED = require("../midleware/leds");
var socket = require("socket.io-client")(process.env.PATH);

var count = 0;
var alarm = 0;

pir.watch(function(err, value) {
  socket.emit("HCSR501", { state: value });
  if ((value = true)) {
    LED.led(20, 1);
    setTimeout(function(){ LED.led(20, 0); }, 5000);
  } 
  if (err) exit(err);
  console.log(value ? "Ktos tu jest!" : " Juz Nie!");
  alarm = 1;
  count++;
  pirSchema.findById("5d4c5a3d5af4f10b07a9bbde", function(err, doc) {
    if (err) {
      console.log("erorr not found");
    }
    doc.state = alarm;
    doc.date = Date.now();
    doc.save();
  });
  module.exports.alarm = alarm;
  module.exports.count = count;
  console.log("Intruder detected" + count + " " + alarm);
});

function exit(err) {
  if (err) console.log("wystapil blad: " + err);
  pir.unexport();
  console.log("Do zobaczenia!");
  process.exit();
}

process.on("SIGINT", exit);

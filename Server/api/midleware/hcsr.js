const Gpio = require("pigpio").Gpio;
const devicesSchema = require("../models/devicesStatus");
var socket = require("socket.io-client")("http://192.168.1.48:3000");

// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
const MICROSECDONDS_PER_CM = 1e6 / 34321;

const trigger = new Gpio(23, { mode: Gpio.OUTPUT });
const echo = new Gpio(24, { mode: Gpio.INPUT, alert: true });

trigger.digitalWrite(0); // Make sure trigger is low

const watchHCSR04 = () => {
  let startTick;
  echo.on("alert", (level, tick) => {
    if (level == 1) {
      startTick = tick;
    } else {
      const endTick = tick;
      const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      if (diff / 2 / MICROSECDONDS_PER_CM < 9) {
        socket.emit("HCSR04", { dist: diff / 2 / MICROSECDONDS_PER_CM });

        if (diff / 2 / MICROSECDONDS_PER_CM < 5) {
          devicesSchema.findById("5d8a5d38456fa304cebf8f4a", function(
            err,
            doc
          ) {
            if (err) {
              console.log("erorr not found");
            }
            doc.hcsr04 = diff / 2 / MICROSECDONDS_PER_CM;
            doc.save();
          });
        }
      }
    }
  });
};

watchHCSR04();

// Trigger a distance measurement once per second
setInterval(() => {
  trigger.trigger(10, 1); // Set trigger high for 10 microseconds
}, 1000);

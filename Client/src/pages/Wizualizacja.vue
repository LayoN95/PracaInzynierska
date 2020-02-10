<template>
  <div class="row">
    <div class="col-md-12" style="position: relative; width: 980px;">
      <card>
        <h3 class="card-title">
          <img src="img/temperature.png" style="width: 32px;" />Wizualizacja
        </h3>

        <div class="visualization" style="position: relative; width: 980px;">
          <img src="img/makieta2.png" />

          <div
            class="ds18b20"
            style="position: absolute; top: 515px; left: 245px;"
          >
            <p style="color: black; font-size: 20px;">
              <img src="img/temperature.png" style="width: 32px;" />{{
                ds18b20_temperature
              }}&#8451;
            </p>
          </div>

          <div
            class="dht11"
            style="position: absolute; top: 700px; left: 245px;"
          >
            <p style="color: black; font-size: 20px;">
              <img src="img/temperature.png" style="width: 32px;" />{{
                temperature
              }}&#8451; <img src="img/humidity.png" style="width: 32px" />
              {{ humidity }}%
            </p>
          </div>

          <div
            class="window"
            style="position: absolute; top: 450px; left: 760px;"
          >
            
            <img src="img/window.png" style="width: 32px;" />
            <img :src="window_state" />
          </div>

          <div
            class="airconditioner"
            style="position: absolute; top: 700px; left: 470px;"
          >
            <img
              src="img/air-conditioner.png"
              style="width: 32px;  transform:rotate(180deg);"
            /><img :src="air_conditioner_led" />
          </div>

          <div
            class="light_1"
            style="position: absolute; top: 450px; left: 630px;"
          >
            <img :src="lightRoom_1" style="width: 32px;" />
          </div>

          <div
            class="light_2"
            style="position: absolute; top: 450px; left: 320px;"
          >
            <img :src="lightRoom_2" style="width: 32px;" />
          </div>
          <div
            class="light_outdoor"
            style="position: absolute; top: 300px; left: 480px;"
          >
            <img :src="lightOutdoor" style="width: 32px;" />
          </div>

          <div
            class="light intensity"
            style="position: absolute; top: 220px; left: 230px;"
          >
            <p style="font-size: 20px; color: black">
              <img src="img/sunny.png" style="width: 32px;" />
              {{ lightRead }} lx
            </p>
            <p style="font-size: 20px; color: black">
              <img src="img/temperature.png" style="width: 32px;" />
              {{ temperature }}
            </p>
            <p style="font-size: 20px; color: black">
              <img src="img/humidity.png" style="width: 32px;" /> {{ humidity }}
            </p>
          </div>

          <div
            class="motion_sensor_1"
            style="position: absolute; top: 400px; left: 255px; transform:rotate(135deg);"
          >
            <img :src="hcsr501" style="width: 32px;" />
          </div>
          <div
            class="motion_sensor_2"
            style="position: absolute; top: 600px; left: 255px; transform:rotate(90deg);"
          >
            <img :src="hcsr04" style="width: 32px;" />
          </div>
          <div
            class="heat_radiator"
            style="position: absolute; top: 600px; left: 720px;"
          >
            <img src="img/radiator.png" /><img :src="radiator_led" />
          </div>

        </div>
      </card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://192.168.1.48:3000");

export default {
  components: {},
  data() {
    return {
      window_state: "img/led.png",
      hcsr04: "img/motion-sensor.png",
      hcsr501: "img/motion-sensor.png",
      radiator_led: "img/led.png",
      air_conditioner_led: "img/led.png",
      ds18b20_temperature: 0,
      temperature: 0,
      humidity: 0,
      lightRead: 0,
      window: "img/windowopen.png",
      lightRoom_1: false,
      lightRoom_2: false,
      lightOutdoor: false,
      path: "http://192.168.1.48:3000"
    };
  },
  methods: {
    getLight: function(event) {
      axios
        .get("http://192.168.1.48:3000/light", {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          var obj = response.data;
          this.lightRead = obj.message;
          //console.log("lightRead: " + obj.message);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getData: function(event) {
      axios
        .get(`${this.path}/devicestatus/`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          var data = [];
          var obj = response.data;
          for (var i in obj.deviceStatus) {
            data[i] = obj.deviceStatus[i];
          }

          //światła
          this.lightStatus = obj.deviceStatus[0].state;
          if (obj.deviceStatus[0].room_1) {
            this.lightRoom_1 = "img/lightbulb.png";
          } else {
            this.lightRoom_1 = "img/lightbulboff.png";
          }

          if (obj.deviceStatus[0].room_2) {
            this.lightRoom_2 = "img/lightbulb.png";
          } else {
            this.lightRoom_2 = "img/lightbulboff.png";
          }
          if (obj.deviceStatus[0].outdoor) {
            this.lightOutdoor = "img/lightbulb.png";
          } else {
            this.lightOutdoor = "img/lightbulboff.png";
          }

          //okna
          if (obj.deviceStatus[0].window_open <= 650) {
            this.window_state = "img/led.png";
            console.log("okno zamknięte");
          } else if (obj.deviceStatus[0].window_open >= 1500) {
            this.window_state = "img/green_led.png";
            console.log("okno otwarte");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getDS18B20: function(event) {
      axios
        .get("http://192.168.1.48:3000/", {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          var obj = response.data;
          var x = [];
          for (var i in obj.ds18b20) {
            x[i] = obj.ds18b20[i].temperature;
          }
          this.ds18b20_temperature = x[0];
        })
        .catch(error => {
          console.log(error);
        });
    },

    getDHT11: function(event) {
      axios
        .get("http://192.168.1.48:3000/dht11", {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          var hours, minutes, seconds;
          var dateHMS;
          var obj = response.data;
          var x = [];
          var y = [];
          var z = [];
          this.temperature = obj.records[0].temperature;
          this.humidity = obj.records[0].humidity;

        })
        .catch(error => {
          console.log(error);
        });
    },
    getLight: function(event) {
      axios
        .get("http://192.168.1.48:3000/light", {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          var obj = response.data;
          this.lightRead = obj.message;
          //console.log("lightRead: " + obj.message);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getDevicesStatus: function(event) {
      axios
        .get(`${this.path}/devicestatus/`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          let obj = response.data;
          if (obj.deviceStatus[0].radiator) {
            this.radiator_led = "img/green_led.png";
          } else {
            this.radiator_led = "img/led.png";
          }
          if (obj.deviceStatus[0].air_conditioner) {
            this.air_conditioner_led = "img/green_led.png";
          } else {
            this.air_conditioner_led = "img/led.png";
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getDataFromSockets: function(event) {
      socket.on("BH1750_BROADCAST", data => {
        //console.log("BH1750_BROADCAST" + data.light);
        this.lightRead = data.light;
        //console.log("LIGHT_READ: " + this.lightRead);
      });
      socket.on("DS18B20_BROADCAST", data => {
        //console.log("DS18B20 BROADCAST ON WEBSITE" + data.temp);
        this.ds18b20_temperature = data.temp;
        //console.log("DS18B20_temp afret broadcast" + this.ds18b20_temperature);
      });
      socket.on("DHT11_BROADCAST", data => {
        this.temperature = data.temp;
        this.humidity = data.humid;
        //console.log("DHT11_BROADCAST Temp: " + data.temp + " Humid: " + data.humid);
      });
      socket.on("HCSR501_BROADCAST", data => {
        this.alarm = data.state;
      });
      socket.on("HCSR04_BROADCAST", data => {
        this.hcsr04 = data.dist;
        //console.log("HCSR04_BROADCAST: " + data.dist);
      });
      socket.on("LED_18_BROADCAST", data => {
        console.log("LED_18_BROADCAST: " + data.state);
        if (data.state) {
          this.lightRoom_1 = "img/lightbulb.png";
        } else {
          this.lightRoom_1 = "img/lightbulboff.png";
        }
      });
      socket.on("LED_6_BROADCAST", data => {
        console.log("LED_6_BROADCAST: " + data.state);
        if (data.state) {
          this.lightRoom_2 = "img/lightbulb.png";
        } else {
          this.lightRoom_2 = "img/lightbulboff.png";
        }
      });
      socket.on("LED_21_BROADCAST", data => {
        console.log("LED_21_BROADCAST: " + data.state);
        if (data.state) {
          this.lightOutdoor = "img/lightbulb.png";
        } else {
          this.lightOutdoor = "img/lightbulboff.png";
        }
      });
      socket.on("heater_turn_on_BROADCAST", data => {
        this.radiator_led = "img/green_led.png";
      });
      socket.on("heater_turn_off_BROADCAST", data => {
        this.radiator_led = "img/led.png";
      });
      socket.on("air_conditioner_turn_off_BROADCAST", data => {
        this.air_conditioner_led = "img/led.png";
      });
      socket.on("air_conditioner_turn_on_BROADCAST", data => {
        this.air_conditioner_led = "img/green_led.png";
      });
      socket.on("HCSR501_BROADCAST", data => {
        if (data.state) {
          this.hcsr501 = "img/motion-sensor_on.png";
        } else {
          this.hcsr501 = "img/motion-sensor.png";
        }
      });
      socket.on("HCSR04_BROADCAST", data => {
        if (data.dist < 5) {
          this.hcsr04 = "img/motion-sensor_on.png";
        } else {
          this.hcsr04 = "img/motion-sensor.png";
        }
      });
    }
  },
  beforeMount() {
    this.getDS18B20();
    this.getDHT11();
    this.getData();
    this.getLight();
    this.getDevicesStatus();
  },
  mounted() {
    this.getDataFromSockets();
  }
};
</script>
<style></style>

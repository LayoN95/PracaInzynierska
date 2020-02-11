<template>
  <div class="row">
    <div class="col-12">
      <card>
        <h3 slot="header">Sterowanie</h3>

        <h3>Oświetlenie pokój nr 1</h3>
        <p class="d-inline">Od:</p>
        <input
          class="d-inline"
          type="time"
          id="timeStart"
          v-model="room_1_timeStart"
        />

        <p class="d-inline">Do:</p>
        <input type="time" id="timeEnd" v-model="room_1_timeEnd" />
        <base-button
          class="d-inline"
          v-on:click="submit"
          id="18"
          type="success"
          fill
          >Zapisz!</base-button
        >

        <h3>Oświetlenie pokój nr 2</h3>
        <p class="d-inline">Od:</p>
        <input
          class="d-inline"
          type="time"
          id="timeStart"
          v-model="room_2_timeStart"
        />

        <p class="d-inline">Do:</p>
        <input type="time" id="timeEnd" v-model="room_2_timeEnd" />
        <base-button
          class="d-inline"
          v-on:click="submit"
          id="6"
          type="success"
          fill
          >Zapisz!</base-button
        >

        <h3>Oświetlenie na zewnątrz</h3>
        <p class="d-inline">Od:</p>
        <input
          class="d-inline"
          type="time"
          id="timeStart"
          v-model="outdoor_timeStart"
        />

        <p class="d-inline">Do:</p>
        <input type="time" id="timeEnd" v-model="outdoor_timeEnd" />
        <base-button
          class="d-inline"
          v-on:click="submit"
          id="21"
          type="success"
          fill
          >Zapisz!</base-button
        >

        <h3>Sterowanie roletami</h3>
        <p class="d-inline">Zasłonięcie okien:</p>
        <input
          class="d-inline"
          type="time"
          id="timeStart"
          v-model="windowOpen"
        />

        <p class="d-inline">Odsłonięcie okien:</p>
        <input type="time" id="timeEnd" v-model="windowClose" />
        <base-button
          class="d-inline"
          v-on:click="windowSubmit"
          id="window"
          type="success"
          fill
          >Zapisz!</base-button
        >
      </card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
import KnobControl from "vue-knob-control";
import { path } from "../pages/variables";

export default {
  components: {
    KnobControl
  },
  data() {
    return {
      room_1_timeStart: "18:30",
      room_1_timeEnd: "20:00",
      room_2_timeStart: "18:30",
      room_2_timeEnd: "20:00",
      outdoor_timeStart: "18:30",
      outdoor_timeEnd: "20:00",
      windowOpen: "18:30",
      windowClose: "20:00",
      id: null,
      dateStart: null,
      timeStart: null,
      dateEnd: null,
      timeEnd: null,
      checked: null,
      thermostat: 21,
      servoControl: null,
      //detune: 20,
    };
  },
  methods: {
    windowSubmit: function(event) {
      var targetId = event.currentTarget.id;

      var start = [];
      var end = [];
      start = this.windowOpen.split(":");
      end = this.windowClose.split(":");

      //Ustalenie aktualnej godziny
      var timeNow = new Date();
      console.log("TIME NOW: " + timeNow);
      var hours = timeNow.getHours();
      var minutes = timeNow.getMinutes();
      var timeRightNow = hours + ":" + minutes;
      console.log("TIME RIGHT NOW: " + timeRightNow);

      axios
        .post(`${path}/windowschedule/${start[0]}/${start[1]}/2500/`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      axios
        .post(`${path}/windowschedule/${end[0]}/${end[1]}/600/`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },

    submit: function(event) {
      var targetId = event.currentTarget.id;
      console.log("TARGET ID! " + targetId);
      var start = [];
      var end = [];

      /*W bazie danych zmienna bool, jeżeli aktywne to true else wyczyszczeniu joba false*/
      switch (targetId) {
        case "18": {
          console.log("Case 18: ROOM 1");
          start = this.room_1_timeStart.split(":");
          end = this.room_1_timeEnd.split(":");

          break;
        }
        case "6": {
          console.log("Case 6: ROOM 2");
          start = this.room_2_timeStart.split(":");
          end = this.room_2_timeEnd.split(":");
          break;
        }
        case "21": {
          console.log("Case 21: OUTDOOR");
          start = this.outdoor_timeStart.split(":");
          end = this.outdoor_timeEnd.split(":");
          break;
        }
      }

      /*start = this.timeStart.split(':');
        end = this.timeEnd.split(':');*/

      //Ustalenie aktualnej godziny
      var timeNow = new Date();
      console.log("TIME NOW: " + timeNow);
      var hours = timeNow.getHours();
      var minutes = timeNow.getMinutes();
      var timeRightNow = hours + ":" + minutes;
      console.log("TIME RIGHT NOW: " + timeRightNow);

      axios
        .post(`${path}/schedule/${start[0]}/${start[1]}/1/${targetId}`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      axios
        .post(`${path}/schedule/${end[0]}/${end[1]}/0/${targetId}`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });

      if (timeRightNow >= this.timeStart && timeRightNow <= this.timeEnd) {
        console.log("Czas w zakresie " + timeRightNow);
      } else {
        console.log("czas poza zakresem " + timeRightNow);
      }
    },

    reset: function(event) {
      axios
        .post(`${path}/reset`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },

    turnOn: function(event) {
      var targetId = event.currentTarget.id;
      axios
        .post(`${path}/leds/${targetId}/1`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          console.log(response);
          console.log("REFS" + targetId);
        })
        .catch(error => {
          console.log(error);
        });
    },
    turnOff: function(event) {
      var targetId = event.currentTarget.id;

      axios
        .post(`${path}/leds/${targetId}/0`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    setTemperature: function(event) {
      axios
        .post(`${this.path}/thermostat/${this.thermostat}`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },

    servoSubmit: function(event) {
      axios
        .post(`${this.path}/servo/${this.servoControl}`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          console.log(response);
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
          this.servoControl = obj.deviceStatus[0].window_open;
          console.log(this.servoControl);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  beforeMount() {
    this.getData();
  }
};
</script>
<style></style>

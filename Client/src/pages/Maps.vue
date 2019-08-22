<template>
<div class="row">
      <div class="col-md-6">
        <card>
          <h4 slot="header">Light 1</h4>
          <button v-on:click="turnOn" id="21">Turn the lights on!</button>
          <button v-on:click="turnOff" id="21">Turn the lights off!</button>

          <button v-on:click="turnOn" id="20">Turn the lights on!</button>
          <button v-on:click="turnOff" id="20">Turn the lights off!</button>
        </card>
      </div>
      <div class="col-md-6">
        <card>
          <h4 slot="header">Light 2</h4>
          <knob-control
  :min="-64"
  :max="63"
  :size="75"
  primary-color="#E844C3"
  secondary-color="#E7B6DC"
  text-color="#E844C3"
  v-model="detune"
></knob-control>

        </card>
      </div>
      <div class="col-12">
        <card>
          <h4 slot="header">Schedule</h4>

          <label for="timeStart">TurnOn: </label>
          <input type="time" id="timeStart" v-model="timeStart" />
          <p>Start godzina: {{ timeStart }}</p>

          <label for="timeEnd">TurnOff: </label>
          <input type="time" id="timeEnd" v-model="timeEnd" />
          <p>Stop godzina: {{ timeEnd }}</p>
          <button v-on:click="submit">Submit!</button>

          <input v-model="thermostat" placeholder="Set temperature">
          <button v-on:click="setTemperature">SetTemperature</button>

        </card>
      </div>
      <div class="col-12">
        <card>
          <h4 slot="header">Alarm</h4>

          <h1>Reset: </h1>
          <button v-on:click="reset">Reset!</button>
          <input type="checkbox" id="checkbox" v-model="checked">
          <label for="checkbox">{{ checked }}</label>
            <div id="chart">
            </div>

        </card>
      </div>
</div>
</template>
<script>
   import axios from 'axios';
   import Vue from 'vue'
    import KnobControl from 'vue-knob-control'

   


   export default {
    components: {
      KnobControl
    },
    data() {
        return {
        id: null,
        dateStart: null,
        timeStart: null,
        dateEnd: null,
        timeEnd: null,
        checked: null,
        thermostat: null,
        path: 'http://192.168.1.48:3000'
      };
    },
    methods: {
      beforeMount() {
  

    },
    
      submit: function (event) {
        var start = [];
        var end = [];
        start = this.timeStart.split(':');
        end = this.timeEnd.split(':');
        
        //Ustalenie aktualnej godziny
        var timeNow = new Date();
        console.log("TIME NOW: " + timeNow);
        var hours = timeNow.getHours();
        var minutes = timeNow.getMinutes();
        var timeRightNow = hours + ":" + minutes;
        console.log("TIME RIGHT NOW: " + timeRightNow);

        axios.post(`${this.path}/schedule/${start[0]}/${start[1]}/1`, {
           headers: {
                'Access-Control-Allow-Origin': '*',
              }
          })
          .then((response) => {
              console.log(response);
          })
          .catch((error) => {
              console.log(error);
          });
        axios.post(`${this.path}/schedule/${end[0]}/${end[1]}/0`, {
           headers: {
                'Access-Control-Allow-Origin': '*',
              }
          })
          .then((response) => {
              console.log(response);
          })
          .catch((error) => {
              console.log(error);
          });

              if(timeRightNow >= this.timeStart && timeRightNow <= this.timeEnd ) {
            console.log("Czas w zakresie " + timeRightNow);
        } else {
          console.log("czas poza zakresem " + timeRightNow);
        }
      },

      reset: function (event) {
            axios.post('http://192.168.1.48:3000/reset', {
              headers: {
                'Access-Control-Allow-Origin': '*',
              }
            })
            .then((response) => {
              console.log(response);
                          })
            .catch((error) => {
              console.log(error);
              
            });        
      },

      turnOn: function (event) {
            var targetId = event.currentTarget.id;
            axios.post('http://192.168.1.48:3000/leds/' + targetId /*this.id*/ + '/1', {
              headers: {
                'Access-Control-Allow-Origin': '*',
              }
            })
            .then((response) => {
              console.log(response);
              console.log("REFS" + targetId);
            })
            .catch((error) => {
              console.log(error);
              
            });
      },
      turnOff: function (event) {
            var targetId = event.currentTarget.id;

            axios.post('http://192.168.1.48:3000/leds/' + targetId /*this.id*/+ '/0', {
              headers: {
                'Access-Control-Allow-Origin': '*',
              }
            })
            .then((response) => {
              console.log(response)   
            })
            .catch((error) => {
              console.log(error);
              
            });
      },
      setTemperature: function (event) {
              
             axios.post(`${this.path}/thermostat/${this.thermostat}`, {
              headers: {
                'Access-Control-Allow-Origin': '*',
              }
            })
            .then((response) => {
              console.log(response);
                                    })
            .catch((error) => {
              console.log(error);
              
            });       
      }

    }
  };

 
</script>
<style>
</style>

<template>
<div class="row">
      <div class="col-md-6">
        <card>
          <h4 slot="header">Światła</h4>
          <!--Layout button-->
          <base-button v-on:click="turnOn" id="18" type="primary" fill>Pokój 1 On!</base-button>
          <base-button v-on:click="turnOff" id="18" type="primary" fill>Pokój 1 Off!</base-button>
          <br>
          <base-button v-on:click="turnOn" id="6" type="info" fill>Pokój 2 On!</base-button>
          <base-button v-on:click="turnOff" id="6" type="info" fill>Pokój 2 Off!</base-button>
          <br>
          <base-button v-on:click="turnOn" id="21" type="success" fill>On!</base-button>
          <base-button v-on:click="turnOff" id="21" type="success" fill>Off!</base-button>
          <br>
          <base-button v-on:click="turnOn" id="17" type="warning" fill>Zewnątrz On!</base-button>
          <base-button v-on:click="turnOff" id="17" type="danger" fill>Zewnątrz Off!</base-button>
          <!--
          <button v-on:click="turnOn" id="21">Turn the lights on!</button>
          <button v-on:click="turnOff" id="21">Turn the lights off!</button>
          
          <button v-on:click="turnOn" id="18">Room 1 on!</button>
          <button v-on:click="turnOff" id="18">Room 1 off!</button>

          <button v-on:click="turnOn" id="6">Room 2 on!</button>
          <button v-on:click="turnOff" id="6">Room 2 off!</button>

          <button v-on:click="turnOn" id="20">Turn the lights on!</button>
          <button v-on:click="turnOff" id="20">Turn the lights off!</button>
          -->
        </card>
      </div>
      <div class="col-md-6">
        <card>
          <h4 slot="header">Termostat</h4>
          <knob-control
          :min="10"
          :max="35"
          :size="100"
          secondary-color="#66CC66"
          text-color="#66CC66"
          v-model="thermostat"
          id="thermostatKnob"
          ></knob-control>
          <label for="thermostatKnob">Ustaw temperaturę</label>
          <button v-on:click="setTemperature">Zapisz</button>
        </card>
      </div>
      <div class="col-12">
        <card>
          <h4 slot="header">Schedule</h4>

          <p>Pokój nr 1</p>
          <label for="timeStart">TurnOn: </label>
          <input type="time" id="timeStart" v-model="timeStart" />
          <p>Start godzina: {{ timeStart }}</p>

          <label for="timeEnd">TurnOff: </label>
          <input type="time" id="timeEnd" v-model="timeEnd" />
          <p>Stop godzina: {{ timeEnd }}</p>
          <button v-on:click="submit">Submit!</button>

          <p>Pokój nr 2</p>
          <label for="timeStart">TurnOn: </label>
          <input type="time" id="timeStart" v-model="timeStart" />
          <p>Start godzina: {{ timeStart }}</p>

          <label for="timeEnd">TurnOff: </label>
          <input type="time" id="timeEnd" v-model="timeEnd" />
          <p>Stop godzina: {{ timeEnd }}</p>
          <button v-on:click="submit" id="7">Submit!</button>
          

          <!--
            <input v-model="thermostat" placeholder="Set temperature">
          -->

        </card>
      </div>
        <div class="col-md-6">
        <card>
          <h4 slot="header">ServoControl</h4>

          <knob-control
          :min="600"
          :max="2500"
          :size="100"
          secondary-color="#66CC66"
          text-color="#66CC66"
          v-model="servoControl"
          id="servoControlKnob"
          ></knob-control>
          <base-button slot="footer" v-on:click="servoSubmit" type="primary" fill>Save</base-button>
          <!--<input v-model="servoControl" placeholder="edit me">-->

          <button v-on:click="servoSubmit">Submit!</button>
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
        thermostat: 21,
        servoControl: null,
        //detune: 20,
        path: 'http://192.168.1.48:3000'
      };
    },
    methods: {

    
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

        axios.post(`${this.path}/schedule/${start[0]}/${start[1]}/1/21`, {
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
        axios.post(`${this.path}/schedule/${end[0]}/${end[1]}/0/21`, {
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
      },
      
      servoSubmit: function (event) {
        axios.post(`${this.path}/servo/${this.servoControl}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
           }
        })  .then((response) => {
              console.log(response);
                                    })
            .catch((error) => {
              console.log(error);
              
            });
      },

          getData: function(event) {
          axios.get(`${this.path}/devicestatus/`, {
           headers: {
                'Access-Control-Allow-Origin': '*',
              }
          })
          .then((response) => {
          var data = [];
          var obj = response.data;
          for (var i in obj.deviceStatus) {
            data[i] = obj.deviceStatus[i];
          }
          this.servoControl = obj.deviceStatus[0].window_open;
          console.log(this.servoControl);
          })
          .catch((error) => {
              console.log(error);
          });  

        }

    },
          beforeMount() {
        this.getData();

    }
  };

 
</script>
<style>
</style>

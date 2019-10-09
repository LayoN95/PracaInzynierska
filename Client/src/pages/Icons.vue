<template>
<div class="row">
      <div class="col-lg-4">
        <card>
          <h4 slot="header"><i class="tim-icons icon-bulb-63 text-success "></i> Światło</h4>
            <p>{{ /*User.ds18b20[0].temperature*/ lightStatus }} 123</p>
        </card>
      </div>
      <div class="col-lg-4">
        <card>
          <h4 slot="header"><i class="tim-icons icon-bell-55 text-success "></i> Termostat</h4>
          <p>Termostat: {{ thermostat }}</p>
        </card>
      </div>
      <div class="col-lg-4">
        <card>
          <h4 slot="header"><i class="tim-icons icon-bell-55 text-success "></i> Alarm</h4>
          <p>Alarm: {{ alarm }}</p>

        </card>
      </div>
        <div class="col-lg-4">
        <card>
           <h4 slot="header"><i class="tim-icons icon-bell-55 text-success "></i> Temperatura</h4>
           <p>Temperatura: {{ temperature }} </p>
           <p>Wilgotność: {{ humidity }}</p>
        </card>
      </div>
        <div class="col-lg-4">
        <card>
           <h4 slot="header"><i class="tim-icons icon-alert-circle-exc text-success "></i> Pir</h4>
           <p>Czujnik PIR: {{ alarm }}</p>
        </card>
      </div>
        <div class="col-lg-4">
        <card>
           <h4 slot="header"><i class="tim-icons icon-alert-circle-exc text-success "></i> HCSR</h4>
           <p>Czujnik HCSR: {{ hcsr04 }}</p>
        </card>
      </div>
      <div class="col-12">
        <card>
           <h4 slot="header"><i class="tim-icons icon-image-02 text-success "></i> Okna</h4>
           <p>Stan okna: {{ window }}</p>
        </card>
      </div>
</div>
</template>
<script>
   import axios from 'axios';
   import Vue from 'vue';

export default {
data() {
        return {
        lightStatus: 5,
        thermostat: 22, 
        temperature: null,
        humidity: null,
        window: null,
        alarm: null,
        hcsr04: 5,
        path: 'http://192.168.1.48:3000'
      };
    },
    methods: {
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

          //światła
          this.lightStatus = obj.deviceStatus[0].state;

          //okna
          if(obj.deviceStatus[0].window_open == 600) {
            this.window = "zamknięte"
          } else if(obj.deviceStatus[0].window_open > 1500) {
          this.window = "otwarte";
          }

          this.hcsr04 = obj.deviceStatus[0].hcsr04;
          console.log(obj.deviceStatus[0].state);
          console.log(this.lightStatus);
              console.log(response);
          })
          .catch((error) => {
              console.log(error);
          });  

        },
        getDHT11: function(event) {

      axios.get(`${this.path}/dht11/`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      })
        .then((response) => {
        var hours, minutes, seconds;
        var dateHMS;
        var obj = response.data;
        var x = [];
        var y = [];
        var z = [];

        for (var i in obj.records) {
          x[i] = obj.records[i].humidity;
          y[i] = obj.records[i].temperature;
          dateHMS = new Date(obj.records[i].date);
          hours = dateHMS.getHours();
          minutes = dateHMS.getMinutes();
          seconds = dateHMS.getSeconds();
          z[i] = hours + ":" + minutes + ":" + seconds; 
        }
        this.temperature = y[0];
        this.humidity = x[0];
        console.log(x[0]);
        console.log(y[0]);
        console.log(z[0]);
      })
      .catch((error) => {
        console.log(error);
      }); 
  },
    getThermostat: function(event) {
      axios.get(`${this.path}/thermostat`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      })
      .then((response) => {
          var obj = response.data;
          this.thermostat = obj.message;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    getAlarm: function(event) {
      axios.get(`${this.path}/alarm`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      })
      .then((response) => {
        var obj = response.data;
        this.alarm = obj.message;
      })
      .catch((error) => {
        console.log(error);
      });
    }
  
    
    },
      beforeMount() {
      this.getData(); 
      this.getDHT11();
      this.getThermostat();
      this.getAlarm();
   
    },
    mounted() {

    }  
  };

</script>
<style>
</style>

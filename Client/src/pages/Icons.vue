<template>
<div class="row">
      <div class="col-lg-4">
        <card>
          <h4 slot="header">Światło</h4>
            <p>{{ /*User.ds18b20[0].temperature*/ lightStatus }} 123</p>
        </card>
      </div>
      <div class="col-lg-4">
        <card>
          <h4 slot="header">Termostat</h4>
          <p>Termostat: {{ thermostat }}</p>
        </card>
      </div>
      <div class="col-lg-4">
        <card>
          <h4 slot="header">Alarm</h4>


        </card>
      </div>
        <div class="col-lg-4">
        <card>
           <h4 slot="header">Temperatura</h4>
           <p>Temperatura: {{ temperature }} </p>
           <p>Wilgotność: {{ humidity }}</p>
        </card>
      </div>
        <div class="col-lg-4">
        <card>
           <h4 slot="header">Pir</h4>
        </card>
      </div>
        <div class="col-lg-4">
        <card>
           <h4 slot="header">HCSR</h4>
        </card>
      </div>
      <div class="col-12">
        <card>
           <h4 slot="header">Okna</h4>
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
            data[i] = obj.deviceStatus[i].state;
          }
          this.lightStatus = obj.deviceStatus[0].state;
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
          var data = [];
          var obj = response.data;
          console.log(obj.message);
          /*for (var i in obj.deviceStatus) {
            data[i] = obj.deviceStatus[i].temperature;
          }
          this.thermostat = obj.deviceStatus[0].temperature;
          console.log("Thermostat REsponse" + response);*/
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
   
    },
    mounted() {

    }  
  };

</script>
<style>
</style>

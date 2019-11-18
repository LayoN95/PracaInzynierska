<template>
<div class="row">
  <div class="col-lg-4">
  <card>
    <h3 slot="header"><i class="tim-icons icon-bulb-63 text-success"></i>Pokój nr 1</h3>
    <h4>Oświetlenie: <img :src="lightRoom_1" style="width: 25px;"></h4>
     
    <table>
            <tr>
              <td><h4>Temperatura</h4></td>
              <td><h4>Wilgotność</h4></td>
            </tr>
            <tr>
              <td><p style="font-size: 30px; color: #1df8ca;"><img src="img/temperature.png" style="width: 25px;"> {{ temperature }} &#8451; </p></td>
              <td><p style="font-size: 30px; color: #1d8af8;"><img src="img/humidity.png" style="width: 25px;"> {{ humidity }} % </p></td>
            </tr>
    </table>
  </card>
  </div>

  <div class="col-lg-4">
  <card>
    <h3 slot="header"><i class="tim-icons icon-bulb-63 text-success"></i>Pokój nr 2</h3>
    <h4>Oświetlenie: <img :src="lightRoom_2" style="width: 25px;"></h4>
    <table>
      <tr>
        <td>
          <h4>Temperatura</h4>
        </td>
      </tr>
      <tr>
        <td>
          <p style="font-size: 30px; color: #1df8ca;">
            <img src="img/temperature.png" style="width: 25px;"> {{ ds18b20_temperature }} &#8451; 
          </p>
        </td>
      </tr>
    </table>
  </card>
  </div>

  <div class="col-lg-4">
  <card>
    <h3 slot="header"><i class="tim-icons icon-bulb-63 text-success"></i>Zewnątrz</h3>
          <h4>Oświetlenie na zewnątrz: <img :src="lightOutdoor" style="width: 25px;"></h4>
          <table>
            <tr><td><h4>Natężenie światła</h4></td></tr>
            <tr><td><p style="font-size: 30px; color: #ffcc33;"><img src="img/sunny.png" style="width: 25px;"> {{ lightRead }} lx</p></td></tr>
            <tr><td><h4>Temperatura</h4></td><td><h4>Wilgotność</h4></td></tr>
            <tr>
              <td><p style="font-size: 30px; color: #1df8ca;"><img src="img/temperature.png" style="width: 25px;"> {{ temperature }} &#8451; </p></td>
              <td><p style="font-size: 30px; color: #1d8af8;"><img src="img/humidity.png" style="width: 25px;"> {{ humidity }} % </p></td>
            </tr>
            <!-- <tr><td colspan="2"><p>Termometr: DS18B20</p></td></tr>
            <tr>
              
              <td><p style="font-size: 30px; color: #1df8ca;"><img src="img/temperature.png" style="width: 25px;"> {{ ds18b20_temperature }} &#8451; </p></td>
            </tr> -->
          </table>
  </card>
  </div>
      <div class="col-lg-4">
        <card>
          <h3 slot="header"><i class="tim-icons icon-bulb-63 text-success "></i> Światło</h3>
            <p>Pokój nr 1: {{ lightRoom_1 }}</p>
            <p>Pokój nr 2: {{ lightRoom_2 }}</p>
            <p>Oświetlenie na zewnątrz: {{ lightOutdoor }}</p>
        </card>
      </div>
      <div class="col-lg-4">
        <card>
          <h3 slot="header"><i class="tim-icons icon-bell-55 text-success "></i> Termostat</h3>
          <p>Termostat: {{ thermostat }}</p>
        </card>
      </div>
      <div class="col-lg-4">
        <card>
          <h3 slot="header"><i class="tim-icons icon-bell-55 text-success "></i> Alarm</h3>
          <p>Alarm: {{ alarm }}</p>

        </card>
      </div>
        <div class="col-lg-4">
        <card>

           <h3 slot="header"><i class="tim-icons icon-bell-55 text-success "></i> Temperatura</h3>
          <table>
            <tr><td colspan="2"><p>Termometr: DHT11</p></td></tr>
            <tr>
              <td><p style="font-size: 30px; color: #1df8ca;"><img src="img/temperature.png" style="width: 25px;"> {{ temperature }} &#8451; </p></td>
              <td><p style="font-size: 30px; color: #1d8af8;"><img src="img/humidity.png" style="width: 25px;"> {{ humidity }} % </p></td>
            </tr>
            <tr><td colspan="2"><p>Termometr: DS18B20</p></td></tr>
            <tr>
              
              <td><p style="font-size: 30px; color: #1df8ca;"><img src="img/temperature.png" style="width: 25px;"> {{ ds18b20_temperature }} &#8451; </p></td>
            </tr>
            <!-- <tr>
            <td>
          <p>Temperatura: {{ temperature }} </p>
                     <knob-control
          :min="0"
          :max="35"
          :size="100"
          :disabled="false"
          secondary-color="#66CC66"
          text-color="#66CC66"
          v-model="temperature"
          id="temperatureControlKnob"
          ></knob-control>
            </td>
            <td>
              <p>Wilgotność: {{ humidity }}</p>
           <knob-control
          :min="0"
          :max="100"
          :size="100"
          :disabled="false"
          secondary-color="#66CC66"
          text-color="#66CC66"
          v-model="humidity"
          id="humidityControlKnob"
          ></knob-control>
            </td>
          </tr> -->
          </table>
           
           
        </card>
      </div>
        <div class="col-lg-4">
        <card>
           <h3 slot="header"><i class="tim-icons icon-alert-circle-exc text-success "></i> Pir</h3>
           <p>Czujnik PIR: {{ alarm }}</p>
           <p>Ostatni ruch: {{ pirSensor }}</p>
        </card>
      </div>
        <div class="col-lg-4">
        <card>
           <h3 slot="header"><i class="tim-icons icon-alert-circle-exc text-success "></i> HCSR</h3>
           <p>Czujnik HCSR: {{ hcsr04 }}</p>
        </card>
      </div>
      <div class="col-12">
        <card>
           <h3 slot="header"><i class="tim-icons icon-image-02 text-success "></i> Okna</h3>
           <p>Stan okna: {{ window }}</p>
            <progress-bar :val="window_position" :title="temperature"  :text="temperature" min="650" max="2500"></progress-bar>

        </card>
      </div>
</div>
</template>
<script>
   import axios from 'axios';
   import Vue from 'vue';
   import KnobControl from 'vue-knob-control';
   import ProgressBar from 'vue-simple-progress';



export default {
  components: {
    KnobControl,
    ProgressBar,
  },
data() {
        return {
        bulb: '<img src="img/temperature.png" style="width: 25px;">',
        lightRead: 0,
        lightStatus: false,
        lightRoom_1: false,
        lightRoom_2: false,
        lightOutdoor: false,
        pirSensor: null,
        thermostat: 22, 
        temperature: null,
        ds18b20_temperature: null,
        humidity: null,
        window: null,
        window_position: null,
        alarm: null,
        hcsr04: 5,
        path: 'http://192.168.1.48:3000'
      };
    },
    methods: {
          getData: function(event) {
            //DeviceStatus
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
          //this.lightRoom_1 = obj.deviceStatus[0].room_1;
          //Pokój 1
          if(obj.deviceStatus[0].room_1){
            this.lightRoom_1 = "img/lightbulb.png";
          }else {
            this.lightRoom_1 = "img/lightbulboff.png";
          }

          //Pokój 2
          //this.lightRoom_2 = obj.deviceStatus[0].room_2;
          if(obj.deviceStatus[0].room_2){
            this.lightRoom_2 = "img/lightbulb.png";
          }else {
            this.lightRoom_2 = "img/lightbulboff.png";
          }
          //Zewnątrz
          //this.lightOutdoor = obj.deviceStatus[0].outdoor;
          if(obj.deviceStatus[0].outdoor){
            this.lightOutdoor = "img/lightbulb.png";
          }else {
            this.lightOutdoor = "img/lightbulboff.png";
          }
          //okna
          this.window_position = obj.deviceStatus[0].window_open;

          if(obj.deviceStatus[0].window_open <= 650) {
            this.window = "zamknięte"
          } else if(obj.deviceStatus[0].window_open >= 1500) {
          this.window = "otwarte";
          }

          this.hcsr04 = obj.deviceStatus[0].hcsr04;
          //console.log(obj.deviceStatus[0].state);
          //console.log(this.lightStatus);
              //console.log(response);
          })
          .catch((error) => {
              console.log(error);
          });
          //PirSensor
          axios.get(`${this.path}/pirSensor/`, {
           headers: {
                'Access-Control-Allow-Origin': '*',
              }
          }).then((response) => {
            var data = [];
            var obj = response.data;
            var hours, minutes, seconds, day, month;
            var dateHMS;
            var time;
            for (var i in obj.pir) {
              data[i] = obj.pir[i];
              dateHMS = new Date(obj.pir[i].date);
              hours = dateHMS.getHours();
              minutes = dateHMS.getMinutes();
              seconds = dateHMS.getSeconds();
              day = dateHMS.getDate();
              month = dateHMS.getMonth();
              this.pirSensor = day + "." + month + " " + hours + ":" + minutes + ":" + seconds;
            }
            //console.log(obj.pir[0]._id);
            this.pirSensor = obj.pir[0].date;

          })          
          

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
        //console.log(x[0]);
        //console.log(y[0]);
        //console.log(z[0]);
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
    },
        getDS18B20: function (event) {
        axios.get('http://192.168.1.48:3000/', {
              headers: {
                'Access-Control-Allow-Origin': '*',
              }
        })
        .then((response) => {
        var obj = response.data;
        var x = [];
        for (var i in obj.ds18b20) {
          x[i] = obj.ds18b20[i].temperature;
        }
        this.ds18b20_temperature = x[0];
        //console.log(x[0]);
        })
        .catch((error) => {
          console.log(error);
        });
      },

      getLight: function (event) {
        axios.get('http://192.168.1.48:3000/light', {
          headers: {
                'Access-Control-Allow-Origin': '*',
          }
        }).then((response) => {
          var obj = response.data;
          this.lightRead = obj.message;
          //console.log("lightRead: " + obj.message);

        }).catch((error) => {
          console.log(error);
        });
      }
  
    
    },
      beforeMount() {
      this.getDS18B20();  
      this.getData(); 
      this.getDHT11();
      this.getThermostat();
      this.getAlarm();
      this.getLight();
   
    },
    mounted() {

    }  
  };

</script>
<style>
</style>

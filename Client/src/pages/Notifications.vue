<template>
  <div class="row">

    <div class="col-md-12" style="position: relative; width: 980px;">
      <card>
        <div class="visualization" style="position: relative; width: 980px;">
        <img src="img/makieta.png">   

        <div class="ds18b20" style="position: absolute; top: 240px; left: 280px;">
          <img src="img/temperature.png" style="width: 25px;">
          <p class="d-inline" style="color: black">{{ temperature }}</p>
        </div> 

        <div class="dht11" style="position: absolute; top: 540px; left: 280px;">
          <img src="img/temperature.png" style="width: 25px;">
          <p class="d-inline" style="color: black">{{ dht11_temperature }}</p>
          <br>
          <img src="img/humidity.png" style="width: 25px">
          <p class="d-inline" style="color: black"> {{ humidity }} </p>
        </div> 

        <div class="window" style="position: absolute; top: 300px; left: 790px;">
          <img src="img/windowopen.png" style="width: 25px;">
          <p style="color: black">{{ window }}</p>
        </div> 

        <div class="airconditioner" style="position: absolute; top: 600px; left: 540px;">
          <img src="img/air-conditioner-off.png" style="width: 25px;">
        </div> 

        </div>
      </card>
    </div>
  </div>
</template>
<script>

  import axios from 'axios';


  export default {
    components: {
      
    },
    data() {
      return {
        temperature: 25,
        dht11_temperature: 25,
        humidity: 80
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
          if(obj.deviceStatus[0].window_open <= 650) {
            this.window = "zamknięte"
          } else if(obj.deviceStatus[0].window_open >= 1500) {
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
        this.temperature = x[0];
        console.log(x[0]);

        })
        .catch((error) => {
          console.log(error);
        });
      },

      getDHT11: function(event) {

      axios.get('http://192.168.1.48:3000/dht11', {
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
        this.dht11_temperature = obj.records[0].temperature;
        this.humidity = obj.records[0].humidity;
        /*for (var i in obj.records) {
          x[i] = obj.records[i].humidity;
          y[i] = obj.records[i].temperature;
          dateHMS = new Date(obj.records[i].date);
          hours = dateHMS.getHours();
          minutes = dateHMS.getMinutes();
          seconds = dateHMS.getSeconds();
          z[i] = hours + ":" + minutes + ":" + seconds; 
        }*/

      })
      .catch((error) => {
        console.log(error);
      });
      },

    },
    beforeMount() {
      this.getDS18B20();
      this.getDHT11();
    }
  };

</script>
<style>
</style>

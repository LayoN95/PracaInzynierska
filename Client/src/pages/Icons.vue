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
        path: 'http://192.168.1.48:3000'
      };
    },
    methods: {
          /*getData: function(event) {
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
          lightStatus = obj.state;
          console.log(data);
          console.log("GET DATA");
          console.log(obj.deviceStatus[0].state);
          console.log(lightStatus);
              console.log(response);
          })
          .catch((error) => {
              console.log(error);
          });  

        }*/
  
    
    },
      beforeMount() {
      //this.getData(); 
      console.log("123"); 
    },
    mounted() {
       console.log("456");
    }  
  };

</script>
<style>
</style>

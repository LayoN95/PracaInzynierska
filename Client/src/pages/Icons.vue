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
      beforeMount() {
        this.getData();
    },
            getData: function(event) {
          axios.get(`${this.path}/devicestatus/`, {
           headers: {
                'Access-Control-Allow-Origin': '*',
              }
          })
          .then((response) => {
          var obj = response.data;
          lightStatus = obj.state;
          console.log(obj.state);
          console.log(lightStatus);
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

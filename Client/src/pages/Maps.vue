<template>
<div class="row">
      <div class="col-md-6">
        <card>
          <h4 slot="header">Light 1</h4>
          <button v-on:click="turnOn">Turn the lights on!</button>
        </card>
      </div>
      <div class="col-md-6">
        <card>
          <h4 slot="header">Light 2</h4>
          <button v-on:click="turnOn">Turn the lights on!</button>
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
      var id = 21;
      return {
   
      };
    },
    methods: {
      turnOn: function (event) {
            axios.post('http://192.168.1.48:3000/leds/' + id /*this.id*/ + '/1', {
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
      turnOff: function (event) {
            axios.post('http://192.168.1.48:3000/leds/' + id /*this.id*/+ '/0', {
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

    }
  };

 
</script>
<style>
</style>

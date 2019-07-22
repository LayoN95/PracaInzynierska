<template>
<div class="row">
      <div class="col-md-6">
        <card>
          <h4 slot="header">Light 1</h4>
          <button v-on:click="turnOn" id="21">Turn the lights on!</button>
          <button v-on:click="turnOff" id="21">Turn the lights off!</button>
        </card>
      </div>
      <div class="col-md-6">
        <card>
          <h4 slot="header">Light 2</h4>
          <button v-on:click="turnOn" id="20">Turn the lights on!</button>
          <button v-on:click="turnOff" id="20">Turn the lights off!</button>
          <input v-model="id" placeholder="edit me">
          <input type="date" v-model="mydate" />
          <input type="time" v-model="mytime" />
          <p>{{ mydate }}</p>
          <p>{{ mytime }}</p>

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
        id: 21,
      };
    },
    methods: {
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

    }
  };

 
</script>
<style>
</style>

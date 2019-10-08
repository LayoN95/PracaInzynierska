<template>
  <div class="row">

    <div class="col-md-12" style="position: relative; width: 980px;">
      <card>
        <div class="visualization" style="position: relative; width: 980px;">
        <img src="img/makieta.png">   
        <div class="tempVis" style="position: absolute; top: 240px; left: 280px;">
          <img src="img/temperature.png" style="width: 25px;">
          <p style="color: black">{{ temperature }}</p>
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
        temperature: 25
      };
    },
    methods: {
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
    },
    beforeMount() {
      this.getDS18B20();
    }
  };
</script>
<style>
</style>

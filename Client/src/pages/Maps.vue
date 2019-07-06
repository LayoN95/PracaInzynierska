<template>
    <card type="plain" title="Google Maps">
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
    </card>
</template>
<script>
  import LineChart from './LineChart.js';
    import axios from 'axios';

  
  export default {
    components: {
      LineChart
    },
    data () {
        return {
        datacollection: null,
        table: [21, 24, 26, 20, 18]
      }
    },
    mounted () {
      this.fillData(),
      this.getData()
    },
    methods: {
      fillData () {
        this.getData(),
        this.datacollection = {
          labels: ["1","2","3","4","5"],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: this.table
            }
          ]
        }
        console.log("filldata: " + this.table);
      },
      getData() {
        axios.get('http://192.168.1.48:3000/', {
              headers: {
                'Access-Control-Allow-Origin': '*',
              }
        })
        .then((response) => {
        var obj = response.data;
        var x = [];
        for (var i in obj.ds18b20) {
          x[i] = obj.ds18b20[i].temperature
        }
        console.log(x);
        this.table = x;
        console.log(this.table);
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

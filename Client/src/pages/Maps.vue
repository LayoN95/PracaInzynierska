<template>
    <card type="plain" title="Google Maps">
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
    </card>
</template>
<script>
  import LineChart from './LineChart.js'
  
  export default {
    components: {
      LineChart
    },
    data () {
      var table = [12, 14, 17, 21, 34];
      console.log(table);
      return {
        datacollection: null
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
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
        console.log("filldata" + this.table);
      },
     
    }
  };
</script>
<style>
</style>

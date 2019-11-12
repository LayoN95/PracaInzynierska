<template>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title">
          <div class="table-responsive">
            <base-table :data="table1.data"
                        :columns="table1.columns"
                        thead-classes="text-primary">
            </base-table>
          </div>


        </card>
      </div>

      <div class="col-12">
        <card class="card-plain">
          <!--<div class="table-full-width table-responsive">
            <base-table :title="table2.title" :sub-title="table2.subTitle" :data="table2.data"
                         :columns="table2.columns">

            </base-table>
          </div>-->
        </card>
      </div>

    </div>
</template>
<script>
import { BaseTable } from "@/components";
  import axios from 'axios';

var table = [];
const tableColumns = ["temperature", "humidity", "date"];
 

export default {
  components: {
    BaseTable
  },
  data() {

    return {
      
      table1: {
        title: "DHT 11 Table:",
        columns: [...tableColumns],
        data: [...table]
      }
    };
  },
  methods: {
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
        table = response.data.records;

        for (var i in obj.records) {
          x[i] = obj.records[i].humidity;
          y[i] = obj.records[i].temperature;
          dateHMS = new Date(obj.records[i].date);
          hours = dateHMS.getHours();
          minutes = dateHMS.getMinutes();
          seconds = dateHMS.getSeconds();
          z[i] = hours + ":" + minutes + ":" + seconds; 
        }

        console.log(table);
        console.log(x);
        console.log(y);
      })
      .catch((error) => {
        console.log(error);
      }); 
  }
},
beforeMount(){
  this.getDHT11();
  console.log(tableData);

}
}
</script>
<style>
</style>

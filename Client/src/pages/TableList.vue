<template>
    <div class="row">
      <div class="col-12">
        <card :title="123">
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

const tableColumns = ["Name", "Country", "City", "Salary"];
/*const tableData = [
  {
    id: 1,
    name: "Dakota Rice",
    salary: "$36.738",
    country: "Niger",
    city: "Oud-Turnhout",
  },
  {
    id: 2,
    name: "Minerva Hooper",
    salary: "$23,789",
    country: "Curaçao",
    city: "Sinaai-Waas"
  },
  {
    id: 3,
    name: "Sage Rodriguez",
    salary: "$56,142",
    country: "Netherlands",
    city: "Baileux"
  },
  {
    id: 4,
    name: "Philip Chaney",
    salary: "$38,735",
    country: "Korea, South",
    city: "Overland Park"
  },
  {
    id: 5,
    name: "Doris Greene",
    salary: "$63,542",
    country: "Malawi",
    city: "Feldkirchen in Kärnten"
  },
  {
    id: 6,
    name: 'Mason Porter',
    salary: '$98,615',
    country: 'Chile',
    city: 'Gloucester'
  },
  {
    id: 7,
    name: 'Jon Porter',
    salary: '$78,615',
    country: 'Portugal',
    city: 'Gloucester'
  }
]; */

export default {
  components: {
    BaseTable
  },
  data() {
    var table = [];
    return {
      
      /*table1: {
        title: "Simple Table",
        columns: [...tableColumns],
        data: [...tableData]
      },
      table2: {
        title: "Table on Plain Background",
        columns: [...tableColumns],
        data: [...tableData]
      }*/

      table1: {
        title: "Simple Table:",
        columns: [...tableColumns],
        data: table.records
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
        this.table = response.data;

        for (var i in obj.records) {
          x[i] = obj.records[i].humidity;
          y[i] = obj.records[i].temperature;
          dateHMS = new Date(obj.records[i].date);
          hours = dateHMS.getHours();
          minutes = dateHMS.getMinutes();
          seconds = dateHMS.getSeconds();
          z[i] = hours + ":" + minutes + ":" + seconds; 
        }

        console.log(obj);
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
}
}
</script>
<style>
</style>

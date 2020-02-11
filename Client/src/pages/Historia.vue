<template>
  <div class="row">
    <div class="col-md-6">
      <card :title="dht11_table.title">
        <div
          style="height: 400px; overflow-x: hidden;"
          class="table-responsive"
        >
          <base-table
            :data="dht11_table.data"
            :columns="dht11_table.columns"
            thead-classes="text-primary"
          >
          </base-table>
        </div>
      </card>
    </div>

    <div class="col-md-6">
      <card :title="ds18b20_table.title">
        <div
          style="height: 400px; overflow-x: hidden;"
          class="table-responsive"
        >
          <base-table
            :data="ds18b20_table.data"
            :columns="ds18b20_table.columns"
            thead-classes="text-primary"
          >
          </base-table>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { BaseTable } from "@/components";
import axios from "axios";
import { path } from "../pages/variables";

var table = [];
var ds_table = [];
const tableColumns = ["temperature", "humidity", "date"];

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      dht11_table: {
        title: "DHT 11 Table:",
        columns: [...tableColumns],
        data: [...table]
      },
      ds18b20_table: {
        title: "DS18B20 Table:",
        columns: [...tableColumns],
        data: [...ds_table]
      }
    };
  },
  methods: {
    getDHT11: function(event) {
      axios
        .get(`${path}/dht11`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
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
        .catch(error => {
          console.log(error);
        });
    },
    getDS18B20: function(event) {
      axios
        .get("http://192.168.1.48:3000/", {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          var obj = response.data;
          ds_table = response.data.ds18b20;
          var x = [];
          for (var i in obj.ds18b20) {
            x[i] = obj.ds18b20[i].temperature;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  beforeMount() {
    this.getDHT11();
    this.getDS18B20();
    console.log(tableData);
  },
  mounted() {
    this.getDHT11();
    this.getDS18B20();
  }
};
</script>
<style></style>

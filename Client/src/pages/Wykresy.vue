<template>
  <div>
    <div class="row">
      <div class="col-md-6" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{ $t("dashboard.dht11") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-bell-55 text-primary "></i> DHT11 Temperatura +
              Wilgotność
            </h3>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              ref="purpleChart"
              chart-id="purple-line-chart"
              :chart-data="purpleLineChart.chartData"
              :gradient-colors="purpleLineChart.gradientColors"
              :gradient-stops="purpleLineChart.gradientStops"
              :extra-options="purpleLineChart.extraOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>

      <div class="col-md-6" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{ $t("dashboard.completedTasks") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-send text-success "></i> DS18B20 Temperatura
            </h3>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              chart-id="green-line-chart"
              :chart-data="greenLineChart.chartData"
              :gradient-stops="greenLineChart.gradientStops"
              :extra-options="greenLineChart.extraOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-12"></div>
      <div class="col-lg-6 col-md-12"></div>
    </div>
  </div>
</template>
<script src="/socket.io/socket.io.js"></script>

<script>
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import TaskList from "./Dashboard/TaskList";
import UserTable from "./Dashboard/UserTable";
import config from "@/config";
import { path } from "../pages/variables";

import axios from "axios";

var table = [
  [12, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100, 200],
  [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120, 200],
  [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130, 200]
];

var table2 = [
  [12, 70, 90, 70, 85, 60, 200, 60, 90, 80, 11, 10, 100],
  [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120, 100],
  [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130, 100]
];

var chartLabels = [];
var dhtChartTemp = [1, 2, 3, 4, 5, 6];
var dhtChartHumid = [];

export default {
  components: {
    LineChart,
    BarChart,
    TaskList,
    UserTable
  },

  data() {
    var id = 21;
    var tabelaTemp = [12, 21, 43, 12, 12, 32];
    return {
      Temperature: {},
      Dht11: {},

      bigLineChart: {
        allData: table,
        activeIndex: 0,
        chartData: null,
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: []
      },
      purpleLineChart: {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: null,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0]
      },
      greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: null,
        gradientColors: [
          "rgba(66,134,121,0.15)",
          "rgba(66,134,121,0.0)",
          "rgba(66,134,121,0)"
        ],
        gradientStops: [1, 0.4, 0]
      },
      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ["USA", "GER", "AUS", "UK", "RO", "BR"],
          datasets: [
            {
              label: "Countries",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [53, 20, 10, 80, 100, 45]
            }
          ]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0]
      }
    };
  },
  computed: {
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
    bigLineChartCategories() {
      return this.$t("dashboard.chartCategories");
    }
  },
  methods: {
    fillData: function(event) {
      this.initBigChart();

      console.log(this.bigLineChart.allData);
    },
    //Włączenie wybranej diody led
    turnOn: function(event) {
      axios
        .post(`${path}/leds/${this.id}/1`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //Wyłączenie wybranej diody led
    turnOff: function(event) {
      axios
        .post(`${path}/leds/${this.id}/0`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },

    getDS18B20: function(event) {
      axios
        .get(`${path}/`, {
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
          for (var i in obj.ds18b20) {
            x[i] = obj.ds18b20[i].temperature;
            dateHMS = new Date(obj.ds18b20[i].date);
            hours = dateHMS.getHours();
            if (hours == 0) {
              hours = "00";
            }
            minutes = dateHMS.getMinutes();
            if (minutes == 0) {
              minutes = "00";
            }
            seconds = dateHMS.getSeconds();
            if (seconds == 0) {
              seconds = "00";
            }
            y[i] = hours + ":" + minutes + ":" + seconds;
          }

          let chartData = {
            labels: y.reverse(),
            datasets: [
              {
                label: "Temperatura: ",
                fill: true,
                borderColor: config.colors.danger,
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: config.colors.danger,
                pointBorderColor: "rgba(255,255,255,0)",
                pointHoverBackgroundColor: config.colors.danger,
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: x.reverse()
              }
            ]
          };
          this.greenLineChart.chartData = chartData;

          console.log(x);
          console.log(y);
          this.tabelaTemp = x;
          this.bigLineChart.allData = x;
          this.chartLabels = y;
          this.Temperature = this.tabelaTemp;
        })
        .catch(error => {
          console.log(error);
        });
    },

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

          for (var i in obj.records) {
            x[i] = obj.records[i].humidity;
            y[i] = obj.records[i].temperature;
            dateHMS = new Date(obj.records[i].date);
            hours = dateHMS.getHours();
            if (hours == 0) {
              hours = "00";
            }
            minutes = dateHMS.getMinutes();
            if (minutes == 0) {
              minutes = "00";
            }
            seconds = dateHMS.getSeconds();
            if (seconds == 0) {
              seconds = "00";
            }
            z[i] = hours + ":" + minutes + ":" + seconds;
          }

          let chartData = {
            labels: z.reverse(),
            datasets: [
              {
                label: "Temperatura: ",
                fill: false,
                borderColor: config.colors.primary,
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: config.colors.primary,
                pointBorderColor: "rgba(255,255,255,0)",
                pointHoverBackgroundColor: config.colors.primary,
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: y.reverse()
              },
              {
                label: "Wilgotność: ",
                fill: false,
                borderColor: "rgba(0,154,250,1)",
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: "rgba(0,154,250,1)",
                pointBorderColor: "rgba(0,154,250,1))",
                pointHoverBackgroundColor: "rgba(0,154,250,1)",
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: x.reverse()
              }
            ]
          };
          this.purpleLineChart.chartData = chartData;

          //console.log(x);
          //console.log(y);
        })
        .catch(error => {
          console.log(error);
        });
    },

    initBigChart() {
      let chartData = {
        datasets: [
          {
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.allData
          }
        ],
        labels: this.chartLabels
      };
      //this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      //this.bigLineChart.activeIndex = index;
    }
  },
  beforeMount() {
    this.getDHT11();
    this.getDS18B20();
    this.fillData();
  },

  mounted() {
    getDS18B20();
    fillData();

    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }
    this.initBigChart(0);
  },
  beforeDestroy() {
    if (this.$rtl.isRTL) {
      this.i18n.locale = "en";
      this.$rtl.disableRTL();
    }
  }
};
</script>
<style></style>

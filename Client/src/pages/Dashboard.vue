<template>
  <div>

    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">{{$t('dashboard.totalShipments')}}</h5>
                <h2 class="card-title">{{$t('dashboard.performance')}}</h2>
              </div>

            </div>
          </template>
          <!-- Szeroki Wykres -->
          <div class="chart-area">
            <input v-model="id" placeholder="edit me">
            <button v-on:click="turnOn">Turn the lights on!</button>

            <button v-on:click="turnOff">Turn the lights off!</button>

            <button v-on:click="getData">Get data from mongoDB</button>
            <button @click="fillData()">Randomize</button>

            <line-chart style="height: 50%" 
              ref="bigChart"
              chart-id="big-line-chart"
              :chart-data="datacollection">
              <!--Big chart -->
            </line-chart>
             
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.totalShipments')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-bell-55 text-primary "></i> 763,215</h3>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%">
              <!-- Purple line chart -->
            </line-chart> 
          </div>
        </card>
      </div>
      <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.dailySales')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-delivery-fast text-info "></i> 3,500€</h3>
          </template>
          <div class="chart-area">
            <bar-chart style="height: 100%">
                <!-- Bar chart -->
            </bar-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.completedTasks')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-send text-success "></i> 12,100K</h3>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%">
              <!-- Green line chart -->
            </line-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <card type="tasks" :header-classes="{'text-right': isRTL}">
          <template slot="header">
            <h6 class="title d-inline">{{$t('dashboard.tasks', {count: 5})}}</h6>
            <p class="card-category d-inline">{{$t('dashboard.today')}}</p>
            <base-dropdown menu-on-right=""
                           tag="div"
                           title-classes="btn btn-link btn-icon"
                           aria-label="Settings menu"
                           :class="{'float-left': isRTL}">
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.action')}}</a>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.anotherAction')}}</a>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.somethingElse')}}</a>
            </base-dropdown>
          </template>
          <div class="table-full-width table-responsive">
            <task-list></task-list>
          </div>
        </card>
      </div>
      <div class="col-lg-6 col-md-12">
        <card class="card" :header-classes="{'text-right': isRTL}">
          <h4 slot="header" class="card-title">{{$t('dashboard.simpleTable')}}</h4>
          <div class="table-responsive">
            <user-table></user-table>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import TaskList from './Dashboard/TaskList';
  import UserTable from './Dashboard/UserTable';
  import config from '@/config';

  import axios from 'axios';

  export default {
    components: {
      LineChart,
      BarChart,
      TaskList,
      UserTable
    },
 
    data() {
      var id = 21;
           return {
        Dht11: {},
        datacollection: null,
        table: [],
        dateTable: []
 
      }
    },
    computed: {
      enableRTL() {
        return this.$route.query.enableRTL;
      },
      isRTL() {
        return this.$rtl.isRTL;
      },
    },
    methods: {
      //wypełnienie wykresu
      fillData() {
        this.getData(),
        this.datacollection = {
          labels: this.dateTable,
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: this.table
            }
          ]
        }
      },

      //Włączenie wybranej diody led
      turnOn: function (event) {
            axios.post('http://192.168.1.48:3000/leds/' + this.id + '/1', {
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
      //Wyłączenie wybranej diody led
      turnOff: function (event) {
            axios.post('http://192.168.1.48:3000/leds/' + this.id + '/0', {
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

      getData: function (event) {
        axios.get('http://192.168.1.48:3000/', {
              headers: {
                'Access-Control-Allow-Origin': '*',
              }
        })
        .then((response) => {
        var obj = response.data;
        var x = [];
        var y = [];
        for (var i in obj.ds18b20) {
          x[i] = obj.ds18b20[i].temperature;
          y[i] = obj.ds18b20[i].date;
        }

        this.table = x;
        this.dateTable = y;
        console.log(table);
        console.log(dateTable);
        })
        .catch((error) => {
          console.log(error);
        });
      },

    },
       mounted() {
         this.fillData(),
         this.getData(),

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

          //Konwersja z łańcucha znaków do liczb
          //var integer = parseInt(obj.ds18b20[i].temperature, 10);
          //x[i] = integer;
        }
        console.log(x);

        this.Temperature = x;
        
      })
      .catch((error) => {
        console.log(error);
      });

      axios.get('http://192.168.1.48:3000/dht11', {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      })
      .then((response) => {
     
        var obj = response.data;
        var x = [];

        for (var i in obj.records) {
          x[i] = obj.records[i].humidity;

          //Konwersja z łańcucha znaków do liczb
          //var integer = parseInt(obj.ds18b20[i].temperature, 10);
          //x[i] = integer;
        }
        console.log(x);

        this.Dht11 = x;
        
      })
      .catch((error) => {
        console.log(error);
      });

      this.i18n = this.$i18n;
      if (this.enableRTL) {
        this.i18n.locale = 'ar';
        this.$rtl.enableRTL();
      }
      this.initBigChart(0);
    },
    beforeDestroy() {
      if (this.$rtl.isRTL) {
        this.i18n.locale = 'en';
        this.$rtl.disableRTL();
      }
    }
  };
</script>
<style>
</style>

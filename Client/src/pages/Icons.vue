<template>
<div class="row">
      <div class="col-md-6">
        <card>
          <h4 slot="header">Light 1</h4>
          <button v-on:click="turnOn" id="21">Turn the lights on!</button>
          <button v-on:click="turnOff" id="21">Turn the lights off!</button>

          <button v-on:click="turnOn" id="20">Turn the lights on!</button>
          <button v-on:click="turnOff" id="20">Turn the lights off!</button>
        </card>
      </div>
      <div class="col-md-6">
        <card>
          <h4 slot="header">Termostat</h4>
          <knob-control
          :min="10"
          :max="35"
          :size="100"
          secondary-color="#66CC66"
          text-color="#66CC66"
          v-model="thermostat"
          id="thermostatKnob"
          ></knob-control>
          <label for="thermostatKnob">Ustaw temperaturę</label>
          <button v-on:click="setTemperature">Zapisz</button>
        </card>
      </div>
      <div class="col-md-6">
        <card>
          <h4 slot="header">Schedule</h4>

          <label for="timeStart">TurnOn: </label>
          <input type="time" id="timeStart" v-model="timeStart" />
          <p>Start godzina: {{ timeStart }}</p>

          <label for="timeEnd">TurnOff: </label>
          <input type="time" id="timeEnd" v-model="timeEnd" />
          <p>Stop godzina: {{ timeEnd }}</p>
          <button v-on:click="submit">Submit!</button>

          

          <!--
            <input v-model="thermostat" placeholder="Set temperature">
          -->

        </card>
      </div>
        <div class="col-md-6">
        <card>
          <h4 slot="header">ServoControl</h4>

          <knob-control
          :min="600"
          :max="2500"
          :size="100"
          secondary-color="#66CC66"
          text-color="#66CC66"
          v-model="servoControl"
          id="servoControlKnob"
          ></knob-control>
          <base-button slot="footer" v-on:click="servoSubmit" type="primary" fill>Save</base-button>
          <!--<input v-model="servoControl" placeholder="edit me">-->

          <button v-on:click="servoSubmit">Submit!</button>
        </card>
      </div>
      <div class="col-12">
        <card>
          <h4 slot="header">Alarm</h4>

          <h1>Reset: </h1>
          <button v-on:click="reset">Reset!</button>
          <input type="checkbox" id="checkbox" v-model="checked">
          <label for="checkbox">{{ checked }}</label>
            <div id="chart">
            </div>

        </card>
      </div>
</div>
</template>
<script>
   import axios from 'axios';
   import Vue from 'vue';

export default {

};
</script>
<style>
</style>

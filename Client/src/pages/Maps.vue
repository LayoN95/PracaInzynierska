<template>
<div class="row">
      <div class="col-md-6">
        <card>
          <h4 slot="header">Light 1</h4>
          <button v-on:click="turnOn">Turn the lights on!</button>
        </card>
      </div>
      <div class="col-md-6">
        <card>
          <h4 slot="header">Light 2</h4>
          <button v-on:click="turnOn">Turn the lights on!</button>
        </card>
      </div>
</div>
</template>
<script>
    import axios from 'axios';
    export default {};

 
</script>
<style>
</style>

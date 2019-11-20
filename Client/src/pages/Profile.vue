<template>
  <div class="row">
    <div class="col-md-12">
      <img :src="camera_picture">
    </div>


  </div>

</template>




<script>
  import EditProfileForm from './Profile/EditProfileForm';
  import UserCard from './Profile/UserCard';
  import Vue from 'vue';


  /*
  import Vue from 'vue';
  import VueSocketIO from 'vue-socket.io';

Vue.use(new VueSocketIO({
  connection: 'http://192.168.1.48:8081'
}))
*/


  export default {
    components: {
      EditProfileForm,
      UserCard
    },
    data() {
      return {
        //socket : io('http://192.168.1.48:3000'),
        camera_picture: 'http://192.168.1.152:8080/shot.jpg'
      }
    },

    methods: {
          
        getCamera: function (event) {
          setInterval(function () {
          this.camera_picture = 'http://192.168.1.152:8080/shot.jpg';
          }, 1000);
        

      }
    },
    mounted(){
      this.getCamera();
    },

    beforeMount(){
    }
  /*,
    methods: {
      sendMessage(e){
        e.preventDefault();
      }
    }*/
  };
</script>
<style>
</style>

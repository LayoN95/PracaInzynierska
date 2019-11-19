<template>
  <div class="row">
    <div class="col-md-8">
      <edit-profile-form :model="model">
      </edit-profile-form>
    </div>
    <div class="col-md-4">
      <user-card :user="user"></user-card>
    </div>
    <div class="col-md-8">
      <h1>SOCKET.IO</h1>
    </div>
  </div>

</template>




<script>
  import EditProfileForm from './Profile/EditProfileForm';
  import UserCard from './Profile/UserCard';
  import io from 'socket.io-client';

  /*
  import Vue from 'vue';
  import VueSocketIO from 'vue-socket.io';

Vue.use(new VueSocketIO({
  connection: 'http://192.168.1.48:8081'
}))
*/

  const socket = io("http://192.168.1.48:3000");

  export default {
    components: {
      EditProfileForm,
      UserCard
    },
    data() {
      return {
        //socket : io('http://192.168.1.48:3000'),

        model: {
          company: 'Creative Code Inc.',
          email: 'mike@email.com',
          username: 'michael23',
          firstName: 'Mike',
          lastName: 'Andrew',
          address: 'Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09',
          city: 'Melbourne',
          country: 'Australia',
          about: 'Lamborghini Mercy, Your chick she so thirsty, I\'m in that two seat Lambo.'
        },
        user: {
          fullName: 'Mike Andrew',
          title: 'Ceo/Co-Founder',
          description: `Do not be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...`,
        }
      }
    },
    sockets: {
      connect: function(event) {
        console.log('socket connected');
      },
      news: function(data){
        console.log(data);
      },
      customEmit: function (data) {
        console.log('this method was fired by the socket server eg: io.');
      },
      BH1750: function (data) {
        console.log(data);
      }
    },
    methods: {
      clickButton: function(data) {
        this.socket.emit('emit_method', data)
      },
      first_emit: function(event){
        console.log("EMIT");
        socket.emit('emit_method', {message: 'hello'})
      },
      writeText: function(event){
        console.log("WRITE TEXT METHOD");
      }

    },
    beforeMount(){
      this.first_emit();
      this.writeText();
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

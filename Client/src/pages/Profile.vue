<template>
  <div class="row">
    <div class="col-md-12">
      <card>
        <iframe
          style="width: 640px; height: 480px;"
          src="http://192.168.1.152:8080/browserfs.html"
        ></iframe>
      </card>
    </div>
  </div>
</template>

<script>
import EditProfileForm from "./Profile/EditProfileForm";
import UserCard from "./Profile/UserCard";
import Vue from "vue";

export default {
  components: {
    EditProfileForm,
    UserCard
  },
  data() {
    return {
      camera_picture: "http://192.168.1.152:8080/shot.jpg"
    };
  },

  methods: {
    getCamera: function(event) {
      setInterval(function() {
        this.camera_picture = "http://192.168.1.152:8080/shot.jpg";
      }, 1000);
    }
  },
  mounted() {
    this.getCamera();
  },

  beforeMount() {}
  /*,
    methods: {
      sendMessage(e){
        e.preventDefault();
      }
    }*/
};
</script>
<style></style>

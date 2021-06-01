
<template>
  <div class="container">
    <div class="jumbotron">
      <h3>{{content}}</h3>
    </div>

    
      <div v-for="photo, index in userAllPhotos" :key="index">
        <img :src="photo.imageUrl" alt="">
      </div>
  </div>
</template>

<script>
import UserService from './../services/user.service.js';
import {mapGetters, mapActions } from 'vuex';
export default {
    name: 'User',
    data() {
        return {
            content: '',
            photos: []
        };
    },

    mounted() {
        UserService.getUserBoard()
            .then( response => this.content = response.data ,
                   error => this.content =  (error.response && error.response.data) || error.message || error.toString()
            );
    },

    computed: {

          ...mapGetters(['userAllPhotos'])
    },

    methods: {

      ...mapActions(['fetchUserAllPhotosAction']),


      async fetchUserAllPhotos() { 
          try{ 
              const userUuid = this.currentUser.uuid; 
              await this.$store.dispatch("fetchUserAllPhotosAction", userUuid)
          } catch(error) {
              this.message = (error.response && error.response.data) || error.message || error.toString();
          }
      },
    }
};
</script>

<style scoped>

</style>

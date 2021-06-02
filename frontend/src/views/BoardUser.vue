
<template>
  <div class="container">
    <div class="jumbotron">
      <h3>{{content}}</h3>
    </div>

        <h3>All Photo</h3>
        <div class="photo-container">
          <div v-for="photo in userAllPhotos" :key="photo.id" class="photo-block">
            <div>
              <div>{{photo.title}}</div>
              <div>{{photo.ownerId}}</div>
              <div>{{photo.imageUrl}}</div>
              <div>{{photo.comments}}</div>
            </div>
               <img :src="photo.imageUrl"  :alt='"picture of " + photo.title' class="photos"
                    data-toggle="modal" data-target="#photoModal"/> 
          </div>
          <div v-for="photo, index in userAllPhotos" :key="index">
            <img :src="photo.imageUrl" alt="photo.title picture">
          </div>


        </div>

  </div>
</template>

<script>
import UserService from './../services/user.service.js';
import {mapGetters, mapActions } from 'vuex';
export default {
    name: 'UserBoard',
    data() {
        return {
            content: '',
            photos: ''
        };
    },

    mounted() {
        // UserService.getUserBoard()
        // .then( response => {
        //   this.content = response.data ,
        //   error => this.content =  (error.response && error.response.data) || error.message || error.toString()
        // })
    },

    computed: {
          ...mapGetters(['userAllPhotos']),
          currentUser() {
      return this.$store.state.auth.user;
    }, 
    },

    

    methods: {

      ...mapActions(['fetchUserAllPhotosAction']),


      async fetchUserAllPhotos() { 
          try{ 
              const userUuid = this.currentUser.uuid; 
              console.log(userUuid);
              await this.$store.dispatch("fetchUserAllPhotosAction", userUuid)
          } catch(error) {
              this.message = (error.response && error.response.data) || error.message || error.toString();
          }
      },
    },

    created() {
      UserService.getUserBoard()
        .then( response => {
          this.content = response.data ,
          error => this.content =  (error.response && error.response.data) || error.message || error.toString()
        })
      this.fetchUserAllPhotos();
    }
};
</script>

<style lang="scss" scoped>
.photos {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%; 
  height: auto;
  transition: transform 200ms;
  &:hover {
    transform: scale(0.98);    
    box-shadow: 0 0 2px 3px rgba(18, 34, 253, 0.6);
    border-radius: 4px;  /* Rounded border */
  }

// .photo-modal {
//   width: 90vw;
//   display: block;
//   margin-left: auto;
//   margin-right: auto;
// }

}
.photo-block {
  margin : 30px; 
  border: 1px solid lightblue;
  padding: 20px;
  overflow-x: hidden;
}

</style>

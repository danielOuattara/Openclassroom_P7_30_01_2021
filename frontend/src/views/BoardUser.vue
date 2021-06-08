
<template>
  <div class="container">
    <div class="jumbotron">
      <h3>{{content}}</h3>
    </div>

    <AddPhoto/>

    <h3>All Photo</h3>
      <PhotosWall/>
  </div>
</template>

<script>
import UserService from './../services/user.service.js';
import {mapGetters, mapActions } from 'vuex';
import AddPhoto from './../components/main/AddPhoto.vue';
import PhotosWall from './../components/main/Home/PhotosWall.vue';
export default {
    name: 'UserBoard',
    components: {
      AddPhoto,
      PhotosWall
    },
    data() {
        return {
            content: '',
            photos: ''
        };
    },

    mounted() {
        UserService.getUserBoard()
        .then( response => {
          this.content = response.data ,
          error => this.content =  (error.response && error.response.data) || error.message || error.toString()
        })
    },

    computed: {
      ...mapGetters(['userData']),
      
      currentUser() {
          return this.$store.state.auth.user;
      }, 
    },

    methods: {

      ...mapActions(['fetchOneUserAction']),


      async fetchUserAllPhotos() { 
          try{ 
              const userUuid = this.currentUser.uuid; 
              console.log(userUuid);
              await this.$store.dispatch("fetchOneUserAction", userUuid)
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
      }),

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


<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Wall of photo</h3>
    </header>
    <div>
      <h3>Photos</h3>
      <!-- <p>{{allPhotos}}</p> -->
      <div class="todos">
        <div v-for="photo in allPhotos" 
             :key="photo.id"
             class="photo-container">
              <img :src="photo.imageUrl" 
                   :alt='"picture of " + photo.title'
                   class="photos">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'Home',
    data() {
        return {
        content: '',
        comments: '',
        likes:'',
        };
    },

    computed: {
          ...mapGetters(['allPhotos']),
    },

      methods: {
      ...mapActions(['fetchAllPhotos']),
  },

    created() {
      this.fetchAllPhotos();
      },


};

</script>

<style scoped>

* {
  list-style-type: none;
}
/* img {
  width: 500px;
  height: inherit;
  margin: auto
} */

.photos {
  /* display: block; */
  /* margin-left: auto;
  margin-right: auto; */
  max-width: 100%; 
  height: auto;
  /* border: 5px solid #ddd; Gray border */
  /* border-radius: 4px;  Rounded border */
  /* padding: 5px; Some padding */
  /* width: 150px; Set a small width */
  /* margin: 10px; */
}
.photo-container {
  margin : 30px; 
  border: 1px solid lightblue;
  padding: 20px;
}
</style>
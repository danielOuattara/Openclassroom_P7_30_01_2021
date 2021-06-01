<template>
      <div class="photos">
          <h3>All Photo</h3>
        <div v-for="photo in allPhotos" 
             :key="photo.id"
             class="photo-container">
              <div>
                <div>{{photo.title}}</div>
                <div>{{photo.ownerId}}</div>
                <div>{{photo.imageUrl}}</div>
                <div>{{photo.comments}}</div>

              </div>
              <img :src="photo.imageUrl" 
                   :alt='"picture of " + photo.title'
                   class="photos">
        </div> 
      </div> 
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'ShowAllPhotos',

    data() {
        return {};
    },

    computed: {
        ...mapGetters(['allPhotos']),
    },

    methods: {
        ...mapActions(['fetchAllPhotosAction']),   
    },

    created() {
        this.fetchAllPhotosAction();
    },

    mounted() {
      // setInterval(()=> { console.log("refresh photos : "); this.fetchAllPhotosAction()}, 5000) 
    }

};

</script>

<style lang="scss" scoped>


* {
  list-style-type: none;
}
/* img {
  width: 500px;
  height: inherit;
  margin: auto
} */

.photos {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%; 
  height: auto;
  /* border: 5px solid #ddd; Gray border */
  /* border-radius: 4px;  Rounded border */
  /* padding: 5px; Some padding */
  /* width: 150px; Set a small width */
  /* margin: 10px; */
  &:hover {
    transform: scale(1.1);
  }
}
.photo-container {
  margin : 30px; 
  border: 1px solid lightblue;
  padding: 20px;
}

</style>
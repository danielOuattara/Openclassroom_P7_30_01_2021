<template>
  <div class="container">
    <div class="jumbotron">
      <h3>Wall of photo</h3>
    </div>

      <AddPhoto />
      <ShowAllPhotos />
 
  </div>
</template>

<script>
import AddPhoto from './../components/main/AddPhoto.vue'
import ShowAllPhotos from './../components/main/ShowAllPhotos.vue'
// import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'Home',

    components: {
      AddPhoto,
      ShowAllPhotos
    },

    data() {
        return {};
    },
};

</script>

<style scoped>

</style>
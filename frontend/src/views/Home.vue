<template>
  <div class="container">
    <div class="jumbotron">
      <h3>Wall of photo</h3>
    </div>
      <HomeAddPhoto />
      <HomeShowAllPhotos />
  </div>
</template>

<script>
import HomeAddPhoto from '../components/main/Home_AddPhoto.vue'
import HomeShowAllPhotos from '../components/main/Home_ShowAllPhotos.vue'
export default {
    name: 'Home',

    components: {
      HomeAddPhoto,
      HomeShowAllPhotos
    },

    data() {
        return {};
    },
};

</script>

<style scoped>

</style>
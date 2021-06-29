
<template>
  <div class="admin-board">
      <PhotosReports/>
      <PhotoCommentsReports/>
  </div>
</template>

<script>
import PhotosReports from './../components/main/adminBoard/PhotosReports.vue';
import PhotoCommentsReports from '../components/main/adminBoard/PhotoCommentsReports.vue'
export default {
    name: 'BoardAdmin',
    components: {
        PhotosReports,
        PhotoCommentsReports,

    }
 
};
</script>
<style lang="scss">
.admin-board {
    max-width: 85vw;
    margin: auto;
    // @media screen and (min-width: 740px) {
    //     //  max-width: 60%;
    // }
}
</style>



<template>
  <div class="admin-board">
      <CreateAdmin/>
      <PhotosReports/>
      <PhotoCommentsReports/>
  </div>
</template>

<script>
import CreateAdmin from './../components/main/adminBoard/CreateAdmin.vue';
import PhotosReports from './../components/main/adminBoard/PhotosReports.vue';
import PhotoCommentsReports from '../components/main/adminBoard/PhotoCommentsReports.vue'
export default {
    name: 'BoardAdmin',
    components: {
        CreateAdmin,
        PhotosReports,
        PhotoCommentsReports,

    }
 
};
</script>
<style lang="scss">
.admin-board {
    max-width: 85vw;
    margin: auto;
    @media screen and (min-width: 650px) {
        max-width: 650px;
    }
}
</style>


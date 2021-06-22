<template>
    <div class="home">

        <AddPhoto />
        <PhotosWall v-bind:photosData="allPhotos" />
    </div>
</template>

<script>
import AddPhoto from '../components/main/AddPhoto.vue';
import PhotosWall from '../components/main/Home/PhotosWall';
import { mapGetters, mapActions } from "vuex";
export default {
    name: 'Home',
    components: {
      AddPhoto,
      PhotosWall
    },
      computed: {
    ...mapGetters(["allPhotos", "likesData"]),
    
    currentUser() {
            return this.$store.state.auth.user;
        }
  },

  methods: {
    ...mapActions(["fetchAllPhotosAction", "fetchOnePhotoLikesAction"]),
  },

  mounted() {
    this.fetchAllPhotosAction();
  },

};
</script>
<style lang="scss" scoped>
.home{
    max-width: 90vw;
    margin: auto;
}
</style>


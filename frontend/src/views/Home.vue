<template>
    <div class="container">
        <div class="jumbotron">
            <h3>Wall of photo</h3>
        </div>
        <AddPhoto />
        <PhotosWall />
    </div>
</template>

<script>
import AddPhoto from '../components/main/AddPhoto.vue';
import PhotosWall from '../components/main/Home/PhotosWall';
export default {
    name: 'Home',
    components: {
      AddPhoto,
      PhotosWall
    },
};
</script>
<style lang="scss" scoped>
.container {
    max-width: 800px;
}
</style>


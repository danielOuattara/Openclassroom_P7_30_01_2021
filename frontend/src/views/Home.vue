<template>
    <div class="home">

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
.home{
    max-width: 90vw;
    margin: auto;
}
</style>


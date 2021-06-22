<template>
    <section class="home">
        <AddPhoto />
        <PhotosWall/>
    </section>
</template>

<script>
import AddPhoto from '../components/main/global_components/AddPhoto.vue';
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
section.home{
    max-width: 90vw;
    margin: auto;
}
</style>


<template>
    <section class="home">
        <AddPhoto />
        <HomePhotosWall/>
    </section>
</template>

<script>
import AddPhoto from '../components/main/global_components/AddPhoto.vue';
import HomePhotosWall from '../components/main/home/HomePhotosWall';
export default {
    name: 'Home',
    components: {
      AddPhoto,
      HomePhotosWall
    },
};
</script>
<style lang="scss" scoped>
section.home{
    max-width: 85vw;
    margin: auto;
}
</style>


<template>
    <section class="home">
        <AddPhoto />
        <HomePhotosWall/>
        <SearchUser/>
        <SearchPhoto/>
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
<style lang="scss">
section.home{
    max-width: 85vw;
    margin: auto;
    @media screen and (min-width: 650px) {
        max-width: 650px;
    }
}

</style>


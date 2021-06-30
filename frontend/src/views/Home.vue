<template>
    <section class="home">
        <AddPhoto />
        <SearchUser/>
        <SearchPhoto/>
        <HomePhotosWall/>
    </section>
</template>

<script>
import AddPhoto from '../components/main/global_components/AddPhoto.vue';
import HomePhotosWall from '../components/main/home/HomePhotosWall';
import SearchUser from './../components/main/home/SearchUser.vue';
import SearchPhoto from './../components/main/home/SearchPhoto.vue';
export default {
    name: 'Home',
    components: {
      AddPhoto,
      HomePhotosWall,
      SearchUser,
      SearchPhoto
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


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
import AddPhoto from '../components/main/UserBoard/01_AddPhoto';
import PhotosWall from '../components/main/Home/Wall/PhotosWall';
export default {
    name: 'Home',
    components: {
      AddPhoto,
      PhotosWall
    },

    data() {
        return {};
    },
};
</script>
<style lang="scss" scoped>
.container {
    max-width: 800px;
}
</style>


<template>
    <div class="container">
        <div class="jumbotron">
            <h3>Wall of photo</h3>
        </div>
        <AddPhoto />
        <ShowAllPhotos />
    </div>
</template>

<script>
import AddPhoto from '../components/main/UserBoard/01_AddPhoto';
import ShowAllPhotos from '../components/main/Home/01_ShowAllPhotos';
export default {
    name: 'Home',
    components: {
      AddPhoto,
      ShowAllPhotos
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


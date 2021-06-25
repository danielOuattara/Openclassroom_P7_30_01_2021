<template>
    <section class="wall-background-image">
        <div class="background-image" v-if="userDataGetters.backgroundImage" v-bind:style="{backgroundImage:`url(${userDataGetters.backgroundImage})`}"></div>
        <div class="background-image" v-else v-bind:style="{'background-image': 'url(' + require('@/assets/images/icon.png') + ')'}"></div>
    </section>    
</template>

<script>
import {mapGetters} from 'vuex';
export default {

    computed: {
      ...mapGetters(['userDataGetters']),
    }, 
}
</script>

<style lang="scss">
.wall-background-image{
    min-width: 100vw;
    height: 30vh;
}
.background-image{
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
</style>
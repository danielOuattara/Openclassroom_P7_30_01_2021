<template>
    <section class="wall-background-image">
        <div class="background-image" v-if="userData.backgroundImage" v-bind:style="{backgroundImage:`url(${userData.backgroundImage})`}"></div>
        <div class="background-image" v-else v-bind:style="{'background-image': 'url(' + require('@/assets/images/icon.png') + ')'}"></div>
    </section>    
</template>

<script>
export default {
  props: {
      userData: {
        type: Object,
        default: () => { 
          return {}
        }
      }
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
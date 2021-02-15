<template>
    <header>

      <img src="./../assets/Groupomania_Logos/icon-left-font-monochrome-white.png" alt="">
  
    </header>
</template>

<script>

export default {
  name: 'Header',
  data () {
    return {
        title: 'Groupomania'
    }
  },

  methods: { },

  computed: {}
}
</script>

<style lang="scss" scoped>

  // @font-face {
  //   font-family: 'nevis';
  //   src: url('./../assets/nevis-FontZillion/Fonts/nevis.ttf');
  //   font-weight: 300;
  // }

  // * {
  //   font-family: 'nevis';
  // }

  header {
      // margin: 0;
      background: rgb(218, 160, 15);
      padding: 0.75rem 0;

      img {
        max-width: 50%;
        height: auto;
      }
  }





</style>


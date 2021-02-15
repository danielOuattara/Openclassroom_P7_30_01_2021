<template>
    <footer>
        <p> {{ copyright }}</p>
        
    </footer>
</template>

<script>

export default {
  name: 'Footer',
  data () {
    return {
        copyright: 'Copyright 2021 Groupomania'
    }
  },

  methods: { },

  computed: {}
}
</script>

<style lang="scss" scoped>

  footer  {
  
      background: rgb(218, 160, 15);
      padding: 0.75rem 0;

      p {
        color: #fff;
      }

      img {
        max-width: 60%;
        height: auto;
      }
  }

</style>


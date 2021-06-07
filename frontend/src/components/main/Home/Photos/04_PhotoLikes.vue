<template>
      <div class="bloc bloc-likes">
        <p class="users-likes">
          <font-awesome-icon icon="thumbs-up" />
          <span class="count-likes"> how many likes ?</span>
        </p>
        <p class="users-dislikes">
          <font-awesome-icon icon="thumbs-down" />
          <span class="count-dislikes"> how many dislikes ?</span>
        </p>
      </div>
</template>

<script>
export default {
    props: ['photo'],


    methods: {

          async fetchOnePhotoLikes() {
        try {
            const photoUuid = "da597536-2c6f-41d4-a7cf-df2e7b89779a"
            await this.$store.dispatch("fetchOnePhotoLikesAction", photoUuid)
          } catch(error) {
            this.message = (error.response && error.response.data) || error.message || error.toString();
        }
    }
    }
}
</script>

<style lang="scss" scoped>
// .bloc-likes {
//   grid-row: 6 / span 7;
//   grid-column: 3 / span 2;
// }
</style>
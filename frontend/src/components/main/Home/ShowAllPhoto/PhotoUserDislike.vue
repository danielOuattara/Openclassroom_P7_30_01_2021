<template>
      <div class="user-photo-dislikes">
          <font-awesome-icon  class="thumbs-down" icon="thumbs-down" />
          <span class="count-dislikes"> <span> 11 </span></span>
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
.thumbs-down {
    color: rgb(98, 98, 99);
    font-size: 20px;
    &:hover {
        cursor: pointer;
    }
}
</style>
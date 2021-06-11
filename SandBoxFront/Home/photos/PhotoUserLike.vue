<template>
      <div class="user-photo-likes">
          <font-awesome-icon class="thumbs-up" icon="thumbs-up" />
          <span class="count-likes"> <span> 35 </span></span>
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

.thumbs-up {
    color: rgb(76, 100, 194);
    font-size: 20px;
    &:hover {
        cursor: pointer;
    }
}
</style>
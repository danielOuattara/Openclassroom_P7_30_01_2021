<template>
      <div class="bloc bloc-photo-likes">
        <UserLike />
        <UserDisLike />
 
      </div>
</template>

<script>
import  UserLike from './PhotoUserLike'
import  UserDisLike from './PhotoUserDislike'
export default {

    components: {
      UserLike,
      UserDisLike,
    },
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

.user-photo-likes {
  display: inline-block;
  margin-right: 25px;
}


.user-photo-dislikes {
  display: inline-block;
}

</style>
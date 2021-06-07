<template>
    <button class="btn-thumbs thumbs-down" 
            id="thumbs-up">
        <font-awesome-icon icon="thumbs-down" class=" thumbs thumbs-dislikes" />
        <span class="output dislikes-output">  {{countingDisLikes()}} </span>
    </button>
</template>

<script>
// import 
export default {
    props: ['photo'],
    data() {
      return{
        likeClicked: false,
        dislikeClicked: false,

      }
    },

    methods: {
        // async fetchOnePhotoLikes() {
        //     try {
        //       const photoUuid = "da597536-2c6f-41d4-a7cf-df2e7b89779a"
        //       await this.$store.dispatch("fetchOnePhotoLikesAction", photoUuid)
        //     } catch(error) {
        //       this.message = (error.response && error.response.data) || error.message || error.toString();
        //     }
        // },

            // fetchOnePhotoLikes() {
    //   try {
    //     this.allPhotos.forEach((photo) => {
    //       const photoUuid = photo.uuid;
    //       this.$store.dispatch("fetchOnePhotoLikesAction", photoUuid);
    //     });
    //   } catch (error) {
    //     this.message =
    //       (error.response && error.response.data) ||
    //       error.message ||
    //       error.toString();
    //   }
    // },

      countingDisLikes() {
          let disLikesVotes = 0;
          for ( let vote of this.photo.likes) {
            if (vote.value == -1) disLikesVotes++;
          }
          return disLikesVotes;
      },
    },
      mounted() {
        this.countingDisLikes();
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
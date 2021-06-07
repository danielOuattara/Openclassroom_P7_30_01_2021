<template>
    <button class="btn-thumbs thumbs-up">
        <font-awesome-icon icon="thumbs-up" class="thumbs thumbs-likes"/>
        <span class="output likes-output"> {{countingLikes()}} </span>
    </button>
</template>

<script>
// import PhotoLikesServices from './../../../../../services/photo.likes.services.js';
export default {
    props: ['photo'],

    methods: {

      // async fetchOnePhotoLikes() {
      //   try {
      //       const photoUuid = "da597536-2c6f-41d4-a7cf-df2e7b89779a"
      //       await this.$store.dispatch("fetchOnePhotoLikesAction", photoUuid)
      //     } catch(error) {
      //       this.message = (error.response && error.response.data) || error.message || error.toString();
      //     }
      // },

      countingLikes() {
          let likesVotes = 0;
          for ( let vote of this.photo.likes) {
            if (vote.value == 1) likesVotes++;
          }
          return likesVotes;
      },

      // userLike() {
      //   const photoUuid = this.photo.uuid;
      //   const userUuid = this.currentUser.uuid
      //   const like = document.getElementById("thumbs-up");
      //   like.addEventListener('click', function() {
      //     this.likeClicked = !likeClicked 
      //     like.style.color = "green";
      //   })
      // },
    },

    mounted() {
      this.countingLikes();
    }, 

    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }, 
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
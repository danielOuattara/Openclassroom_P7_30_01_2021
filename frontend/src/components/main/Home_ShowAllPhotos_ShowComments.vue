<template>
    <div> 
      <div class="comment-owner-picture">
        <img src="" alt="">
      </div>
      <div class="infos-comment">
        <p class="comment-owner-name"></p>
        <p class="comment-date"></p>
      </div>
      <p class="comment-content"></p>
    </div>
</template>

<script>
import { mapGetters} from 'vuex';
import Comment from '../../models/comment.js'
export default {
    name: 'ShowOnePhotoAllComments',
    data() {
        return {
          comment: new Comment(' '),
          loading: false,
          message: ''
        };
    },

    computed: {
        ...mapGetters(['allPhotos', 'likesData']),
    },

    methods: {
        
        fetchOnePhotoLikes() {
            try {

              this.allPhotos.forEach( photo => {
                  const photoUuid = photo.uuid;
                  this.$store.dispatch("fetchOnePhotoLikesAction", photoUuid)
              })
              } catch(error) {
                this.message = (error.response && error.response.data) || error.message || error.toString();
            }
        },
        
        async fetchOnePhotoLikes() {
            try {
                const photoUuid = this.props.photoUuid;
                await this.$store.dispatch("fetchOnePhotoLikesAction", photoUuid)
              } catch(error) {
                this.message = (error.response && error.response.data) || error.message || error.toString();
            }
        }
    },

    created() {
        // this.fetchAllPhotosAction();
    },
};

</script>

<style lang="scss" scoped>

</style>
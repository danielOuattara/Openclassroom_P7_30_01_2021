<template>
      <div class="newComment">
          <form name="form" @submit.prevent="addPhotoComment">
            <div class="form-group">
                <label for="comment">Comment below : </label>
                <textarea name="coment" placeholder="enter your comment here..."
                          type="text" cols="30" rows="2" class="form-control" 
                          v-model="comment.content" v-validate="'required'" >
                </textarea>
                <div class="alert alert-danger" 
                      v-if="errors.has('comment')" 
                      role="alert"> An entry is required to post a comment
                </div>
            </div>
            <div class="form-group">
              <button class="btn btn-outline-primary" :disabled="loading">
                  <span v-show="loading" 
                        class="spinner-border spinner-border-sm" ></span>
                  <span class="">Post comment</span>
                </button>
            </div>
            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">
                    {{message}}
              </div>
            </div>
          </form>
      </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Comment from './../../models/comment.js'
// import photoCommentService from './../../services/photo.comments.service';
export default {
    name: 'AddComments',
    props: ['photo'],

    data() {
        return {
          comment: new Comment(''),
          loading: false,
          message: '',
        };
    },

    computed: {
        ...mapGetters(['allPhotos']),
    },

    methods: {
        ...mapActions(['addPhotoCommentAction']), 
        
        // fetchOnePhotoLikes() {
        //     try {

        //       this.allPhotos.forEach( photo => {
        //           const photoUuid = photo.uuid;
        //           this.$store.dispatch("fetchOnePhotoLikesAction", photoUuid)
        //       })
        //     } catch(error) {
        //         this.message = (error.response && error.response.data) || error.message || error.toString();
        //     }
        // },

        // async addPhotoComment() {
        //     try {
        //         this.loading = true;
        //         const isValid = await this.$validator.validateAll();
        //         if (!isValid) {
        //             this.loading = false;
        //             return;
        //         }
        //         const photoUuid = this.photo.uuid;
        //         if (this.comment.content) {    
        //             comment = await photoCommentService.createPhotoComment(photoUuid, this.comment)
        //         }
        //     } catch(error) {
        //           this.loading = false;
        //           this.message = (error.response && error.response.data) || error.message || error.toString();
        //     }
        // },

        async addPhotoComment() { // USING VueX and Services.
            try {
                this.loading = true;
                const isValid = await this.$validator.validateAll();
                if (!isValid) {
                    this.loading = false;
                    return;
                }
                if (this.comment.content) {    
                    await this.$store.dispatch('addPhotoCommentAction', this.comment, this.photo.uuid)
                }
            } catch(error) {
                  this.loading = false;
                  this.message = (error.response && error.response.data) || error.message || error.toString();
            }
        },
    },

    created() {
        // this.fetchAllPhotosAction();
        // this.fetchOnePhotoLikes();
    },
};

</script>

<style lang="scss" scoped>
// * {
//   list-style-type: none;
// }

// .photos {
//     display: block;
//     margin-left: auto;
//     margin-right: auto;
//     max-width: 100%; 
//     height: auto;
//     transition: transform 200ms;
//     &:hover {
//       transform: scale(0.98);    
//       box-shadow: 0 0 2px 3px rgba(123, 123, 123, 0.6);
//       border-radius: 4px;  /* Rounded border */
//     }

//     .photo-modal {
//       width: 90vw;
//       display: block;
//       margin-left: auto;
//       margin-right: auto;
// }

// }
// .photo-block {
//   margin: auto;
//   margin-bottom:12px; 
//   width: 90vw;
//   border: 1px solid grey;
//   border-radius: 8px;
//   padding: 20px;
//   overflow-x: hidden;
//   background: rgb(228, 228, 228);
//   box-shadow: 0 0 2px 2px rgba(141, 141, 141, 0.6);
//   display: grid;
//   grid-gap: 5px;
// }

// /* --- START Grid Item */
// .bloc-infos-photo-owner{
//   grid-row: 1  ;
//   grid-column: 1 /span 4;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: center;
//   .owner-picture {
//     margin-right: 8px;
//     background: white;
//   }

// }

// .bloc-photo-post{
//   grid-row: 2 /span 4;
//   grid-column: 1 /span 4;
// }

// .bloc-infos-photo-post{
//   grid-row: 6 /span 7;
//   grid-column: 1 /span 2;
// }

// .bloc-likes{
//   grid-row: 6 /span 7;
//   grid-column: 3 /span 2;
// }

// .bloc-comments{
//   grid-row: 13 /span 14 ;
//   grid-column: 1 /span 4;
// }


// /* ---  END Grid Item */

// /* styling photo-posts */

// .bloc {
//   border: 1px solid grey;
//   padding: 5px;
//   margin-bottom: 5px;
//   border-radius: 5px;
// }

// @media screen and (max-width: 580px) {
//   .photo-block {
//     display: flex;
//     flex-direction: column;
//     flex-wrap: wrap;
//   }
// }



</style>
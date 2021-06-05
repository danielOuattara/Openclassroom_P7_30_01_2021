<template>
  <div  v-show="commentToggled" class="bloc bloc-new-comment">
        <form name="form" @submit.prevent="addPhotoComment">
        <div class="form-group">
            <label for="value">Comment below : </label>
            <textarea  name="value" placeholder="enter your comment here..."
                       type="text" cols="30" rows="2" class="form-control"
                       v-model="comment.value" v-validate="'required'" >
            </textarea>
            <div class="alert alert-danger" 
                v-if="errors.has('value')" role="alert">
              An entry is required to post a comment
            </div>
        </div>
        <div class="form-group">
            <button class="btn btn-outline-primary" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span class="">Post comment</span>
            </button>
        </div>
        <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
        </div>
    </form>
  </div>

</template>

<script>
import { /* mapGetters, */ mapActions } from "vuex";
// import photoCommentService from './../../services/photo.comments.service';
export default {
  name: "AddComments",
  props: ["photo", 'commentToggled'],

  data() {
    return {
      comment: new Comment(''),
      loading: false,
      message: '',
    };
  },

  methods: {
    ...mapActions(["addPhotoCommentAction"]),

    // async addPhotoComment() {  // OK! but NO VueX !
    //     try {
    //         console.log(this.comment.content);
    //         console.table(this.comment);
    //         console.log(this.photo.uuid)
    //         this.loading = true;
    //         const isValid = await this.$validator.validateAll();
    //         if (!isValid) {
    //             this.loading = false;
    //             return;
    //         }
    //         const photoUuid = this.photo.uuid;
    //         if (this.comment.content && photoUuid) {
    //             await photoCommentService.createPhotoComment(photoUuid, this.comment);
    //             this.loading = false;
    //         }
    //     } catch(error) {
    //           this.loading = false;
    //           this.message = (error.response && error.response.data) || error.message || error.toString();
    //     }
    // },

    async addPhotoComment() {   // USING VueX and Services.
      try {
        this.loading = true;
        const isValid = await this.$validator.validateAll();
        if (!isValid) {
          this.loading = false;
          return;
        }
        if (this.comment.value) {
          await this.$store.dispatch(
            "addPhotoCommentAction",
            this.photo.uuid,
            this.comment
          );
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
        this.message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    },
  },
};
</script>

<style lang="scss" scoped>




</style>

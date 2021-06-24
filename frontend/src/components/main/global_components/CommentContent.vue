<template>
    <p v-if="!getShowCommentUpdate" class="comment-content">
        {{ comment.content}}
    </p>
    <p v-else class="comment-content"> 
        <textarea name="" 
                  id="comment-update-textarea" 
                  cols="29" rows="4" 
                  v-model="newCommentValue">
        </textarea>
        <button @click="mutateCloseShowCommentUpdate" class="btn-comment-update-cancel">Cancel</button>
        <button @click="updatePhotoComment" class="btn-comment-update-send">Send</button>
        <!-- <button @click="showNewCommentValue" class="btn-comment-update-send">Send</button> -->
    </p>
</template>

<script>
import { mapGetters,mapMutations, mapActions } from "vuex";
export default {
    // props: ["item"],
    props: {
        comment: {
          type: Object,
          default: () => { 
            return {}
          }
        },
        photoUuid: {
            type: String,
            default: ''
        },
    },

    data() {
      return {
        newCommentValue: this.comment.content
      };
    },
    computed: {
      ...mapGetters(["getShowCommentUpdate"]),

    },

    methods: {
      ...mapMutations(["mutateCloseShowCommentUpdate"]),
      ...mapActions(["updatePhotoCommentAction", "getAllPhotosAction"]),

      showNewCommentValue() {
          console.log(this.newCommentValue)
          console.log(this.photoUuid)
          console.log(this.comment.uuid)
      },

      async updatePhotoComment() {  
          try {
              // this.loading = true;
              // const isValid = await this.$validator.validateAll();
              // if (!isValid) {
              //   this.loading = false;
              //   return;
              // }
              
              const photoUuid = this.photoUuid;
              const commentUuid = this.comment.uuid;
              const content = this.newCommentValue;
              console.log("ready !!!")
              const data = { photoUuid, commentUuid, content }
              /* const comment =  */await this.$store.dispatch("updatePhotoCommentAction", data);
              this.mutateCloseShowCommentUpdate();
              this.getAllPhotosAction();
              // this.loading = false;
              // this.message = comment.data;
          } catch (err) {
              this.loading = false;
              this.message =  (err.response && err.response.data) || err.message || err.toString();
          }
      },
  }
};
</script>

<style lang="scss" scoped>

#comment-update-textarea {
  // background: rgb(196, 196, 196);
  background: rgba(255, 255, 255, 0.4);
  border-style: none;
  border-radius: 8px;
  outline: 1px solid rgba(128, 128, 128, 0.515);
  padding: 0.5rem;
  &:focus {
    // border:
  }
}

.btn-comment-update-cancel{
  margin-right:3rem; 
  margin-top:1rem; 
  border-style:none; 
  padding:0.25rem 0.5rem;
  border-radius: 0.25rem ;
  &:hover {
    color: white;
    background: rgb(111, 111, 111);
  }
}
.btn-comment-update-send {
  margin-right:1rem; 
  border-style:none; 
  padding:0.25rem 0.75rem;
  border-radius: 0.25rem ;
  &:hover {
    color: white;
    background: rgb(0, 128, 47);
  }

}
</style>
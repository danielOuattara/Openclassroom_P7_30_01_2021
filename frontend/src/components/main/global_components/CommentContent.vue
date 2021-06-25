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
        <button @click="updatePhotoComment" class="btn-comment-update-send" v-show="newCommentValue.length > 0">Send</button>
    </p>
</template>

<script>
import { mapGetters,mapMutations, mapActions } from "vuex";
export default {
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

      async updatePhotoComment() {  
          try {
              const photoUuid = this.photoUuid;
              const commentUuid = this.comment.uuid;
              const content = this.newCommentValue;
              const data = { photoUuid, commentUuid, content }
              await this.$store.dispatch("updatePhotoCommentAction", data);
              this.mutateCloseShowCommentUpdate();
              this.getAllPhotosAction();
          } catch (err) {
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
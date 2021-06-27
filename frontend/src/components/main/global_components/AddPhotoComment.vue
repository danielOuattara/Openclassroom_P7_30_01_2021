<template>
  <div class="bloc bloc-new-comment">
      <form name="form" @submit.prevent="addPhotoComment">
        <div class="form-group">
            <label for="value">Comment : </label>
            <textarea  name="value"  
                       placeholder="comment here..."
                       type="text" 
                       cols="30" rows="2" 
                       class="form-control"
                       v-model="comment" 
                       v-validate="'required'" >
            </textarea>
            <div class="alert alert-danger" 
                v-if="errors.has('value')" role="alert">
              An entry is required to post a comment
            </div>
        </div>
        <div class="form-group post-comment" v-show="comment">
            <button class="btn-post-comment" :disabled="loading" >
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span class="">
                Post comment
                <font-awesome-icon id="icon-paper-plane-comment" icon="paper-plane" />
              </span>
            </button>
            <button @click="onCommentReset" class="reset-comment btn btn-dark" type="button" 
                    v-show="comment">
                Reset
                <font-awesome-icon id="icon-times-circle-comment" icon="times-circle" />
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
export default {
  name: "AddComments",
  props: ["photoUuid","ownerUuid"],

  data() {
    return {
      comment: '',
      loading: false,
      message: '',
      // commentSwtich: false,
    };
  },

  methods: {
    ...mapActions([ "addPhotoCommentAction", "getAllPhotosAction","getOneUserAction" ]),

    onCommentReset() {
      this.commentSwitch= false;
      this.comment = "";
      this.$validator.reset();
    },

    async addPhotoComment() { 
      try {
        this.loading = true;
        const isValid = await this.$validator.validateAll();
        if (!isValid) {
          this.loading = false;
          return;
        }
        const photoUuid = this.photoUuid;
        const comment= this.comment
        const data = { photoUuid, comment }
        // this.commentSwtich = false;
        await this.$store.dispatch("addPhotoCommentAction", data);
        this.loading = false;
        this.onCommentReset();
        this.getAllPhotosAction();
        if (this.ownerUuid) {
          this.getOneUserAction(this.ownerUuid);
        }

      } catch (error) {
        this.loading = false;
          (error.response && error.response.data) || error.message || error.toString();
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.btn-post-comment {
  border-style: none;
  border: 1px solid grey;
  padding: 0.35rem 0.65rem;
  color: #0048ff;
  border-radius: 4px;
  // background: #007bff;
  // border-radius: 0.25rem;
}

#icon-paper-plane-comment {
  margin-left: 0.5rem;
}

.reset-comment{
  margin-left: 2rem;
  // background: black;
  color:white;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  position: absolute;
  right: 0;
}

#icon-times-circle-comment {
  margin-left: 1rem;
}

.post-comment{
  position: relative;
}

</style>

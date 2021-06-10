<template>
    <button @click="deletePhotoComment">Delete</button>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "DeletePhotoComment",
    props: ['photo'],
    data() {
        return {
            loading: false,
            message: "",
            submitted: false,
            successful: false,
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },

        photo() {
          return this.props.photo;
        },

        comment() {
          return this.props.photo.comments;
        }
    },

    methods: {
        ...mapActions(["deletePhotoCommentAction", "fetchOnePhotoCommentsAction"]),


      async deletePhotoComment() {
          try {
              this.message = '';
              this.submitted = true;
              this.loading = true;
              const photoUuid = this.photo.uuid;
              const commentUuid = this.comment.uuid;
              data= {photoUuid, commentUuid}

              const response = await this.$store.dispatch("deletePhotoCommentAction", data);
              this.message = response.data;
              this.successful = true;
              this.loading = false;
              this.fetchAllPhotosAction();
          } catch(error) {
              this.loading = false;
              this.message = (error.response && error.response.data) || error.message || error.toString();
          }
      },

  },
};
</script>

<style lang="scss" scoped> </style>

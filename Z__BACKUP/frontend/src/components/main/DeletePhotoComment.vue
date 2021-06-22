<template>
    <button type="button" 
            @click="deletePhotoComment"  
        >Delete
    </button>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "DeletePhotoComment",
    props: ['commentUuid','photoUuid'],
    data() {
        return {
            loading: false,
            message: "",
            submitted: false,
            successful: false,
        };
    },
    // computed: {
    //     currentUser() {
    //         return this.$store.state.auth.user;
    //     },

        // photo() {
        //   return this.props.photo;
        // },

        // comment() {
        //   return this.props.photo.comments;
        // }
    // },

    methods: {
        ...mapActions(["deletePhotoCommentAction", "fetchAllPhotosAction"]),


        async deletePhotoComment() {
          try {
              this.message = '';
              this.submitted = true;
              this.loading = true;
              const photoUuid = this.photoUuid;
              const commentUuid = this.commentUuid;
              const data= {photoUuid, commentUuid}
              const response = await this.$store.dispatch("deletePhotoCommentAction", data);
              await this.fetchAllPhotosAction();
              this.message = response.data;
              this.successful = true;
              this.loading = false;

          } catch(error) {
              this.loading = false;
              this.message = (error.response && error.response.data) || error.message || error.toString();
          }
        },

  },
};
</script>

<style lang="scss" scoped>

button {
    font-size: 0.8rem;
    margin-right: 0.1rem;
    // margin-left: 0.25rem;
    border-style: none;
    background: rgb(255, 255, 255);
    font-weight: 600;
    border-radius: 3px;
    padding: 0.25rem 0.25rem!important;
    border: 1px solid rgb(100, 100, 100)!important;
    color: #000;
    &:hover {
        background: rgb(100, 100, 100);
        color: white
    }
}

 </style>

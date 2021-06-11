<template>
    <button  type="button" 
             @click="deletePhoto">Delete</button>
</template>

<script>
import { mapActions } from "vuex";
export default {
    props: ['photoUuid'],
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
          return this.props.photoUuid;
        }
    },

    methods: {
        ...mapActions(["deleteOnePhotoAction", "fetchAllPhotosAction"]),

        // onFileSelect(event) {
        //   this.selectedFile = event.target.files[0];
        //   console.log(this.selectedFile)
        // },


      async deletePhoto() {
          try {
              this.message = '';
              this.submitted = true;
              this.loading = true;
              const photoUuid = this.photoUuid;
              const response = await this.$store.dispatch("deleteOnePhotoAction", photoUuid);
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

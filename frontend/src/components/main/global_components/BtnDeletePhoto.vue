<template>
    <button  type="button" 
             @click="deletePhoto">Delete</button>
</template>

<script>
import { mapActions } from "vuex";
export default {
    props: ['photoUuid',"ownerUuid"],
    data() {
        return {
            loading: false,
            message: "",
            submitted: false,
            successful: false,
        };
    },

    methods: {
        ...mapActions(["deleteOnePhotoAction", "getAllPhotosAction","getOneUserAction"]),

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
              this.getAllPhotosAction();
              this.getOneUserAction(this.ownerUuid);
          } catch(error) {
              this.loading = false;
              this.message = (error.response && error.response.data) || error.message || error.toString();
          }
      },

  },
};
</script>

<style lang="scss" scoped> </style>

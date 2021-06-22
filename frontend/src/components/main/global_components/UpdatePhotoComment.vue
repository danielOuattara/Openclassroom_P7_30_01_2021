<template>
    <button type="button" @click="updatePhotoComment">
        Update
    </button>

</template>

<script>
import { /* mapGetters, */ mapActions } from "vuex";
export default {
  name: "AddComments",
  props: ["photo"],

  data() {
    return {
      comment: new Comment(''),
      loading: false,
      message: '',
    };
  },

  methods: {
    ...mapActions(["updatePhotoCommentAction"]),

    async updatePhotoComment() {   // USING VueX and Services.
      try {
        this.loading = true;
        const isValid = await this.$validator.validateAll();
        if (!isValid) {
          this.loading = false;
          return;
        }
        const photoUuid = this.photo.uuid;
        const data = {photoUuid, ...this.comment }
        await this.$store.dispatch("updatePhotoCommentAction", data);
        this.loading = false;
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

<template>
    <button type="button" @click="mutateShowCommentUpdate">
        Update
    </button>
</template>

<script>
// import { mapMutations ,mapActions } from "vuex";
export default {
  computed() {
  },

  methods: {
    mutateShowCommentUpdate() {
      // this.$store.commit('mutateShowCommentUpdate');
      console.log("Clicked !")
    }
  },
};
</script>

<style lang="scss" scoped>




</style>

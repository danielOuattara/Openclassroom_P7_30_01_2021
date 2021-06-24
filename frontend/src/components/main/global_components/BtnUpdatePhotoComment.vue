<template>
    <button type="button" @click="mutateShowCommentUpdate">
        Update
    </button>
</template>

<script>
import { mapMutations} from "vuex";
export default {

  methods: {
    ...mapMutations(["mutateShowCommentUpdate"]),
  },
};
</script>

<style lang="scss" scoped> </style>

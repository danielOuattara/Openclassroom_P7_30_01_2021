<template>
<!-- Comment!-->
        <p v-if="comment.content" class="comment-content">
            {{ comment.content}}
        </p>
        <p v-else class="comment-content"> </p>

</template>

<script>
export default {
  name: "CommentOldContainer",
    props: ["comment"],

  data() {
    return {
    };
  },
};
</script>
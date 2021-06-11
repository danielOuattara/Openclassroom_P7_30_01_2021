<template>
<!-- Comment!-->
        <span v-if="comment.owner.firstName && comment.owner.lastName" 
           class="comment-owner-name bloc">{{ comment.owner.firstName.slice(0,1).toUpperCase() + "." +
                  " " + comment.owner.lastName }}</span>
        <span v-else class="comment-owner-name bloc">New user</span>
</template>

<script>
export default {
  props: ["comment"],

  data() {
    return {
    };
  },
};
</script>


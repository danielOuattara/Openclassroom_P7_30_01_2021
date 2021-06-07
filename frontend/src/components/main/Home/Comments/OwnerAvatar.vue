<template>
<!-- Comment!-->
        <img v-if="comment.owner.avatar" 
             class=" bloc comment-avatar" 
             :src="comment.owner.avatar" 
             style=""  
             :alt="'picture profile of ' + comment.owner.firstName + comment.owner.lastName "
        />
        <img v-else 
             class=" bloc bloc-avatar" 
             src="./../../../../assets/images/generic-profile_360_360.jpg" 
             style="max-width: 10vw;"  
             :alt="'picture profile of ' + comment.owner.firstName + comment.owner.lastName "
        />
</template>

<script>
export default {
  name: "OwnerAvatar",
    props: ["comment"],

  data() {
    return {
    };
  },
};
</script>
<template>
        <img v-if="photo.owner.avatar" class=" bloc bloc-avatar" :src="photo.owner.avatar" 
             style="max-width: 10vw;"  :alt="'picture profile of ' + photo.owner.firstName + photo.owner.lastName "
        />
        <img v-else class=" bloc bloc-avatar" src="./../../../../../assets/images/generic-profile_360_360.jpg" 
             style="max-width: 10vw;"  :alt="'picture profile of ' + photo.owner.firstName + photo.owner.lastName "
        />
</template>

<script>
export default {
  name: "OwnerAvatar",
    props: ["photo", "comment"],

  data() {
    return {
    };
  },
};
</script>
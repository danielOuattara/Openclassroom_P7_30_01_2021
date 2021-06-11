<template>
        <img v-if="photo.owner.avatar && photo.owner.firstName && photo.owner.lastName" 
             class=" bloc bloc-avatar" 
             :src="photo.owner.avatar" 
             style="max-width: 10vw;"  
             :alt="'picture profile of ' + photo.owner.firstName + photo.owner.lastName "
        />
        <img v-else 
             class=" bloc bloc-avatar" 
             src="./../../../../assets/images/generic-profile_360_360.jpg"
             style="max-width: 10vw;"  
             alt='picture profile of new user'
        />
</template>

<script>
export default {
  name: "OwnerAvatar",
    props: ["photo"],

  data() {
    return {
    };
  },
};
</script>
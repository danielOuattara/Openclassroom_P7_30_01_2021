<template>
        <img v-if="item.owner.avatar && item.owner.firstName && item.owner.lastName" 
             class=" bloc bloc-avatar" 
             :src="item.owner.avatar" 
             style="max-width: 10vw;"  
             :alt="'picture profile of ' + item.owner.firstName + item.owner.lastName "
        />
        <img v-else 
             class=" bloc bloc-avatar" 
             src="./../../assets/images/generic-profile_360_360.jpg"
             style="max-width: 10vw;"  
             alt='picture profile of new user'
        />
</template>

<script>
export default {
  name: "OwnerAvatar",
    props: ["item"],

  data() {
    return {
    };
  },
};
</script>
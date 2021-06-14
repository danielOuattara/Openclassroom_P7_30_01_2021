<template>
        <img v-if="item.avatar && item.firstName && item.lastName" 
             class=" bloc bloc-avatar" 
             :src="item.avatar" 
             :alt="'picture profile of ' + item.firstName + item.lastName "/>

        <img v-else 
             class=" bloc bloc-avatar" 
             src="./../../assets/images/generic-profile_360_360.jpg"
             alt='picture profile of new user'/>
</template>

<script>
export default {
  name: "OwnerAvatar",
  props: {
      item: {
        type: Object,
        default: () => { 
          return {}
        }
      }
  },

  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.bloc-avatar {
  max-width: 10vw;
}
</style>
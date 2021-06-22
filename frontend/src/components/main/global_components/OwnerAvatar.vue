<template>
        <img v-if="item.avatar" 
             class=" bloc bloc-avatar" 
             :src="item.avatar" 
             :alt="'picture profile of '+ ' ' + item.firstName + ' ' + item.lastName + ' ' + item.uuid "/>

        <img v-else 
             class=" bloc bloc-avatar" 
             src="./../../../assets/images/generic-profile_360_360.jpg"
             :alt="'picture profile of new user -- uuid identifiant' +item.uuid"/>
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
};
</script>

<style lang="scss" scoped>
.bloc-avatar {
  max-width: 10vw;
}
</style>
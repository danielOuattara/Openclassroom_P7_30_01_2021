<template>
        <p v-if="photo.owner.firstName && photo.owner.lastName" class="bloc-owner-name bloc">{{ photo.owner.firstName + " " + photo.owner.lastName }}</p>
        <p v-else class="bloc-owner-name bloc">New user</p>
</template>

<script>
export default {
  props: ["photo"],

  data() {
    return {
    };
  },
};
</script>


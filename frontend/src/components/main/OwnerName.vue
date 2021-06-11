<template>
        <p v-if="item.owner.firstName && item.owner.lastName" 
           class="bloc-owner-name bloc">
            {{ item.owner.firstName + " " + item.owner.lastName }}
        </p>
        
        <p v-else class="bloc-owner-name bloc">New user</p>
</template>

<script>
export default {
  props: ["item"],

  data() {
    return {
    };
  },
};
</script>


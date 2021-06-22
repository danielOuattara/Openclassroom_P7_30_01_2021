<template>
        <p v-if="item.firstName && item.lastName" 
           class="bloc-owner-name bloc">
            {{ item.firstName + " " + item.lastName }}
        </p>
        
        <p v-else class="bloc-owner-name bloc">New user</p>
</template>

<script>
export default {
  // props: ["item"],
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


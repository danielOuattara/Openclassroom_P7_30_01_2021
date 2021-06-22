<template>
        <p class=" bloc bloc-photo-title"> {{item}}</p>
</template>

<script>
export default {
  name: "PhotoTitle",
  // props: ["item"],
      props: {
        item: {
            type: String,
            default: ''
        },
    },
};
</script>


<template>
        <p class=" bloc bloc-photo-title"> {{ photo.title }}</p>
</template>

<script>
export default {
  name: "PhotoTitle",
    props: ["photo"],
};
</script>


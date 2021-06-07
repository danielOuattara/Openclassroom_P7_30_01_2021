<template>
        <div class="bloc bloc-infos-photo-post">
        <p class="photo-title">Title: {{ photo.title }}</p>
        <p class="photo-post-date">
          <font-awesome-icon icon="calendar-alt" />
          {{ photo.createdAt.split("T")[0] }}
          <font-awesome-icon icon="clock" />
          {{ photo.createdAt.substring(11, 13) }}H{{
            photo.createdAt.substring(14, 16)
          }}
        </p>
      </div>
</template>

<script>
export default {
    props: ['photo']
}
</script>

<style lang="scss" scoped>

// .bloc-infos-photo-post {
//   grid-row: 6 / span 7;
//   grid-column: 1 / span 2;
// }
</style>
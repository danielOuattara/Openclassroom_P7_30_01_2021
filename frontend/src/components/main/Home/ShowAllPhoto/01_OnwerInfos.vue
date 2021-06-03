<template>
      <div class="bloc bloc-infos-photo-owner">
        <img class="owner-picture" :src="photo.owner.avatar" 
             style="max-width: 70px"  :alt=" 'picture profile of ' + photo.owner.firstName + photo.owner.lastName "
        />
        <div class="owner-name">
          <p class="onwer-firstName">firstName: {{ photo.owner.firstName }}</p>
          <p class="onwer-lastName">lastName: {{ photo.owner.lastName }}</p>
        </div>
      </div>
</template>

<script>
export default {
  name: "ShowAllPhotos",
    props: ["photo"],

  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>

.bloc-infos-photo-owner {
  grid-row: 1;
  grid-column: 1 / span 4;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  .owner-picture {
    margin-right: 8px;
    background: white;
  }
}


</style>

<template>
      <div class="bloc bloc-infos-photo-owner">
        <img class="owner-picture" :src="photo.owner.avatar" 
             style="max-width: 70px"  :alt=" 'picture profile of ' + photo.owner.firstName + photo.owner.lastName "
        />
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

.bloc-owner-avatar {
  grid-row: 1 span /2;
  grid-column: 1 / span 2;
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

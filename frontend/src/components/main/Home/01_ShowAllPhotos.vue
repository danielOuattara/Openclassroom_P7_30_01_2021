<template>
    <div class="photos-container">
        <h3>Home Photos</h3>
        <div v-for="photo in allPhotos" :key="photo.id" class="photo-block">
            <PhotoOwnerInfos v-bind:photo="photo" />
            <PhotoUnit  v-bind:photo="photo"/>
            <InfosPostPhoto v-bind:photo="photo" />
            <PhotoLikes v-bind:photo="photo" />
            <AddComment v-bind:photo="photo" />
            <ShowComments v-bind:photo="photo" id="show-comments" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PhotoOwnerInfos from './ShowAllPhoto/01_OnwerInfos';
import PhotoUnit from './ShowAllPhoto/02_Photo';
import InfosPostPhoto from './ShowAllPhoto/03_InfosPostPhoto';
import PhotoLikes from './ShowAllPhoto/04_PhotoLikes';
import AddComment from "./ShowAllPhoto/05_AddComments";
import ShowComments from './ShowAllPhoto/06_ShowComments';
export default {
  name: "ShowAllPhotos",
  components: {
    PhotoOwnerInfos,
    PhotoUnit,
    InfosPostPhoto,
    PhotoLikes,
    AddComment,
    ShowComments,
  },

  data() {
    return {
    };
  },

  computed: {
    ...mapGetters(["allPhotos", "likesData"]),
  },

  methods: {
    ...mapActions(["fetchAllPhotosAction", "fetchOnePhotoLikesAction"]),

    fetchOnePhotoLikes() {
      try {
        this.allPhotos.forEach((photo) => {
          const photoUuid = photo.uuid;
          this.$store.dispatch("fetchOnePhotoLikesAction", photoUuid);
        });
      } catch (error) {
        this.message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    },


  },

  created() {
    this.fetchAllPhotosAction();
    // this.fetchOnePhotoLikes();
  },
};
</script>



<style lang="scss" scoped>
* {
  list-style-type: none;
}


.photo-block {
  margin: auto;
  margin-bottom: 12px;
  border: 1px solid grey;
  border-radius: 8px;
  padding: 20px;
  overflow-x: hidden;
  background: rgb(228, 228, 228);
  // background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 2px 2px rgba(141, 141, 141, 0.6);
  display: grid;
  grid-gap: 5px;
}

/* --- START Grid Item */
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

.bloc-infos-photo-post {
  grid-row: 6 / span 7;
  grid-column: 1 / span 2;
}

.bloc-likes {
  grid-row: 6 / span 7;
  grid-column: 3 / span 2;
}

.bloc-comments { /* STDBY */
  grid-row: 13 / span 14;
  grid-column: 1 / span 4;
}

/* ---  END Grid Item */

/* styling photo-posts */

.bloc {
  border: 1px solid grey;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
}

@media screen and (max-width: 580px) {
  .photo-block {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
}


/* ------------- */
#show-comments {
  border: 1px solid red;
}
</style>

<template>
  <div class="photos-container">
    <h3>Home Photos</h3>

    <div v-for="photo in allPhotos" :key="photo.id" class="photo-block">

      <PhotoOwnerInfos v-bind:photo="photo" />
      <PhotoUnit  v-bind:photo="photo"/>

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

      <div class="bloc bloc-likes">
        <p class="users-likes">
          <font-awesome-icon icon="thumbs-up" />
          <span class="count-likes"> how many likes ?</span>
        </p>
        <p class="users-dislikes">
          <font-awesome-icon icon="thumbs-down" />
          <span class="count-dislikes"> how many dislikes ?</span>
        </p>
      </div>

      <div class="bloc bloc-comments">
          <AddComment v-bind:photo="photo" />
          <ShowComments v-bind:photo="photo" id="show-comments" />
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PhotoOwnerInfos from './Home_ShowAllPhotos_PhotoOnwerInfos';
import PhotoUnit from './Home_ShowAllPhotos_Photo';
import AddComment from "./Home_ShowAllPhotos_AddComments";
import ShowComments from './Home_ShowAllPhotos_ShowComments';
export default {
  name: "ShowAllPhotos",
  components: {
    PhotoOwnerInfos,
    PhotoUnit,
    AddComment,
    ShowComments,
  },

  data() {
    return {
      // photo: "",
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

    // async fetchOnePhotoLikes() {
    //     try {
    //         const photoUuid = "da597536-2c6f-41d4-a7cf-df2e7b89779a"
    //         await this.$store.dispatch("fetchOnePhotoLikesAction", photoUuid)
    //       } catch(error) {
    //         this.message = (error.response && error.response.data) || error.message || error.toString();
    //     }
    // }
  },

  created() {
    this.fetchAllPhotosAction();
    this.fetchOnePhotoLikes();
  },
};
</script>

<style lang="scss" scoped>
* {
  list-style-type: none;
}

.photos {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  height: auto;
  transition: transform 200ms;
  &:hover {
    transform: scale(0.98);
    box-shadow: 0 0 2px 3px rgba(123, 123, 123, 0.6);
    border-radius: 4px; /* Rounded border */
  }

  // .photo-modal {
  //   width: 90vw;
  //   display: block;
  //   margin-left: auto;
  //   margin-right: auto;
  // }
}
.photo-block {
  margin: auto;
  margin-bottom: 12px;
  width: 90vw;
  border: 1px solid grey;
  border-radius: 8px;
  padding: 20px;
  overflow-x: hidden;
  background: rgb(228, 228, 228);
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

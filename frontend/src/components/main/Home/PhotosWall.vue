<template>
    <div class="photos-container">
        <div v-for="photo in allPhotos" :key="photo.id" class="photo-block">

            <OwnerAvatar v-bind:photo="photo"/>
            <OwnerName v-bind:photo="photo"/>
            <PhotoTitle v-bind:photo="photo"/>
            <DateOfPosting v-bind:photo="photo"/>
            <PhotoPosted  v-bind:photo="photo" />
            <font-awesome-icon class="bloc-container-toggler" 
                               icon="comment-alt"
                               @click="commentToggled=!commentToggled" />

            <span class="thumbs-up">
                <font-awesome-icon icon="thumbs-up" /> 30
            </span>

            <span class="thumbs-down">
                <font-awesome-icon icon="thumbs-down" /> 4
            </span>

           <CommentNew v-bind:photo="photo"
                       v-bind:commentToggled="commentToggled" />
           <!-- <CommentsOld v-bind:photo="photo"
                        v-bind:commentToggled="commentToggled" /> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import OwnerAvatar   from './ShowAllPhoto/OwnerAvatar';
import OwnerName     from './ShowAllPhoto/OwnerName';
import PhotoTitle    from './ShowAllPhoto/PhotoTitle';
import DateOfPosting from './ShowAllPhoto/DateOfPosting';
import PhotoPosted   from './ShowAllPhoto/PhotoPosted';
import CommentNew    from './ShowAllPhoto/CommentNew';
// import CommentsOld   from './ShowAllPhoto/CommentsOld';

export default {
  name: "ShowAllPhotos",
  components: {

    OwnerAvatar,
    OwnerName,
    PhotoTitle,
    DateOfPosting,
    PhotoPosted,
    CommentNew,
    // CommentsOld
  },

  data() {
    return {
      commentToggled: false,
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
  margin: 12px 0;
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
.bloc-avatar {
  grid-row: 1 / span 2;
  grid-column: 1 / span 2;
    margin-right: 8px;
    background: white;
}

.bloc-owner-name {
  grid-row: 1 / span 1;
  grid-column: 2 / span 2;
  font-weight: 700;
  font-size: 12px;
}

.bloc-date-posting {
  grid-row: 1 / span 1;
  grid-column: 4 / span 3;
  font-size: 10px
}

.bloc-photo-title {
  grid-row: 2 / span 1;
  grid-column: 2 / span 4;
  font-size: 18px;
  font-weight: 600;
}

.bloc-photo-post {
  grid-row: 3 / span 4;
  grid-column: 1 / span 6;
}

.bloc-container-toggler {
  grid-row: 7 / span 1;
  grid-column: 2 / span 2;
  &:hover {
    cursor: pointer;
  }
  color:grey;
  font-size:30px;
  border:1px solid black;
  padding: 2px;
}

.bloc-photo-likes {
  grid-row: 7 / span 1;
  grid-column: 3 / span 4;
  // cursor: pointer;
}

.thumbs-up {
  color: rgb(76, 100, 194);
  font-size: 20px;
  grid-row: 7 / span 1;
  grid-column: 4 / span 1;
    &:hover {
      cursor: pointer;
    }
}

.thumbs-down {
  color: rgb(98, 98, 99);
  font-size: 20px;
  grid-row: 7 / span 1;
  grid-column: 6 / span 1;
    &:hover {
        cursor: pointer;
    }
}

.bloc-new-comment { /* STDBY */
  grid-row: 8 / span 4;
  grid-column: 1 / span 6;
  border: 3px solid green;
}

.bloc-old-comment { /* STDBY */
  grid-row: 12 / span 5;
  grid-column: 1 / span 6;
  border: 4px solid red;
}

/* ---  END Grid Item */

/* styling photo-posts */

.bloc {
  // border: 1px solid grey;
  // padding: 5px;
  // margin-bottom: 5px;
  // border-radius: 5px;
}

// @media screen and (max-width: 580px) {
//   .photo-block {
//     display: flex;
//     flex-direction: column;
//     flex-wrap: wrap;
//   }
// }

</style>

<template>
  <div class="photos-container">
      <div v-for="photo in allPhotos" :key="photo.id" class="photo-bloc">
          <OwnerAvatar v-bind:photo="photo"/>
          <OwnerName v-bind:photo="photo"/>
          <PhotoTitle v-bind:photo="photo"/>
          <DateOfPosting v-bind:photo="photo"/>
          <Photo v-bind:photo="photo" />
          <font-awesome-icon class="bloc-container-toggler" 
                              icon="comment-alt"
                              @click="commentToggled=!commentToggled" 
                              :id='"#"+photo.uuid' />

            <PhotoLikes v-bind:photo="photo" />
            <PhotoDisLikes v-bind:photo="photo"/>
            <CommentNew v-show="photo.uuid" 
                        v-bind:photo="photo"
                        v-bind:commentToggled="commentToggled" />
            
            <CommentsOldContainer v-show="photo.uuid"
                                  v-bind:photo="photo"
                                  v-bind:commentToggled="commentToggled" />
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import OwnerAvatar   from './Photos/OwnerAvatar';
import OwnerName     from './Photos/OwnerName';
import PhotoTitle    from './Photos/PhotoTitle';
import DateOfPosting from './Photos/DateOfPosting';
import Photo  from './Photos/Photo';
import PhotoLikes from './Photos/PhotoLikes'
import PhotoDisLikes from './Photos/PhotoDisLikes'
import CommentNew    from './Comments/CommentNew';
import CommentsOldContainer   from './Comments/CommentsOldContainer';

export default {
  name: "ShowAllPhotos",
  components: {

    OwnerAvatar,
    OwnerName,
    PhotoTitle,
    DateOfPosting,
    Photo,
    PhotoLikes,
    PhotoDisLikes,
    CommentNew,
    CommentsOldContainer
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
  },

  created() {
    this.fetchAllPhotosAction();
  },
};
</script>

<style lang="scss" scoped>
* {
  list-style-type: none;
}
.photo-bloc {
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
  margin-top: 15px;
  background: blue;
  color: red;
  padding: 3px;
  &:hover {
    cursor: pointer;
  }
  color:grey;
  font-size:30px;
  border:1px solid black;
  padding: 2px;
}
.btn-thumbs {
  // color: rgb(153, 153, 153);
  font-size: 16px;
  background-color: c7c7c7;
  border-style: none;
  border-radius: 5px;
  margin-top: 10px;
  padding: 2px;
  &:hover {
    cursor: pointer;
    background: rgb(172, 172, 172);
  }
  .btn-thumbs:hover {
    cursor: pointer;
    background: rgb(209, 15, 15);
  }
.thumbs {
  color: rgb(28, 44, 160);
  &:hover {
    color: rgb(12, 158, 48);
  }
}
}
.thumbs-up {
  grid-row: 7 / span 1;
  grid-column: 4 / span 1;
}
.thumbs-down {
  grid-row: 7 / span 1;
  grid-column: 6 / span 1;
}
.output{
  font-size: 16px!important;
  color: red
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

// @media screen and (min-width: 760px) {
//   .photo-bloc {
//     display: flex;
//     flex-direction: column;
//     flex-wrap: wrap;
//   }
// }

</style>

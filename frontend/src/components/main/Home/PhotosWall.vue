<template>
    <div class="photos-container">
        <div v-for="photo in allPhotos" :key="photo.uuid" class="photo-bloc">
            <OwnerAvatar v-bind:item="photo.owner"/>
            <OwnerName v-bind:item="photo.owner"/>
            <PhotoTitle v-bind:item="photo.title"/>
            <DateOfPosting v-bind:item="photo.createdAt"/>
            <Photo v-bind:item="photo" />
            <CommentsToggler v-bind:item="photo.uuid"
                             v-bind:comments="photo.comments"/>
            <!-- <PhotoLikes v-bind:item="photo" /> -->


            <PhotoBtnOptions v-bind:photoOwner="photo.owner"
                             v-bind:photoUuid="photo.uuid"/>
            <div class="collapse bloc-comment-collapsable" :id="'photo'+photo.uuid">
                <CommentsWall v-bind:photo="photo"/>
                <AddPhotoComment v-bind:photoUuid="photo.uuid"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import OwnerAvatar   from './../OwnerAvatar.vue';
import OwnerName     from './../OwnerName.vue';
import PhotoTitle    from './../PhotoTitle';
import DateOfPosting from './../DateOfPosting';
import Photo         from './../Photo';
import CommentsToggler from './../CommentsToggler';
// import PhotoLikes    from './../PhotoLikes'
import PhotoBtnOptions from './../PhotoBtnOptions.vue'
import CommentsWall   from './comments/CommentsWall.vue';
import AddPhotoComment  from '../AddPhotoComment.vue';

export default {
  name: "PhotosWall",
  components: {

    OwnerAvatar,
    OwnerName,
    PhotoTitle,
    DateOfPosting,
    Photo,
    CommentsToggler,
    // PhotoLikes,
    PhotoBtnOptions,
    CommentsWall,
    AddPhotoComment,
  },

  data() {
    return {
      commentToggled: false,
    };
  },

  computed: {
    ...mapGetters(["allPhotos", "likesData"]),
    
    currentUser() {
            return this.$store.state.auth.user;
        }
  },

  methods: {
    ...mapActions(["fetchAllPhotosAction", "fetchOnePhotoLikesAction"]),
  },

  mounted() {
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
    padding: 0.5rem;
    background: rgb(228, 228, 228);
    box-shadow: 0 0 2px 2px rgba(141, 141, 141, 0.6);
    display: grid;
    grid-gap: 0.25rem;
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
    font-size: 12px;
}
.bloc-photo-title {
    grid-row: 2 / span 1;
    grid-column: 2 / span 4;
    font-size: 16px;
    font-weight: 600;
}
.bloc-photo-post {
    grid-row: 3 / span 4;
    grid-column: 1 / span 6;
}
.bloc-container-toggler {
    grid-row: 7 / span 1;
    grid-column: 1/ span 2;
    margin-top: 0.5rem;
    font-size: 1rem;
    height: 35px;
    // width: 30vw;
    // padding: 2px;
    // border-bottom:1px dotted black;
    border-radius: 5px;
    &:hover {
        cursor: pointer;
        background: rgb(0, 146, 29);
    }
}

/* -------- comment styling */
.bloc-comment-collapsable {
    grid-row: 8 ;
    grid-column: 1 / span 6;
}


.bloc-new-comment { /* STDBY */
    grid-row: 8 / span 4;
    grid-column: 1 / span 6;
    // border: 1px solid green;
    margin: 7px 0;
}
.bloc-old-comment { /* STDBY */
    grid-row: 12 / span 5;
    grid-column: 1 / span 6;
    // border: 1px solid red;
}

#dropdownMenuOffset {
    grid-row: 1 /span 1 ;
    grid-column: 7/ span 1;
    // border: 1px solid ;
    padding: 0px;
    margin-right: -20px;
    // font-size: 20px;
    font-size: 14px;
    &:hover{
        border: 1px solid rgb(139, 34, 191);
    }
} 

.dropdown-menu{
    // width: 50vw;
    height: auto;
    // border: 1px solid green;
    &:hover {
        border: 1px solid grey;
    }
}

.dropdown-toggle {
      font-size: 12px;
      &:hover {
          background: grey;
          color: white;
      }
}

// .btn-comment {
//     font-size: 12px;
//     // margin-right: 20px;
//     border-style: none;
//     border-radius: 5px;
//     padding: 3px 12px;
//     background: rgb(255, 255, 255);
//     font-weight: 600;
//     &:hover {
//         background: rgb(100, 100, 100);
//         color: white
//     }
// }




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

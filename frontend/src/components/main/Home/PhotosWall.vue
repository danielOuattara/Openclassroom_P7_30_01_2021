<template>
  <div class="photos-container">
      <div v-for="photo in allPhotos" :key="photo.uuid" class="photo-bloc">
          <OwnerAvatar v-bind:photo="photo"/>
          <OwnerName v-bind:photo="photo"/>
          <PhotoTitle v-bind:photo="photo"/>
          <DateOfPosting v-bind:photo="photo"/>
          <Photo v-bind:photo="photo" />
          
          <span class="bloc-container-toggler btn btn-success" 
                type="button" 
                data-toggle="collapse" 
                :data-target="'#photo'+photo.uuid" 
                aria-expanded="false" :aria-controls="'photo'+photo.uuid"> 
                    Comments :
              <span v-if="photo.comments.length" class="number-of-comments">{{photo.comments.length}}
              </span>
              <span v-else class="number-of-comments"> 0 </span>
          </span>

          <PhotoLikes v-bind:photo="photo" />

          <div class="dropdown dropleft">
              <button type="button" 
                    class="btn btn-infos dropdown-toggle comment-more-options" 
                    id="dropdownMenuOffset" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" aria-expanded="false" >Options
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                    <button v-if="photo.owner.uuid == currentUser.uuid || currentUser.roles.includes('ROLE_ADMIN')"  
                            class=" btn-comment btn-delete-comment">
                        Delete
                    </button>
                    <button class=" btn-comment btn-report-comment">
                        Report
                    </button>
                </div>
            </div>
          <div class="collapse bloc-comment-collapsable" :id="'photo'+photo.uuid">
              <CommentsOldContainer v-bind:photo="photo"/>
              <AddPhotoComment v-bind:photo="photo"/>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import OwnerAvatar   from './photos/OwnerAvatar.vue';
import OwnerName     from './photos/OwnerName';
import PhotoTitle    from './photos/PhotoTitle';
import DateOfPosting from './photos/DateOfPosting';
import Photo         from './photos/Photo';
import PhotoLikes    from './photos/PhotoLikes'
import AddPhotoComment  from './comments/AddPhotoComment.vue';
import CommentsOldContainer   from './comments/CommentsContainer';

export default {
  name: "PhotosWall",
  components: {

    OwnerAvatar,
    OwnerName,
    PhotoTitle,
    DateOfPosting,
    Photo,
    PhotoLikes,
    AddPhotoComment,
    CommentsOldContainer
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

  created() {
    this.fetchAllPhotosAction();
  },

  update() {
    this.fetchAllPhotosAction();
  }
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

.btn-comment {
    font-size: 12px;
    // margin-right: 20px;
    border-style: none;
    border-radius: 5px;
    padding: 3px 12px;
    background: rgb(255, 255, 255);
    font-weight: 600;
    &:hover {
        background: rgb(100, 100, 100);
        color: white
    }
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

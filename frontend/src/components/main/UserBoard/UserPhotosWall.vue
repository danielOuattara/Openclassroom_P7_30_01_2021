<template>
    <section>
         <h2 class="user-photowall-title">My photos wall</h2>
        <article v-for="photo, index in userDataGetters.photos" :key="index" class="photo-bloc">
            <OwnerAvatar v-bind:item="userDataGetters"/>
            <OwnerName v-bind:item="userDataGetters"/>
            <PhotoTitle v-bind:item="photo.title"/>
            <DateOfPosting v-bind:item="photo.createdAt"/>
            <Photo v-bind:item="photo" />
            <BtnCommentsToggler v-bind:item="photo.uuid"
                                v-bind:comments="photo.comments"/>
            <PhotoLikes v-bind:item="photo" />
            <PhotoBtnOptions v-bind:ownerUuid="userDataGetters.uuid"
                             v-bind:photoUuid="photo.uuid"/>
            <div class="collapse bloc-comment-collapsable" :id="'photo'+photo.uuid">
                <CommentsWall v-bind:photo="photo"/>
                <AddPhotoComment v-bind:photoUuid="photo.uuid"
                                 v-bind:ownerUuid="userDataGetters.uuid"/>
            </div>
        </article>
    </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import OwnerAvatar from './../global_components/OwnerAvatar.vue';
import OwnerName from './../global_components/OwnerName.vue';
import PhotoTitle from './../global_components/PhotoTitle.vue';
import DateOfPosting from './../global_components/DateOfPosting.vue';
import Photo from './../global_components/Photo.vue';
import BtnCommentsToggler from './../global_components/BtnCommentsToggler.vue';
import PhotoLikes from './../global_components/PhotoLikes.vue';
import PhotoBtnOptions from './../global_components/PhotoBtnOptions.vue';
import CommentsWall from './../home/CommentsWall.vue';
import AddPhotoComment from './../global_components/AddPhotoComment.vue';

export default {
    components: {
        OwnerAvatar,
        OwnerName,
        PhotoTitle,
        DateOfPosting,
        Photo,
        BtnCommentsToggler,
        PhotoLikes,
        PhotoBtnOptions,
        CommentsWall,
        AddPhotoComment,
    },

    computed: {
        ...mapGetters(["userDataGetters"]),
    
    currentUser() {
            return this.$store.state.auth.user;
        }
  },

    methods: {
        ...mapActions(["getOneUserAction", /* "fetchOnePhotoLikesAction" */]),
  },
    
  mounted() {
    this.getOneUserAction(this.currentUser.uuid);
  },

}
</script>

<style lang="scss" scoped>

h2 {
  font-size: 22px;
  border-bottom: 1px solid rgb(199, 199, 199);
  padding-bottom: 1rem;
//   margin-top: 1rem;
}

.user-photowall-title {
    font-size: 1.5rem;
    padding-bottom: 1rem;
    // border-radius: 0.20rem;
    margin-bottom: 2rem;
}

article.photo-bloc {
    margin: auto;
    margin: 2rem 0;
    border: 1px solid grey;
    border-radius: 4px;
    padding: 1rem;
    background: rgb(250, 250, 250);
    // box-shadow: 0 0 2px 2px rgba(141, 141, 141, 0.6);
    display: grid;
    grid-gap: 0.15rem;
}


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
    font-size: 0.9rem;
    padding: 1rem 0 0.75rem 0;
    margin-bottom: 1rem;
    border-bottom:2px dotted blue;
}

// .photo-report-form {
//   z-index: 5!important;
//   position: absolute;
// }

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
 

// .dropdown-menu{
//     // width: 50vw;
//     height: auto;
//     // border: 1px solid green;
//     &:hover {
//         border: 1px solid grey;
//     }
// }

// .dropdown-toggle {
//       font-size: 12px;
//       &:hover {
//           background: grey;
//           color: white;
//       }
// }

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

// .bloc {
  // border: 1px solid grey;
  // padding: 5px;
  // margin-bottom: 5px;
  // border-radius: 5px;
// }

// @media screen and (min-width: 760px) {
//   .photo-bloc {
//     display: flex;
//     flex-direction: column;
//     flex-wrap: wrap;
//   }
// }
</style>
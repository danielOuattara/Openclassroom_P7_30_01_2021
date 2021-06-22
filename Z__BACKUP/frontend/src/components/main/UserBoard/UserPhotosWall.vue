<template>
    <div>
        <section v-for="photo, index in userData.photos" :key="index">
            <OwnerAvatar v-bind:item="userData"/>
            <OwnerName v-bind:item="userData"/>
            <PhotoTitle v-bind:item="photo.title"/>
            <DateOfPosting v-bind:item="photo.createdAt"/>
            <Photo v-bind:item="photo" />
             <CommentsToggler v-bind:item="photo.uuid"
                             v-bind:comments="photo.comments"/>
            <!-- <PhotoLikes v-bind:item="photo" /> -->
            <PhotoBtnOptions v-bind:photoOwner="userData"
                             v-bind:photoUuid="photo.uuid"/>
            <div class="collapse bloc-comment-collapsable" :id="'photo'+photo.uuid">
                <CommentsWall v-bind:photo="photo"/>
                <AddPhotoComment v-bind:photoUuid="photo.uuid"/>
            </div>
        </section>
    </div>
    
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import OwnerAvatar from './../../main/OwnerAvatar.vue';
import OwnerName from './../../main/OwnerName.vue';
import PhotoTitle from './../../main/PhotoTitle.vue';
import DateOfPosting from './../../main/DateOfPosting.vue';
import Photo from './../../main/Photo.vue';
import CommentsToggler from './../../main/CommentsToggler.vue';
import PhotoBtnOptions from './../../main/PhotoBtnOptions.vue';
import CommentsWall from './../../main/Home/comments/CommentsWall.vue';
import AddPhotoComment from './../../main/AddPhotoComment.vue';

export default {
    components: {
        OwnerAvatar,
        OwnerName,
        PhotoTitle,
        DateOfPosting,
        Photo,
        CommentsToggler,
        PhotoBtnOptions,
        CommentsWall,
        AddPhotoComment,
    },

    computed: {
        ...mapGetters(["userData"]),
    
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

}
</script>
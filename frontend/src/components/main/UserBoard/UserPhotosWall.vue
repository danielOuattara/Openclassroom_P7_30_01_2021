<template>
    <div>
        <section v-for="photo, index in userData.photos" :key="index">
            <OwnerAvatar v-bind:item="userData"/>
            <OwnerName v-bind:item="userData"/>
            <PhotoTitle v-bind:item="photo.title"/>
            <DateOfPosting v-bind:item="photo.createdAt"/>
            <Photo v-bind:item="photo" />
             <BtnCommentsToggler v-bind:item="photo.uuid"
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
import OwnerAvatar from '../global_components/OwnerAvatar.vue';
import OwnerName from '../global_components/OwnerName.vue';
import PhotoTitle from '../global_components/PhotoTitle.vue';
import DateOfPosting from '../global_components/DateOfPosting.vue';
import Photo from '../global_components/Photo.vue';
import BtnCommentsToggler from '../global_components/BtnCommentsToggler.vue';
import PhotoBtnOptions from '../global_components/PhotoBtnOptions.vue';
import CommentsWall from '../home/CommentsWall.vue';
import AddPhotoComment from '../global_components/AddPhotoComment.vue';

export default {
    components: {
        OwnerAvatar,
        OwnerName,
        PhotoTitle,
        DateOfPosting,
        Photo,
        BtnCommentsToggler,
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
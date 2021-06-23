<template>
    <div class="bloc bloc-old-comment"> 
        <div class="one-comment" v-for="comment, index in photo.comments" :key="index">
            <OwnerAvatar v-bind:item="comment.owner"/>
            <OwnerName v-bind:item="comment.owner"/>
            <DateOfPosting v-bind:item="comment.createdAt"/>
            <CommentContent v-bind:item="comment"/>
            <CommentBtnOptions v-bind:comment="comment"
                               v-bind:photoUuid="photo.uuid" />
            <ReportPhotoCommentForm v-bind:photoUuid="photo.uuid"
                                    v-bind:commentUuid="comment.uuid" />
        </div>
    </div>
</template>

<script>
import OwnerAvatar from './../../main/global_components/OwnerAvatar.vue'
import OwnerName from './../../main/global_components/OwnerName';
import DateOfPosting from './../../main/global_components/DateOfPosting';
import CommentBtnOptions from './../../main/global_components/CommentBtnOptions.vue';
import CommentContent from './../../main/global_components/CommentContent';
import ReportPhotoCommentForm from './../../main/global_components/ReportPhotoCommentForm.vue';
export default {
    name: 'CommentsWall',
    data() {
        return{   }
    },
    props: ['photo', 'commentToggled'], 
    components: {
        OwnerAvatar,
        OwnerName,
        DateOfPosting,
        CommentBtnOptions,
        CommentContent,
        ReportPhotoCommentForm,
    },

    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },

    methods: {
        nameInitializer(arg) {
            return arg.slice(0,1).toUpperCase();
        }
    }
}

</script>

<style lang="scss" scoped>

.one-comment {
    display: grid;
    border-left: 3px solid grey;
    border-bottom: 1px solid grey;
    border-radius: 6px ;
    border-bottom-left-radius: 6px;
    // padding: 2px;
    margin: 15px 0;
    position: relative;
    background: rgb(237, 237, 237)
}
.comment-avatar{
    grid-row: 1;
    grid-column: 1 / span 1;
    max-width: 6vw;
    border: 1px solid gray;
}
.bloc-owner-name{
    grid-row: 1 / span 1;
    grid-column: 2 / span 2 ;
    border-bottom: 1px solid gray;
    width: 80px;
    font-size: 12px;
    font-weight: 700;
    // width: 70px;
    height: 20px;
}
.bloc-date-posting {
    grid-row: 1 / span 1;
    grid-column: 4 / span 1;
    // border-bottom: 1px solid gray;
    font-size: 12px;
    // width: 70px;
    // margin-left: -10px;
}
.comment-content{
    grid-row: 2 ;
    grid-column: 2 / span 10;
    // border: 1px solid gray;
    background-color:rgba(197, 197, 197, 0.576);
    padding: 10px;
    font-size: 14px;
    margin-right: 14px;
    border-radius: 5px;
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
.btn-update-comment {
    // grid-row: 5;
    // grid-column: 4 / span 1;
    // margin-left: 20px;
}
.btn-delete-comment {
    // grid-row: 5 ;
    // grid-column: 5 / span 1;

}
.btn-report-comment {
    // grid-row: 5 ;
    // grid-column: 6 / span 1;

  .dropdown-toggle {
        font-size: 12px;
        &:hover {
            background: grey;
            color: white;
        }
    }
}
.dropdown-menu{
    width: 50vw;
    height: auto;

    // border: 1px solid green;
    &:hover {
        border: 1px solid grey;
    }
}

#dropdownMenuOffset {
    grid-row: 1 /span 1 ;
    grid-column: 10 / span 1;
    // border: 1px solid ;
    padding: 0px;
    margin-right: -20px;
    font-size: 20px;
    font-size: 14px;
    &:hover{
        border: 1px solid grey;
    }

} 
.comment-more-options {}


</style>

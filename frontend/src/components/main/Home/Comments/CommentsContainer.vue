<template>
    <div class="bloc bloc-old-comment"> 
        <div class="one-comment" v-for="comment, index in photo.comments" :key="index">
            <OwnerAvatar v-bind:comment="comment"/>
            <OwnerName v-bind:comment="comment"/>
            <DateOfPosting v-bind:comment="comment"/>
            <CommentContent v-bind:comment="comment"/>
            <div class="dropdown dropup">
                <button type="button" 
                        class="btn btn-infos dropdown-toggle comment-more-options" 
                        id="dropdownMenuOffset" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" aria-expanded="false" 
                        >Options
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                    <button v-show="comment.owner.uuid == currentUser.uuid || currentUser.roles.includes('ROLE_ADMIN')"  
                            class=" btn-comment btn-update-comment">
                        Update
                    </button>
                    <button v-show="comment.owner.uuid == currentUser.uuid || currentUser.roles.includes('ROLE_ADMIN')"  
                            class=" btn-comment btn-delete-comment">
                        Delete
                    </button>
                    <button class=" btn-comment btn-report-comment">
                        Report
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import OwnerAvatar from './OwnerAvatar.vue'
import OwnerName from './OwnerName';
import DateOfPosting from './DateOfPosting';
import CommentContent from './CommentBody';
export default {
    name: 'OldComments',
    data() {
        return{   }
    },
    props: ['photo', 'commentToggled'], 
    components: {
        OwnerAvatar,
        OwnerName,
        DateOfPosting,
        CommentContent
    },

    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
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
.comment-owner-name{
    grid-row: 1 / span 1;
    grid-column: 2 / span 2 ;
    border-bottom: 1px solid gray;
    width: 80px;
    font-size: 12px;
    font-weight: 700;
    // width: 70px;
    height: 20px;
}
.comment-post-date {
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

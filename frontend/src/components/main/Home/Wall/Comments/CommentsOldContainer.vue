<template>
    <div v-show="commentToggled" class="bloc bloc-old-comment"> 
        <div class="infos-comment" v-for="comment, index in photo.comments" 
                                   :key="index">
            <OwnerAvatar v-bind:comment="comment"/>
            <OwnerName v-bind:comment="comment"/>
            <DateOfPosting v-bind:comment="comment"/>
            <CommentContent v-bind:comment="comment"/>
            <div class="dropdown dropleft mr-1">
                <button type="button" 
                        class="btn btn-infos dropdown-toggle" 
                        id="dropdownMenuOffset" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" aria-expanded="false" 
                        data-offset="10,20">&#8942;
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
import OwnerAvatar from './OwnerAvatar';
import OwnerName from './OwnerName';
import DateOfPosting from './DateOfPosting';
import CommentContent from './CommentOldBody';
export default {
    name: 'OldComments',
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

.infos-comment {
    display: grid;
    border-bottom: 1pX solid blue;
    padding: 2px;
    margin-bottom: 5px
}
.comment-avatar{
  grid-row: 1;
  grid-column: 1 / span 1;
  max-width: 6vw;
  border: 1px solid gray;
}
.comment-owner-name{
  grid-row: 1 / span 1;
  grid-column: 2 ;
  border: 1px solid gray;
  width: 80px;
  font-size: 12px;
  font-weight: 600;
  width: 70px;
  margin-left: -10px;
  height: 20px;
}
.comment-post-date {
  grid-row: 2 / span 1;
  grid-column: 2 / span 1;
  border: 1px solid gray;
  font-size: 12px;
  width: 70px;
  margin-left: -10px;
}
.comment-content{
  grid-row: 1 ;
  grid-column: 3 / span 10;
  border: 1px solid gray;
  font-size: 15px;
}
.btn-comment {
    font-size: 12px;
    // margin-right: 20px;
    border-style: none;
    border-radius: 5px;
    padding: 0px 8px;
    background: rgb(255, 255, 255);
    font-weight: 600;
    &:hover {
        background: rgb(100, 100, 100);
        color: white
    }
}
.btn-update-comment {
  grid-row: 5;
  grid-column: 4 / span 1;
  margin-left: 20px;
}
.btn-delete-comment {
  grid-row: 5 ;
  grid-column: 5 / span 1;

}
.btn-report-comment {
  grid-row: 5 ;
  grid-column: 6 / span 1;

.dropdown-toggle {
    background:red;
    &:hover {
        background: grey;
        color: white;
    }
}
}
.dropdown-menu{
    width: 50vw;
    height: auto;
}


</style>

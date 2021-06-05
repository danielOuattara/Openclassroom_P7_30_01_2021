<template>
    <div v-show="commentToggled" class="bloc bloc-old-comment"> 
        <!-- <div class="comment-owner-picture">
          <img src="" alt="">
        </div> -->
        <div class="infos-comment" v-for="comment, index in photo.comments" :key="index" > {{comment.content}}>

            <!-- <img :src="comment.onwer.avatar" :alt="comment.owner.firstname + 'picture, onwer of this comment'"> -->
            <!-- <p class="comment-owner-name">{{ comment.owner.firstName + comment.owner.firstName }}</p> -->

            <OwnerAvatar v-bind:comment="comment"/>
            <!-- <OwnerName v-bind:comment="comment"/> -->
            <!-- <DateOfPosting v-bind:comment="comment"/> -->
            <p class="comment-date"> {{comment.createdAt}}</p>
            <p class="comment-content">{{comment.content}}</p>


        </div>

        <div class="comment-content">

        </div>
    </div>
</template>

<script>
import OwnerAvatar from './OwnerAvatar';
// import OwnerName from './OwnerName';
// import DateOfPosting from './DateOfPosting';
export default {
    name: 'OldComments',
    props: ['photo', 'commentToggled'], 
    components: {
        OwnerAvatar
        // DateOfPosting,
        // OwnerName,
    } 

};

</script>

<style lang="scss" scoped>


</style>
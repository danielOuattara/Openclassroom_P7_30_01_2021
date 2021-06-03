<template>
    <div> 
        <div class="comment-owner-picture">
          <img src="" alt="">
        </div>
        <div class="infos-comment" v-for="comment, index in photo.comments" :key="index" > {{comment.content}}>

            <!-- <img :src="comment.onwer.avatar" :alt="comment.owner.firstname + 'picture, onwer of this comment'"> -->
            <!-- <p class="comment-owner-name">{{ comment.owner.firstName + comment.owner.firstName }}</p> -->
            <p class="comment-date"> {{comment.createdAt}}</p>
            <p class="comment-content">{{comment.content}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShowOnePhotoAllComments',
    props: ['photo'],
    data() {
        return {

        };
    },

    computed: {
    },

    methods: {}
};

</script>

<style lang="scss" scoped>

</style>
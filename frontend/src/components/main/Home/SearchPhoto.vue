
<template>
<div>
    <h2>All blog article</h2>
    <input type="text" name="searchTitle" v-model="search" placeholder="Search by blog title..."/>
        <div class="single-blog" v-for="item, index in filteredBlogs" :key="index"> 
            <h2> {{ item.title | to-upperCase }}</h2>
            <article> {{ item.body | snippet}}</article>
        </div>
</div>

</template>

<script>
import photoService from './../../../services/photo.service.js';
export default {
    data() {
        return {
        photo: [],
        search: '',
        };
    },

    computed: {

        filteredPhoto() {
        return this.photos.filter( photo => {
            return photo.title.match(this.search)
        })
        },
        
        currentUser() {
            return this.$store.state.auth.user;
        }
    },

    created() {
        photoService.getAllPhotos()
        .then( data => {
        this.photos = data;
        console.log(data)
        })
        .catch(err=> { console.log(err.message)})
    },

    
}
</script>

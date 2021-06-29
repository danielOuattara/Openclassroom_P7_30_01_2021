
<template>
<div id="search-photo">
    <h2>Search by photo title: </h2>
    <input type="text" name="searchPhoto" v-model="search" 
           placeholder="Search photo by title..."/>
    <div class="single-photo" v-for="photo, index in filteredPhotos" :key="index"> 
        <span v-if="search.length>0">{{photo.title}}</span>
    </div>
</div>
</template>

<script>
import photoService from './../../../services/photo.service.js';
export default {
    data() {
        return {
            photos: [],
            search: '',
        };
    },

    computed: {

        filteredPhotos() {
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
        .then( res => {
        this.photos = res.data;
        console.log(res.data)
        })
        .catch(err=> { console.log(err.message)})
    },

    
}
</script>

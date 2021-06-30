
<template>
<div id="search-photo">
    <label for="searchPhoto">Search photo by title : </label>
    <input type="text" name="searchPhoto" v-model="search" id="searchPhoto" aria-labelledby="search"
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
        })
        .catch(err=> { console.log(err.message)})
    },

    
}
</script>

<style lang="scss">
#search-photo {
    margin-top: 1rem;
}
#searchPhoto {
    padding: 0.5rem 1rem;
    outline: none;
    // border-radius: 5px;
}
label[for=searchPhoto] {
    font-size: 1.35rem;
    border-bottom: 1px solid #c7c7c7;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    display: inline-block;
    width: 85vw;
    @media screen and (min-width: 650px) {
        max-width: 650px;
    }
}
.single-photo {
    padding: 0.5rem 1rem;
    /* width: 63vw; */
}
</style>
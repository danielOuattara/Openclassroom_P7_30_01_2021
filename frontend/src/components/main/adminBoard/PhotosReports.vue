
<template>
        <section class="user-report">
            <button @click="getPhotosReports">Click to get photo reports</button>
            <p>{{this.photosReportsGetters}}</p>
        </section>
</template>

<script>
import {mapGetters, mapActions } from "vuex";

export default {
    name: 'PhotoReports',
    
    mounted() {
        // this.getPhotosReportsAction();
        // this.getPhotoCommentsReports();
    },
    created() {
        this.photosReportsGetters;
    },

    computed: {
        ...mapGetters(["photosReportsGetters" , "photoCommentsReportsGetters"]),
    },
    
    methods: {
        ...mapActions(["getPhotosReportsAction", "getPhotoCommentsReportsAction"]),

        async getPhotosReports() {
            try {
                await this.$store.dispatch("getPhotosReportsAction");
                
            } catch (err) {
                this.message = (err.response && err.response.data) || err.message || err.toString();
            }
        },
    }
};
</script>

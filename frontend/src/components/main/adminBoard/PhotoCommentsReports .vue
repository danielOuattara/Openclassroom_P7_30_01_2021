
<template>
        <section class="user-report">
            <button @click="getPhotosReportsComments">Click to get photo reports</button>
            <p>{{this.photosReportsCommentsGetters}}</p>
        </section>
</template>

<script>
import {mapGetters, mapActions } from "vuex";

export default {
    name: 'PhotoCommentsReports',
    
    mounted() {
        this.getPhotosReportsAction();
        // this.getPhotoCommentsReports();
        this.photoCommentsReportsGetters()
    },

    computed: {
        ...mapGetters(["photoCommentsReportsGetters"]),
    },
    
    methods: {
        ...mapActions(["getPhotoCommentsReportsAction"]),

        async getPhotosCommentsReports() {
            try {
                await this.$store.dispatch("getPhotoCommentsReportsAction");
                
            } catch (err) {
                this.message = (err.response && err.response.data) || err.message || err.toString();
            }
        },
    }
};
</script>

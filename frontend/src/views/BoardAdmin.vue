
<template>
  <div class="container">


        <section class="user-report">
            <button >Click to get photo reports</button>
            <p>{{this.photosReportsGetters}}</p>
        </section>

        <section class="user-report">
            <button >Click to get comments reports</button>
            <p>{{this.photoCommentsReportsGetters}}</p>
        </section>
  </div>
</template>

<script>
import {mapGetters, mapActions } from "vuex";
export default {
    name: 'BoardAdmin',
    data() {
        return {
            content: '',
            message: ''
        };
    },

    mounted() {        
        // this.getPhotosReportsAction();
        this.getPhotoCommentsReportsAction();
    },

    computed: {
        ...mapGetters(["photosReportsGetters", "photoCommentsReportsGetters"]),
    },
    
    methods: {
        ...mapActions(["getPhotosReportsAction", "getPhotoCommentsReportsAction"]),

        // async getPhotosReports() {
        //     try {
        //         await this.$store.dispatch("getPhotosReportsAction");
                
        //     } catch (err) {
        //         // this.loading = false;
        //         this.message = (err.response && err.response.data) || err.message || err.toString();
        //     }
        // },

        // async getPhotoCommentsReports() {
        //     try {
        //         await this.$store.dispatch("getPhotoCommentsReportsAction");
                
        //     } catch (err) {
        //         // this.loading = false;
        //         this.message = (err.response && err.response.data) || err.message || err.toString();
        //     }
        // }
    }
};
</script>

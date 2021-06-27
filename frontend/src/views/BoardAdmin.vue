
<template>
  <div class="admin-board">
        <section class="user-report">
            <button @click="getPhotosReports" >Click to get photo reports</button>
            <p>{{this.photosReportsGetters}}</p>
        </section>

        <section class="user-report">
            <button @click="getPhotoCommentsReports">Click to get comments reports</button>
            <p>{{this.photoCommentsReportsGetters}}</p>
        </section>
  </div>
</template>

<script>
// import UserService from './../services/user.service.js';
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
        this.getPhotosReportsAction(); // automatic action
        this.getPhotoCommentsReportsAction(); // automatic action
        //   UserService.getAdminBoard()
        //   .then( response => {
        //     this.content = response.data
        //   })
        //   .catch( err => {
        //       this.content = (err.response && err.response.data) || err.message || err.toString();
        //   })
        if (!this.currentUser) {
            this.$router.push('/login');
        }
    },

    computed: {
        ...mapGetters(["photosReportsGetters", "photoCommentsReportsGetters"]),
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    
    methods: {
        ...mapActions(["getPhotosReportsAction", "getPhotoCommentsReportsAction"]),

        async getPhotosReports() { // manual action to get reports
            try {
                await this.$store.dispatch("getPhotosReportsAction");
                
            } catch (err) {
                this.message = (err.response && err.response.data) || err.message || err.toString();
            }
        },

        async getPhotoCommentsReports() { // manual action to get reports
            try {
                await this.$store.dispatch("getPhotoCommentsReportsAction");
                
            } catch (err) {
                this.message = (err.response && err.response.data) || err.message || err.toString();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
// MY_TODO => style this page
.admin-board {
    max-width: 85vw;
    margin: auto;
}
</style>
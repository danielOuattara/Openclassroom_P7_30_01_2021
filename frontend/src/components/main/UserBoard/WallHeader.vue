<template>
    <section class="wall-header" >
         <UserBackgroundImage v-bind:userData="userData"/>
         <UserPortrait/>
         <UserInfos/>
         <UserSpecialOptions/>

           <!-- <UserUpdateAvatar  v-if="userData.uuid == currentUser.uuid || currentUser.roles.includes('ROLE_ADMIN')"  
                       class=" btn-comment-options btn-update-comment"  />
    <UserUpdateBackgroundImage  v-if="userData.uuid == currentUser.uuid || currentUser.roles.includes('ROLE_ADMIN')"  
                                class=" btn-comment-options btn-update-comment"  /> -->
    </section>
</template>

<script>
import {mapGetters} from 'vuex';
import UserBackgroundImage from './UserBackgroundImage.vue';
import UserPortrait from './UserPortrait.vue';
import UserInfos from './UserInfos.vue';
import UserSpecialOptions from './UserSpecialOptions.vue'
 export default {
    components: {
      UserBackgroundImage,
      UserPortrait,
      UserInfos,
      UserSpecialOptions
    },

    computed: {
      ...mapGetters(['userData']),
      currentUser() {
          return this.$store.state.auth.user;
      }, 
    }, 
}
</script>


<style lang="scss">
.wall-header {
    position: relative;
    min-height: 60vh;
    border-bottom: 1px solid grey;
    padding-bottom: 2rem;

}

.user-infos{
    height: 30%;
    display: grid;
    max-width: 80vw;
    margin: auto;
    padding: 1rem 0;
    gap: 1rem;
    border-bottom: 1px solid grey;
}

#icon-camera-retro{
    font-size: 20px;
    color: rgb(100, 100, 100);
    position: absolute;
    right: 25%;
    top: 17rem;
    cursor: pointer;
}

.name-value {
    grid-row: 1 ;
    grid-column: 1 ;
    // max-width: 50%;
    font-size: 1.5rem;
    margin: auto;
}

.username-value {
    grid-row: 2 ;
    grid-column: 1 ;
    font-size: 0.95rem;
}
.about-me-value {
    grid-row: 3 ;
    grid-column: 1 ;
    font-size: 0.95rem;
}
.email-value {
    grid-row: 4 ;
    grid-column: 1 ;
    font-size: 0.95rem;
}

#password-update {
    width: 85%;
    margin: auto;
    margin-top: 1rem;
    z-index: 2;
}
#account-delete{
    width: 85%;
    margin: auto;
    margin-top: 1rem;
    z-index: 2;

}
      
</style>
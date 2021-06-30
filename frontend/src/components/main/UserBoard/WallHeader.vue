<template>
    <section class="wall-header">
        <UserBackgroundImage/>
        <UserPortrait/>
        <UserInfos/>
        <div class="image-updater">
            <UserUpdateAvatar  v-if="userDataGetters.uuid == currentUser.uuid || currentUser.roles.includes('ROLE_ADMIN')"  
                               class="update-avatar"  />
            <UserUpdateBackgroundImage  v-if="userDataGetters.uuid == currentUser.uuid || currentUser.roles.includes('ROLE_ADMIN')"  
                                        class="update-background-image"  />
        </div>

        <UserSpecialOptions class="user-special-options"/>

    </section>
</template>

<script>
import {mapGetters} from 'vuex';
import UserBackgroundImage from './UserBackgroundImage.vue';
import UserPortrait from './UserPortrait.vue';
import UserInfos from './UserInfos.vue';
import UserSpecialOptions from './UserSpecialOptions.vue';
import UserUpdateAvatar from './UserUpdateAvatar.vue';
import UserUpdateBackgroundImage from './UserUpdateBackgroundImage.vue';

 export default {
    components: {
      UserBackgroundImage,
      UserPortrait,
      UserInfos,
      UserSpecialOptions,
      UserUpdateAvatar,
      UserUpdateBackgroundImage,
    },

    computed: {
      ...mapGetters(['userDataGetters']),
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
    @media screen and (min-width: 650px) {
        max-width: 650px;
        margin: auto;
    }

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

.image-updater {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}
.update-avatar {
    margin-top: 1rem;
    display: inline-block;
    border-bottom: 1px solid grey;
    padding: 0.5rem 1.5rem;
    &:hover {
        color: white;
        background: grey;
    }
}
.update-background-image {
    margin-top: 1rem;
    display: inline-block;
    border-bottom: 1px solid grey;
    padding: 0.5rem 1rem ;
    &:hover {
        color: white;
        background: grey;
    }
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

.user-special-options {
    width: 85%;
    margin: 2rem auto;
}
      
</style>
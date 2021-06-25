<template>
    <section class="user-data">        
        <font-awesome-icon  @click="updateToggler" id="edit-user-data" icon="edit" />
        <div class="user-infos">
            <span class="username-value"><b>Username :</b> {{userDataGetters.username}}  </span>
            <span v-if="userDataGetters.firstName && userDataGetters.lastName" class="name-value">  {{userDataGetters.firstName + ' ' + userDataGetters.lastName}} </span>
            <span  v-else class="name-value">New User </span>
            <span class="email-value"> <b>email :</b> {{userDataGetters.email}} </span>
            <span class="about-me-value"> <b>About me :</b> {{userDataGetters.aboutMe}} </span>
        </div>
        <UserUpdateForm class="user-update-form" v-bind:formToggler="formToggler"
                        v-if="userDataGetters.uuid == currentUser.uuid || currentUser.roles.includes('ROLE_ADMIN')"/>

        <UserUpdateInfos   
                        class=" btn-comment-options btn-update-comment"  />
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import User from '../../../models/user';
import UserUpdateForm from './UserUpdateForm.vue';
import UserUpdateInfos from './UserUpdateInfos.vue';
export default {
    components: {
        UserUpdateForm,
        UserUpdateInfos,

},
    computed: {
        ...mapGetters(['userDataGetters']),
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },

        currentUser() {
            return this.$store.state.auth.user;
        },
    }, 

     data() {
        return {
            user: new User("", "", "", "", "", "", ""),
            loading: false,
            submitted: false,
            successful: false,
            selectedFile: '',
            message: '',
            formToggler: false,
        };
    },

    methods: {
        // ...mapActions(["updateUserAction"]),

        updateToggler() {
            this.formToggler = !this.formToggler;
        },

        onFileSelect(event) {
            this.selectedFile = event.target.files[0];
        },
    }
    
}
</script>

<style lang="scss">
.user-data {
    position: relative;
}
#edit-user-data{
    position: absolute;
    right: 3rem;
    top: 4rem
}
.user-update-form{
    width: 80%;
    margin: auto;
}



</style>